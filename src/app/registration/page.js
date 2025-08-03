"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import { 
  FaUserPlus, 
  FaFileAlt, 
  FaCreditCard, 
  FaCheckCircle,
  FaCalendarAlt,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaGraduationCap,
  FaPhone,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: '',
    year: '',
    email: '',
    phone: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Enhanced Input Component
  const FormInput = ({ 
    label, 
    name, 
    type = "text", 
    icon: Icon, 
    placeholder, 
    required = false,
    pattern,
    maxLength,
    options 
  }) => {
    const isError = errors[name];
    const isFocused = focusedField === name;
    const hasValue = formData[name]?.length > 0;

    const handleChange = (e) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    };

    const handleFocus = () => setFocusedField(name);
    const handleBlur = () => {
      setFocusedField(null);
      validateField(name, formData[name]);
    };

    if (type === 'select') {
      return (
        <div className="relative group">
          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
            isFocused ? 'text-blue-400' : 'text-gray-300'
          }`}>
            {label} {required && <span className="text-red-400">*</span>}
          </label>
          <div className="relative">
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
              isFocused ? 'text-blue-400' : ''
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              className={`w-full pl-12 pr-10 py-4 rounded-xl bg-[#0f0f23] text-white border-2 transition-all duration-300 appearance-none ${
                isError 
                  ? 'border-red-500 focus:border-red-400' 
                  : isFocused 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                    : hasValue 
                      ? 'border-green-400/50' 
                      : 'border-gray-600 hover:border-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
            >
              <option value="">{placeholder}</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {isError && (
            <p className="text-red-400 text-xs mt-1 animate-pulse">{isError}</p>
          )}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="relative group">
          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
            isFocused ? 'text-blue-400' : 'text-gray-300'
          }`}>
            {label} {required && <span className="text-red-400">*</span>}
          </label>
          <div className="relative">
            <div className={`absolute left-4 top-4 text-gray-400 transition-colors duration-200 ${
              isFocused ? 'text-blue-400' : ''
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              rows={4}
              placeholder={placeholder}
              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f0f23] text-white border-2 transition-all duration-300 resize-none ${
                isError 
                  ? 'border-red-500 focus:border-red-400' 
                  : isFocused 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                    : hasValue 
                      ? 'border-green-400/50' 
                      : 'border-gray-600 hover:border-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
            />
          </div>
          {isError && (
            <p className="text-red-400 text-xs mt-1 animate-pulse">{isError}</p>
          )}
        </div>
      );
    }

    return (
      <div className="relative group">
        <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
          isFocused ? 'text-blue-400' : 'text-gray-300'
        }`}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="relative">
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
            isFocused ? 'text-blue-400' : ''
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            pattern={pattern}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f0f23] text-white border-2 transition-all duration-300 ${
              isError 
                ? 'border-red-500 focus:border-red-400' 
                : isFocused 
                  ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                  : hasValue 
                    ? 'border-green-400/50' 
                    : 'border-gray-600 hover:border-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
          />
          {hasValue && !isError && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <FaCheckCircle className="text-green-400 text-sm" />
            </div>
          )}
        </div>
        {isError && (
          <p className="text-red-400 text-xs mt-1 animate-pulse">{isError}</p>
        )}
      </div>
    );
  };

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'rollNo':
        if (!value.trim()) error = 'Roll number is required';
        break;
      case 'course':
        if (!value.trim()) error = 'Course is required';
        break;
      case 'year':
        if (!value) error = 'Year is required';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^[0-9]{10}$/.test(value.replace(/\s/g, ''))) error = 'Phone number must be 10 digits';
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (key !== 'motivation') { // motivation is optional
        if (!validateField(key, formData[key])) {
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          rollNo: '',
          course: '',
          year: '',
          email: '',
          phone: '',
          motivation: ''
        });
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#e5e7eb';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const handleHeaderNavigation = (section) => {
    router.push(`/#${section}`);
  };

  return (
    <>
      <style jsx global>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .process-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .process-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1);
        }
        
        .form-container {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .success-animation {
            animation: successPulse 0.6s ease-in-out;
        }
        
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .floating-elements {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .floating-elements::before,
        .floating-elements::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-elements::before {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .floating-elements::after {
            top: 60%;
            right: 15%;
            animation-delay: 3s;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
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
        
        .icosahedron {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            opacity: 0.03;
            animation: rotate 60s linear infinite;
        }
        
        .icosahedron svg {
            width: 100%;
            height: 100%;
        }
        
        .icosahedron-line {
            stroke: rgba(59, 130, 246, 0.4);
            stroke-width: 0.5;
            fill: none;
        }
        
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .icosahedron {
                width: 250px;
                height: 250px;
                opacity: 0.02;
            }
        }
      `}</style>
      <Header 
        onNavigate={handleHeaderNavigation} 
        hideJoinButton={true}
      />
      <main className="w-full min-h-screen bg-black text-gray-200 relative overflow-hidden">
        
        {/* Enhanced Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle Icosahedron */}
          <div className="icosahedron">
            <svg viewBox="0 0 200 200">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path className="icosahedron-line" d="M100,20 L150,80 L100,140 L50,80 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M100,20 L170,60 L150,80 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M100,20 L30,60 L50,80 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M170,60 L180,120 L150,80 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M30,60 L20,120 L50,80 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M180,120 L150,80 L100,140 L130,160 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M20,120 L50,80 L100,140 L70,160 Z" filter="url(#glow)" />
              <path className="icosahedron-line" d="M100,140 L130,160 L100,180 L70,160 Z" filter="url(#glow)" />
            </svg>
          </div>
          
          {/* Enhanced floating background elements */}
          <div className="absolute top-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-blue-500/8 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-600/4 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 md:w-80 md:h-80 bg-blue-400/4 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/6 rounded-full blur-2xl"></div>
        </div>

        {/* Enhanced Hero Section */}
        <section className="relative pt-20 md:pt-24 pb-8 md:pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative">
              {/* IEEE Logo with enhanced styling */}
              <div className="relative inline-block mb-6 md:mb-8">
                <div className="relative">
                  <img
                    src="/ieee-emblem.png"
                    alt="IEEE Emblem"
                    className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 object-contain mx-auto drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                </div>
              </div>
              
              {/* Enhanced Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 leading-tight">
                <span className="text-white">IEEE VSIT </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Registration</span>
              </h1>
              
              {/* Enhanced Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
                Join the IEEE VSIT community and unlock your potential in technology and innovation.
              </p>
              
              {/* Decorative elements */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUserPlus className="text-white text-sm" />
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Registration Form Section */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="form-container rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Floating Elements */}
              <div className="floating-elements"></div>
              
              {/* Enhanced Header */}
              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl shadow-blue-500/25">
                  <FaUserPlus className="text-4xl text-white" />
                </div>
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Join IEEE VSIT
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Start your journey with us by filling out this registration form. We'll get back to you soon!
                </p>
              </div>

              {/* Enhanced Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-8 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-2xl text-center success-animation">
                  <FaCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-400 mb-3">Registration Submitted Successfully!</h3>
                  <p className="text-green-300 text-lg">Thank you for your interest. We'll contact you soon with next steps.</p>
                </div>
              )}

              {/* Enhanced Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-8 p-8 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-2xl text-center">
                  <FaInfoCircle className="text-5xl text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-400 mb-3">Please Check Your Information</h3>
                  <p className="text-red-300 text-lg">Make sure all required fields are filled correctly.</p>
                </div>
              )}

              {/* Enhanced Form */}
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Full Name"
                    name="name"
                    icon={FaUser}
                    placeholder="Enter your full name"
                    required
                  />
                  <FormInput
                    label="Roll Number"
                    name="rollNo"
                    icon={FaGraduationCap}
                    placeholder="Your roll number"
                    required
                  />
                  <FormInput
                    label="Course"
                    name="course"
                    icon={FaGraduationCap}
                    placeholder="e.g. B.Tech Computer Science"
                    required
                  />
                  <FormInput
                    label="Year"
                    name="year"
                    type="select"
                    icon={FaCalendarAlt}
                    placeholder="Select your year"
                    required
                    options={[
                      { value: '1st', label: '1st Year' },
                      { value: '2nd', label: '2nd Year' },
                      { value: '3rd', label: '3rd Year' },
                      { value: '4th', label: '4th Year' }
                    ]}
                  />
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={FaEnvelope}
                    placeholder="your.email@example.com"
                    required
                  />
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    icon={FaPhone}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>

                <FormInput
                  label="Why do you want to join IEEE?"
                  name="motivation"
                  type="textarea"
                  icon={FaInfoCircle}
                  placeholder="Share your motivation and what you hope to achieve with IEEE VSIT... (Optional)"
                />

                {/* Enhanced Submit Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : submitStatus === 'success'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="text-2xl animate-spin" />
                        Processing...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <FaCheckCircle className="text-2xl" />
                        Registration Submitted
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="text-2xl" />
                        Submit Registration
                        <FaArrowRight className="text-xl" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Enhanced Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
                <p className="text-gray-400 text-sm">
                  By submitting this form, you agree to be contacted by IEEE VSIT regarding membership opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Registration Process Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-12 md:mb-16">
              Registration <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Process</span>
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 md:gap-12">
              {[
                {
                  icon: FaUserPlus,
                  title: "Personal Details",
                  description: "Fill in your basic information and academic details"
                },
                {
                  icon: FaFileAlt,
                  title: "Application Form",
                  description: "Complete the IEEE membership application"
                },
                {
                  icon: FaCreditCard,
                  title: "Payment",
                  description: "Secure online payment with multiple options"
                },
                {
                  icon: FaCheckCircle,
                  title: "Confirmation",
                  description: "Receive confirmation and welcome materials"
                }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="glass-card rounded-3xl p-8 md:p-10 hover:border-blue-400/50 transition-all duration-300 process-card h-full group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-purple-500/10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
                      <span className="text-white font-bold text-xl md:text-2xl">{index + 1}</span>
                    </div>
                    <step.icon className="text-4xl md:text-5xl text-blue-400 mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">{step.title}</h3>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
