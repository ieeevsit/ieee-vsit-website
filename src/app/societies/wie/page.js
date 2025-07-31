"use client";

import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TeamSection from "../../../components/TeamSection";

export default function WIEPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4 text-left">
            Women in Engineering (WIE)
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            IEEE Women in Engineering (WIE) is one of the world’s largest
            international professional organizations dedicated to promoting women
            engineers and scientists, and inspiring girls around the world to
            follow their academic interests to a career in engineering.
          </p>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-white">Our Mission</h2>
            <p className="text-gray-300">
              To inspire, engage, and advance women in engineering and technology
              through networking, mentorship, and professional development
              opportunities.
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Activities & Initiatives
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Workshops and seminars on technical and professional skills</li>
              <li>Mentorship programs connecting students with industry professionals</li>
              <li>Community outreach to encourage girls in STEM</li>
              <li>Networking events and panel discussions</li>
            </ul>
          </section>
        </div>
        {/* Meet the WIE Core Committee */}
        <section className="max-w-6xl mx-auto mt-16">
          <TeamSection wieCore />
        </section>
      </main>
      <Footer />
    </>
  );
}
