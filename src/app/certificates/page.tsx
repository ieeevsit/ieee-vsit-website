"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { 
  FaCertificate, 
  FaDownload, 
  FaCheck,
  FaExclamationTriangle,
  FaSpinner
} from "react-icons/fa";

interface CertificateFormData {
  name: string;
  code: string; // 'code' is used to store the roll number
}

const CertificatesPage: React.FC = () => {
  const [formData, setFormData] = useState<CertificateFormData>({ name: "", code: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#050510';
    document.body.style.color = '#e5e7eb';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const scrollToForm = () => {
    setIsFormVisible(true);
    setTimeout(() => {
      const formElement = document.getElementById('certificate-form');
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // --- CHANGE 1: API_URL removed ---
      // We now call the internal Next.js API route directly
      
      // --- CHANGE 2: Fetch URL is now relative ---
      // This calls '/src/app/generate-certificate/route.js'
      const response = await fetch(`/generate-certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          code: formData.code.trim()
        }),
      });

      if (response.ok) {
        // If the API returns a PDF blob directly
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${formData.name.replace(/\s+/g, '_')}_Certificate.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setSuccess("Certificate generated and downloaded successfully!");
        setFormData({ name: "", code: "" });
      } else {
        const errorData = await response.json();
        // --- CHANGE 3: Error handling key fixed ---
        // The backend sends { "error": "..." }, not "message"
        setError(errorData.error || "Failed to generate certificate. Please check your details.");
      }
    } catch (err) {
      setError("Unable to connect to certificate service. Please try again later.");
      console.error("Certificate generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-200 font-sans">
      <style jsx global>{`
        body {
          background-color: #050510;
          color: #e5e7eb;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .certificate-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .certificate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #3b82f6;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .gradient-border {
          background: linear-gradient(45deg, #3b82f6, #1e40af, #2563eb);
          padding: 2px;
          border-radius: 12px;
        }
        .gradient-border-inner {
          background: #0A0F1A;
          border-radius: 10px;
        }
        @media (max-width: 640px) {
          .certificate-form input {
            font-size: 16px !important;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 8px;
          }
          .certificate-form button {
            font-size: 16px !important;
            -webkit-appearance: none;
            touch-action: manipulation;
          }
          /* Prevent zoom on input focus */
          input[type="text"] {
            font-size: 16px !important;
          }
          /* Better text handling for small screens */
          .text-overflow-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      `}</style>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-4 lg:px-8 bg-gray-900/50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <FaCertificate className="text-3xl sm:text-4xl lg:text-6xl text-blue-400 mx-auto mb-3 sm:mb-4 lg:mb-6 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-gray-300 px-2 sm:px-4 leading-tight">
              Certificate Generator
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
              Generate and download your IEEE VSIT workshop participation certificates instantly
            </p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-lg text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mx-2 sm:mx-4 min-h-[44px] touch-manipulation"
            >
              Generate My Certificate
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 bg-gray-900/50">
          <div className="container mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-white px-2 sm:px-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-lg sm:text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-white">Enter Details</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 px-2 leading-relaxed">
                  Provide your full name and the roll number you received during the event
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-lg sm:text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-white">Verification</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 px-2 leading-relaxed">
                  Our system securely verifies your details against our attendee database
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-lg sm:text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-white">Download</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 px-2 leading-relaxed">
                  Get your personalized PDF certificate instantly ready for download
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Generation Form */}
        {isFormVisible && (
          <section id="certificate-form" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 bg-[#0A0F1A]">
            <div className="container mx-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
              <div className="gradient-border">
                <div className="gradient-border-inner p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <FaCertificate className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 mx-auto mb-3 sm:mb-4" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2 sm:px-4">
                      Generate Your Certificate
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-300 px-2 sm:px-4">
                      Enter your name and roll number to generate your certificate
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 certificate-form">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your first name and last name only"
                        className="w-full px-3 sm:px-4 py-3 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-h-[44px] touch-manipulation"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label htmlFor="code" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="e.g., 24302F0019"
                        className="w-full px-3 sm:px-4 py-3 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-h-[44px] touch-manipulation"
                        required
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 p-3 sm:p-4 bg-red-900/30 border border-red-600 rounded-lg text-xs sm:text-sm">
                        <FaExclamationTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
                        {/* Display error message, splitting contacts to new lines */}
                        <span className="text-red-300 whitespace-pre-wrap break-words">{error}</span>
                      </div>
                    )}

                    {success && (
                      <div className="flex items-start gap-2 p-3 sm:p-4 bg-green-900/30 border border-green-600 rounded-lg text-xs sm:text-sm">
                        <FaCheck className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-green-300 break-words">{success}</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <button
                        type="submit"
                        disabled={loading || !formData.name.trim() || !formData.code.trim()}
                        className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px] touch-manipulation"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span className="hidden xs:inline">Generating...</span>
                            <span className="xs:hidden">Wait...</span>
                          </>
                        ) : (
                          <>
                            <FaDownload />
                            <span className="hidden xs:inline">Generate Certificate</span>
                            <span className="xs:hidden">Generate</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setIsFormVisible(false);
                          setError("");
                          setSuccess("");
                          setFormData({ name: "", code: "" });
                        }}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base min-h-[44px] touch-manipulation"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaCertificate className="text-blue-400 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-blue-300 mb-2 text-xs sm:text-sm lg:text-base">Important Notes:</h4>
                        <ul className="text-xs sm:text-sm text-blue-200 space-y-1 break-words">
                          <li>• Name matching is case-insensitive</li>
                          <li>• Use the exact name you registered with</li>
                          <li>• Your roll number was provided during the event</li>
                          <li>• Contact support if you can't find your roll number</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Support Section */}
        <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 bg-[#0A0F1A]">
          <div className="container mx-auto text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-6 sm:mb-8 text-white px-2 sm:px-4">
              Need Help with Certificate Generation?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4">
              If you attended an event and can't generate your certificate, please contact our support team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg">
                <h3 className="font-bold text-blue-300 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Soham Darekar</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-1">IEEE Chairperson</p>
                <p className="text-blue-400 text-xs sm:text-sm lg:text-base break-all">+91 8692811341</p>
              </div>
              <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Shaunik Virdi</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-1">IEEE Vice-Chairperson</p>
                <p className="text-blue-500 text-xs sm:text-sm lg:text-base break-all">+91 9082698665</p>
              </div>
              <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
                <h3 className="font-bold text-blue-500 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Rishi Desai</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-1">IEEE General Secretary</p>
                <p className="text-blue-600 text-xs sm:text-sm lg:text-base break-all">+91 8169775426</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CertificatesPage;