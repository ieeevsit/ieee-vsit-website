import mongoose, { Schema, Document } from 'mongoose';

// This interface matches the FormData in your page.tsx
export interface IRegistration extends Document {
  name: string;
  rollNo: string;
  course: string;
  year: string;
  email: string;
  phone: string;
  motivation?: string;
}

const RegistrationSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Please provide your full name.'] },
    rollNo: { type: String, required: [true, 'Please provide your roll number.'] },
    course: { type: String, required: [true, 'Please select your course.'] },
    year: { type: String, required: [true, 'Please select your year of study.'] },
    email: { 
      type: String, 
      required: [true, 'Please provide your email address.'],
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
      unique: true // Ensures no duplicate emails
    },
    phone: { 
      type: String, 
      required: [true, 'Please provide your phone number.'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number.']
    },
    motivation: { type: String, maxLength: 500 },
  },
  {
    timestamps: true // Adds createdAt and updatedAt timestamps
  }
);

// Prevent model overwrite in development
export default mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', RegistrationSchema);