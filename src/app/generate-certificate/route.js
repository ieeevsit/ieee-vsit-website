import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'; // Use @pdf-lib/fontkit for Next.js

// --- Helper function to get asset paths ---
// We use process.cwd() to get the root directory in a serverless environment
const getAssetPath = (assetName) => {
  return path.join(process.cwd(), 'src', 'lib', 'assets', assetName);
};

// --- Load attendees data from environment variable ---
const getAttendees = () => {
  try {
    const attendeesData = process.env.ATTENDEES_DATA;
    if (!attendeesData) {
      console.error('ATTENDEES_DATA environment variable not found');
      return [];
    }
    return JSON.parse(attendeesData);
  } catch (error) {
    console.error('Error parsing attendees data from environment variable:', error);
    return [];
  }
};

// --- POST Handler (replaces app.post("/generate-certificate")) ---
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, code } = body;
    console.log('Received certificate request:', { name, code });

    if (!name || !code) {
      return NextResponse.json(
        { error: 'Name and roll number are required' },
        { status: 400 }
      );
    }

    // --- Attendee Verification Logic (copied from generate.js) ---
    const attendees = getAttendees();
    
    const normalizeNameForComparison = (name) => {
      return name.toLowerCase().replace(/\s+/g, ' ').trim();
    };
    
    const normalizeCodeForComparison = (code) => {
      return code.toUpperCase().replace(/\s+/g, '').trim();
    };
    
    const normalizedInputName = normalizeNameForComparison(name);
    const normalizedInputCode = normalizeCodeForComparison(code);
    
    const nameMatch = attendees.find(
      (a) => normalizeNameForComparison(a.name) === normalizedInputName
    );
    
    const codeExists = attendees.find(
      (a) => normalizeCodeForComparison(a.code) === normalizedInputCode
    );

    const attendee = attendees.find(
      (a) => 
        normalizeNameForComparison(a.name) === normalizedInputName && 
        normalizeCodeForComparison(a.code) === normalizedInputCode
    );
    
    if (!attendee) {
      console.log('Attendee not found or code mismatch:', { name, code });
      
      const contactInfo = "\n\nIf you have attended the event and still can't generate your certificate, please contact:\n• Soham Darekar (IEEE Chairperson): +91 8692811341\n• Shaunik Virdi (IEEE Vice-Chairperson): +91 90826 98665\n• Rishi Desai (IEEE General Secretary): +91 8169775426";
      
      if (!nameMatch && !codeExists) {
        return NextResponse.json({ 
          error: "You haven't attended this workshop. Please check your name and roll number." + contactInfo,
          errorCode: "NOT_ATTENDED"
        }, { status: 400 });
      } else if (!nameMatch) {
        return NextResponse.json({ 
          error: "Name not found in our records. Please check the spelling and try again." + contactInfo,
          errorCode: "NAME_NOT_FOUND"
        }, { status: 400 });
      } else if (!codeExists) {
        return NextResponse.json({ 
          error: "Invalid roll number. Please check your roll number and try again." + contactInfo,
          errorCode: "INVALID_CODE"
        }, { status: 400 });
      } else {
        return NextResponse.json({ 
          error: "Attendee not found or roll number mismatch. Please check your details and try again." + contactInfo,
          errorCode: "MISMATCH"
        }, { status: 400 });
      }
    }

    // --- PDF Generation Logic (copied from generate.js) ---
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([2000, 1414]);

    const bgBytes = fs.readFileSync(getAssetPath('certificate-template.png'));
    const bgImage = await pdfDoc.embedPng(bgBytes);
    page.drawImage(bgImage, { x: 0, y: 0, width: 2000, height: 1414 });

    const ibarraFontBytes = fs.readFileSync(getAssetPath('fonts/IbarraRealNova-VariableFont_wght.ttf'));
    const latoFontBytes = fs.readFileSync(getAssetPath('fonts/Lato-Regular.ttf'));
    const alluraFontBytes = fs.readFileSync(getAssetPath('fonts/Allura-Regular.ttf'));
    
    const ibarra = await pdfDoc.embedFont(ibarraFontBytes);
    const lato = await pdfDoc.embedFont(latoFontBytes);
    const allura = await pdfDoc.embedFont(alluraFontBytes);

    function centerX(text, font, size, pageWidth = 2000) {
      const textWidth = font.widthOfTextAtSize(text, size);
      return (pageWidth - textWidth) / 2;
    }

    // ... (All text drawing logic from generate.js) ...
    const heading1 = "CERTIFICATE OF";
    page.drawText(heading1, { x: centerX(heading1, ibarra, 98), y: 1030, size: 98, font: ibarra, color: rgb(0.23, 0.13, 0.33) });
    const heading2 = "PARTICIPATION";
    page.drawText(heading2, { x: centerX(heading2, ibarra, 98), y: 910, size: 98, font: ibarra, color: rgb(0.23, 0.13, 0.33) });
    const subheading = "THIS CERTIFICATE IS PRESENTED TO";
    page.drawText(subheading, { x: centerX(subheading, lato, 40), y: 810, size: 40, font: lato, color: rgb(0.79, 0.47, 0.09) });
    const nameFontSize = 190;
    page.drawText(attendee.name, { x: centerX(attendee.name, allura, nameFontSize), y: 650, size: nameFontSize, font: allura, color: rgb(0.23, 0.13, 0.33) });
    const description = "For participation in the Gittopia workshop on Git & GitHub, held on September 22nd, 2025, as part of the IEEE Day 2025 celebrations. Organized by the IEEE-VSIT Student Branch in collaboration with the IEEE WIE VSIT Affinity Group.";
    const maxWidth = 1520;
    const lineHeight = 46;
    let descLines = [];
    let words = description.split(' ');
    let currentLine = '';
    for (let i = 0; i < words.length; i++) {
      let testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
      let testWidth = lato.widthOfTextAtSize(testLine, 38);
      if (testWidth > maxWidth && currentLine) {
        descLines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) descLines.push(currentLine);
    descLines.forEach((line, idx) => {
      page.drawText(line, { x: centerX(line, lato, 38), y: 550 - idx * lineHeight, size: 38, font: lato, color: rgb(0.79, 0.47, 0.09) });
    });
    page.drawText("MAITREYI JOGLEKAR", { x: 370, y: 220, size: 32, font: lato, color: rgb(0.23, 0.13, 0.33) });
    page.drawText("Branch Counseller, VSIT", { x: 400, y: 180, size: 23, font: lato, color: rgb(0.79, 0.47, 0.09) });
    page.drawText("DR. ROHINI KELKAR", { x: 1330, y: 220, size: 32, font: lato, color: rgb(0.23, 0.13, 0.33) });
    page.drawText("Principal, VSIT", { x: 1400, y: 180, size: 23, font: lato, color: rgb(0.79, 0.47, 0.09) });
    // ... (End of text drawing logic) ...

    const pdfBytes = await pdfDoc.save();
    const safeName = attendee.name.replace(/\s+/g, '_');

    // --- Return the PDF as a Response ---
    // This replaces res.send()
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${encodeURIComponent(safeName)}_certificate.pdf`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}