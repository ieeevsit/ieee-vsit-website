"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { 
  FaCertificate, 
  FaDownload, 
  FaShieldAlt, 
  FaUserCheck, 
  FaBolt, 
  FaAward,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaUsers,
  FaCalendarAlt,
  FaFileAlt
} from "react-icons/fa";

interface CertificateFormData {
  name: string;
  code: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
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
      // Replace with your actual certificate generator API endpoint
      const API_URL = process.env.NEXT_PUBLIC_CERTIFICATE_API_URL || 'http://localhost:3000';
      
      const response = await fetch(`${API_URL}/generate-certificate`, {
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
        setError(errorData.message || "Failed to generate certificate. Please check your details.");
      }
    } catch (err) {
      setError("Unable to connect to certificate service. Please try again later.");
      console.error("Certificate generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-400" />,
      title: "Secure Verification",
      description: "Both name and roll number must match our attendee database for certificate generation."
    },
    {
      icon: <FaBolt className="text-3xl text-yellow-400" />,
      title: "Instant Generation",
      description: "Download your PDF certificate immediately after verification."
    },
    {
      icon: <FaUserCheck className="text-3xl text-green-400" />,
      title: "Flexible Matching",
      description: "Case-insensitive name and code matching for user convenience."
    },
    {
      icon: <FaAward className="text-3xl text-purple-400" />,
      title: "Professional Format",
      description: "High-quality certificates suitable for portfolios and professional use."
    }
  ];

  const stats = [
    { icon: <FaCertificate />, value: "500+", label: "Certificates Generated" },
    { icon: <FaUsers />, value: "200+", label: "Verified Attendees" },
    { icon: <FaCalendarAlt />, value: "25+", label: "Events Covered" },
    { icon: <FaFileAlt />, value: "100%", label: "Success Rate" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-blue-900 min-h-screen text-gray-200 font-sans">
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
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          padding: 2px;
          border-radius: 12px;
        }
        .gradient-border-inner {
          background: #1a1a2e;
          border-radius: 10px;
        }
      `}</style>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="mb-8">
              <FaCertificate className="text-6xl text-blue-400 mx-auto mb-6 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certificate Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Generate and download your IEEE VSIT workshop participation certificates instantly
            </p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Generate My Certificate
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center glass-card p-6 rounded-xl certificate-card">
                  <div className="text-3xl text-blue-400 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Certificate Generation Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-8 rounded-xl certificate-card text-center">
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Generation Form */}
        {isFormVisible && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="container mx-auto max-w-2xl">
              <div className="gradient-border">
                <div className="gradient-border-inner p-8">
                  <div className="text-center mb-8">
                    <FaCertificate className="text-4xl text-blue-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Generate Your Certificate
                    </h2>
                    <p className="text-gray-300">
                      Enter your name and unique code to generate your certificate
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name as registered"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2">
                        Unique Code
                      </label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="Enter your unique code"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-900/30 border border-red-600 rounded-lg">
                        <FaExclamationTriangle className="text-red-400" />
                        <span className="text-red-300">{error}</span>
                      </div>
                    )}

                    {success && (
                      <div className="flex items-center gap-2 p-4 bg-green-900/30 border border-green-600 rounded-lg">
                        <FaCheck className="text-green-400" />
                        <span className="text-green-300">{success}</span>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading || !formData.name.trim() || !formData.code.trim()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FaDownload />
                            Generate Certificate
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsFormVisible(false)}
                        className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FaCertificate className="text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-2">Important Notes:</h4>
                        <ul className="text-sm text-blue-200 space-y-1">
                          <li>• Name matching is case-insensitive</li>
                          <li>• Use the exact name you registered with</li>
                          <li>• Your unique code was provided during the event</li>
                          <li>• Contact support if you can't find your code</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Enter Details</h3>
                <p className="text-gray-300">
                  Provide your full name and the unique code you received during the event
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Verification</h3>
                <p className="text-gray-300">
                  Our system securely verifies your details against our attendee database
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Download</h3>
                <p className="text-gray-300">
                  Get your personalized PDF certificate instantly ready for download
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-blue-900/50">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Need Help with Certificate Generation?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If you attended an event and can't generate your certificate, please contact our support team
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="font-bold text-blue-300 mb-2">Soham Darekar</h3>
                <p className="text-sm text-gray-300 mb-1">IEEE Chairperson</p>
                <p className="text-blue-400">+91 8692811341</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="font-bold text-purple-300 mb-2">Shaunik Virdi</h3>
                <p className="text-sm text-gray-300 mb-1">IEEE Vice-Chairperson</p>
                <p className="text-purple-400">+91 90826 98665</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="font-bold text-pink-300 mb-2">Rishi Desai</h3>
                <p className="text-sm text-gray-300 mb-1">IEEE General Secretary</p>
                <p className="text-pink-400">+91 8169775426</p>
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