"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiHash,
  FiBook,
  FiCalendar,
  FiMail,
  FiPhone,
  FiEdit3,
  FiArrowRight,
  FiCheckCircle,
  FiLoader,
  FiInfo,
  FiUserPlus,
} from "react-icons/fi";

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
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
  isFocused: boolean;
}

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
  isFocused,
}) => {
  const isError = !!error;
  const hasValue = value && value.length > 0;
  const showFloatingLabel = isFocused || hasValue;

  return (
    <div className="relative group mb-4 sm:mb-6">
      <div
        className={`relative flex items-center border-2 rounded-xl transition-all duration-200
      ${
        isFocused
          ? "border-blue-400 bg-gray-800/80"
          : "border-gray-600 hover:border-gray-500"
      }
      ${isError ? "border-red-400" : ""}
      bg-gray-800/60 min-h-[56px] sm:min-h-[60px]`}
      >
        {Icon && (
          <div className="pl-3 sm:pl-4 pr-2 flex-shrink-0">
            <Icon
              className={`transition-colors text-lg sm:text-xl ${
                isFocused ? "text-blue-400" : "text-gray-400"
              }`}
            />
          </div>
        )}

        <div className="relative w-full">
          <label
            className={`absolute left-0 transition-all duration-200 pointer-events-none font-medium
            ${
              showFloatingLabel
                ? "-top-5 text-xs text-blue-400"
                : "top-1/2 -translate-y-1/2 text-base text-gray-400"
            }`}
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>

          {type === "textarea" ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={maxLength}
              rows={4}
              className="w-full px-3 sm:px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-base"
              placeholder={showFloatingLabel ? placeholder : ""}
              style={{ fontSize: '16px', minHeight: '44px' }}
            />
          ) : type === "select" ? (
            <select
              name={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="w-full px-3 sm:px-4 py-4 bg-transparent text-white appearance-none cursor-pointer focus:outline-none text-base"
              style={{ fontSize: '16px', minHeight: '44px' }}
            >
              <option value="" disabled className="text-gray-500">
              </option>
              {options?.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="text-white bg-gray-800"
                >
                  {option}
                </option>
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
              className="w-full px-3 sm:px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
              placeholder={showFloatingLabel ? placeholder : ""}
              style={{ fontSize: '16px', minHeight: '44px' }}
            />
          )}
        </div>
        {type === "select" && (
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2 ml-1 flex items-center">
          <FiInfo className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rollNo: "",
    course: "",
    year: "",
    email: "",
    phone: "",
    motivation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a192f";
    document.body.style.color = "#e5e7eb";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const handleHeaderNavigation = (section: string) => {
    router.push(`/#${section}`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 2000);
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
            onClick={() => router.push("/join-ieee")}
            className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-300"
          >
            Back to Info
          </button>
        }
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 text-white pt-24 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4 sm:mb-6 shadow-lg">
                <FiUserPlus className="text-3xl sm:text-4xl text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                Join <span className="text-blue-400">IEEE VSIT</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto px-4">
                Fill out this form to become part of our innovative community
              </p>
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl mx-2 sm:mx-0">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <FormInput
                    label="Full Name"
                    name="name"
                    icon={FiUser}
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.name}
                    isFocused={focusedField === "name"}
                  />

                  <FormInput
                    label="Roll Number"
                    name="rollNo"
                    icon={FiHash}
                    placeholder="e.g., 25302F000X"
                    required
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("rollNo")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.rollNo}
                    isFocused={focusedField === "rollNo"}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <FormInput
                    label="Course"
                    name="course"
                    type="select"
                    icon={FiBook}
                    required
                    options={["Information Technology", "Data Science"]}
                    value={formData.course}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("course")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.course}
                    isFocused={focusedField === "course"}
                  />

                  <FormInput
                    label="Year of Study"
                    name="year"
                    type="select"
                    icon={FiCalendar}
                    required
                    options={["First Year", "Second Year", "Third Year"]}
                    value={formData.year}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("year")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.year}
                    isFocused={focusedField === "year"}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={FiMail}
                    placeholder="youremail@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.email}
                    isFocused={focusedField === "email"}
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    icon={FiPhone}
                    placeholder="10-digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.phone}
                    isFocused={focusedField === "phone"}
                  />
                </div>

                <div className="w-full">
                  <FormInput
                    label="Why do you want to join IEEE VSIT?"
                    name="motivation"
                    type="textarea"
                    icon={FiEdit3}
                    placeholder="Tell us about your motivation and what you hope to achieve..."
                    maxLength={500}
                    value={formData.motivation}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("motivation")}
                    onBlur={() => setFocusedField(null)}
                    error={errors.motivation}
                    isFocused={focusedField === "motivation"}
                  />
                </div>

                <div className="pt-4 sm:pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] touch-manipulation"
                    style={{ fontSize: '16px', minHeight: '56px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin mr-3 text-xl" />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <FiArrowRight className="ml-3 text-lg" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {submitStatus === "success" && (
                <div className="mt-8 p-6 bg-green-600/20 border-2 border-green-400 rounded-xl flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="text-green-400 mr-3 text-xl" />
                  <span className="text-green-400 text-lg font-semibold">
                    Registration submitted successfully!
                  </span>
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