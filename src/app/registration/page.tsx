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

interface FormData {
  name: string;
  rollNo: string;
  course: string;
  year: string;
  email: string;
  phone: string;
  motivation: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormInputProps {
  label: string;
  name: keyof FormData;
  type?: string;
  icon?: React.ComponentType<any>;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  options?: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
  isFocused: boolean;
}

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    rollNo: '',
    course: '',
    year: '',
    email: '',
    phone: '',
    motivation: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#050510';
    document.body.style.color = '#e5e7eb';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const handleHeaderNavigation = (section: string) => {
    router.push(`/#${section}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 2000);
  };

  // Enhanced Input Component
  const FormInput: React.FC<FormInputProps> = ({ 
    label, 
    name, 
    type = "text", 
    icon: Icon, 
    placeholder, 
    required = false,
    pattern,
    maxLength,
    options,
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    isFocused
  }) => {
    const isError = !!error;
    
    return (
      <div className="relative group">
        <label className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 
          ${isFocused || value ? 'top-2 text-xs text-blue-400' : 'top-4 text-base text-gray-400'}`}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        
        <div className="relative">
          {Icon && (
            <Icon className={`absolute left-4 top-4 text-lg transition-colors
              ${isFocused ? 'text-blue-400' : 'text-gray-400'}`} />
          )}
          
          {type === 'textarea' ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={maxLength}
              className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 pt-6 pb-2 bg-gray-800/50 border-2 rounded-xl
                transition-all duration-200 resize-none h-24
                ${isFocused ? 'border-blue-400 bg-gray-800/70' : 'border-gray-600 hover:border-gray-500'}
                ${isError ? 'border-red-400' : ''}
                focus:outline-none focus:border-blue-400 focus:bg-gray-800/70`}
              placeholder={isFocused ? placeholder : ''}
            />
          ) : type === 'select' ? (
            <select
              name={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 pt-6 pb-2 bg-gray-800/50 border-2 rounded-xl
                transition-all duration-200
                ${isFocused ? 'border-blue-400 bg-gray-800/70' : 'border-gray-600 hover:border-gray-500'}
                ${isError ? 'border-red-400' : ''}
                focus:outline-none focus:border-blue-400 focus:bg-gray-800/70`}
            >
              <option value="">Choose...</option>
              {options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              pattern={pattern}
              maxLength={maxLength}
              className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 pt-6 pb-2 bg-gray-800/50 border-2 rounded-xl
                transition-all duration-200
                ${isFocused ? 'border-blue-400 bg-gray-800/70' : 'border-gray-600 hover:border-gray-500'}
                ${isError ? 'border-red-400' : ''}
                focus:outline-none focus:border-blue-400 focus:bg-gray-800/70`}
              placeholder={isFocused ? placeholder : ''}
            />
          )}
        </div>
        
        {error && (
          <p className="text-red-400 text-sm mt-1 ml-1">{error}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      <Header 
        onNavigate={handleHeaderNavigation} 
        hideJoinButton={true}
        customButton={
          <button 
            onClick={() => router.push('/join-ieee')}
            className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-300"
          >
            Back to Info
          </button>
        }
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
                <FaUserPlus className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join <span className="text-blue-400">IEEE VSIT</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Fill out this form to become part of our innovative community
              </p>
            </div>

            {/* Registration Form */}
            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    icon={FaUser}
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.name}
                    isFocused={focusedField === 'name'}
                  />
                  
                  <FormInput
                    label="Roll Number"
                    name="rollNo"
                    icon={FaGraduationCap}
                    placeholder="e.g., 2021BTECHCS001"
                    required
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('rollNo')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.rollNo}
                    isFocused={focusedField === 'rollNo'}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Course"
                    name="course"
                    type="select"
                    icon={FaGraduationCap}
                    required
                    options={['Computer Engineering', 'Electronics Engineering', 'Information Technology', 'Other']}
                    value={formData.course}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('course')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.course}
                    isFocused={focusedField === 'course'}
                  />
                  
                  <FormInput
                    label="Year of Study"
                    name="year"
                    type="select"
                    icon={FaCalendarAlt}
                    required
                    options={['First Year', 'Second Year', 'Third Year', 'Final Year']}
                    value={formData.year}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('year')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.year}
                    isFocused={focusedField === 'year'}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={FaEnvelope}
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.email}
                    isFocused={focusedField === 'email'}
                  />
                  
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    icon={FaPhone}
                    placeholder="10-digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    error={errors.phone}
                    isFocused={focusedField === 'phone'}
                  />
                </div>

                <FormInput
                  label="Why do you want to join IEEE VSIT?"
                  name="motivation"
                  type="textarea"
                  icon={FaFileAlt}
                  placeholder="Tell us about your motivation and what you hope to achieve..."
                  required
                  maxLength={500}
                  value={formData.motivation}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('motivation')}
                  onBlur={() => setFocusedField(null)}
                  error={errors.motivation}
                  isFocused={focusedField === 'motivation'}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-600/20 border border-green-400 rounded-xl flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <span className="text-green-400">Registration submitted successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegistrationPage;