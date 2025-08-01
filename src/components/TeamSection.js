"use client";
import React, { useState } from 'react';

// IEEE Core Committee data
const ieeeCoreCommittee = [
  { name: 'Soham Darekar', role: 'Chairperson', img: undefined },
  { name: 'Shaunik Virdi', role: 'Vice-Chairperson', img: undefined },
  { name: 'Rishi Desai', role: 'General Secretary', img: undefined },
  { name: 'Prarthana Shetty', role: 'WIE Chairperson', img: undefined },
  { name: 'Shreya Badgujar', role: 'WIE Vice-Chairperson', img: undefined },
  { name: 'Aaditi', role: 'WIE General Secretary', img: undefined },
];

const wieCoreCommittee = [
  { name: 'Prarthana Shetty', role: 'Chairperson', img: undefined },
  { name: 'Shreya Badgujar', role: 'Vice-Chairperson', img: undefined },
  { name: 'Aaditi Bhagwat', role: 'General Secretary', img: undefined },
];

// Heads data
const heads = [
  { name: 'Atharva Gajakosh', role: 'Technical Head', img: undefined },
  { name: 'Isha Salgarkar', role: 'Design Head', img: undefined },
  { name: 'Alka Saw', role: 'Digital Head (Photography)', img: undefined },
  { name: 'Saniya Telgu', role: 'Digital Head (Editing)', img: undefined },
  { name: 'Siddharth Pitale', role: 'Membership Head', img: undefined },
  { name: 'Gayatri Chavan', role: 'Documentation Head', img: undefined },
];

// Members data
const members = [
  { name: 'Nihar Kulkarni', role: 'Design Member', img: undefined },
  { name: 'Vedant Raut', role: 'Digital Member', img: undefined },
  { name: 'Tanish Mehere', role: 'Digital Member', img: undefined },
  { name: 'Pratham Dangwal', role: 'Technical Member', img: undefined },
];

// Tabs config
const tabs = [
  { label: "Core Committee", key: "core" },
  { label: "Heads", key: "heads" },
  { label: "Members", key: "members" },
];

// Helper to get team data by tab
const getTeam = (tab) => {
  if (tab === "core") return ieeeCoreCommittee;
  if (tab === "heads") return heads;
  if (tab === "members") return members;
  return [];
};

const TeamSection = ({ wieCore }) => {
  // If wieCore is true, render only the WIE Core Committee (no tabs)
  if (wieCore) {
    return (
      <section id="team" className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet the WIE Core Committee</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
            {wieCoreCommittee.map((member, idx) => (
              <div key={member.role + idx} className="text-center flex flex-col items-center">
                <div className="relative inline-block">
                  <img
                    src={member.img || "https://placehold.co/400x400/1f2937/ffffff?text=Member"}
                    className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold">{member.name}</h3>
                <p className="text-blue-400 text-sm sm:text-base">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const [activeTab, setActiveTab] = useState("core");
  const team = getTeam(activeTab);

  // Determine grid classes based on tab
  const gridClass =
    activeTab === "core"
      ? "grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center"
      : activeTab === "heads"
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8";

  return (
    <section id="team" className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet the Committee</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
        {/* Tabs */}
        <div className="flex flex-col gap-3 items-stretch max-w-xs mx-auto mb-10 sm:flex-row sm:justify-center sm:gap-0 sm:max-w-none">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold transition-colors duration-200
                ${activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
                ${activeTab === tab.key ? "" : "sm:mx-2"}
                `}
              style={{
                borderRadius: '9999px',
                marginBottom: '0px'
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={gridClass}>
          {activeTab === "heads" ? (
            <>
              {/* First row: 4 heads */}
              {heads.slice(0, 4).map((member, idx) => (
                <div key={member.role + idx} className="text-center flex flex-col items-center">
                  <div className="relative inline-block">
                    <img
                      src={member.img || "https://placehold.co/400x400/1f2937/ffffff?text=Member"}
                      className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                      alt={member.name}
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-bold">{member.name}</h3>
                  <p className="text-blue-400 text-sm sm:text-base">{member.role}</p>
                </div>
              ))}
              {/* Second row: empty, Siddharth, Gayatri, empty (so both are centered in the row) */}
              <div className="hidden lg:block"></div>
              <div className="text-center flex flex-col items-center">
                <div className="relative inline-block">
                  <img
                    src={heads[4].img || "https://placehold.co/400x400/1f2937/ffffff?text=Member"}
                    className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                    alt={heads[4].name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold">{heads[4].name}</h3>
                <p className="text-blue-400 text-sm sm:text-base">{heads[4].role}</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="relative inline-block">
                  <img
                    src={heads[5].img || "https://placehold.co/400x400/1f2937/ffffff?text=Member"}
                    className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                    alt={heads[5].name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold">{heads[5].name}</h3>
                <p className="text-blue-400 text-sm sm:text-base">{heads[5].role}</p>
              </div>
              <div className="hidden lg:block"></div>
            </>
          ) : (
            team.map((member, idx) => (
              <div key={member.role + idx} className="text-center flex flex-col items-center">
                <div className="relative inline-block">
                  <img
                    src={member.img || "https://placehold.co/400x400/1f2937/ffffff?text=Member"}
                    className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold">{member.name}</h3>
                <p className="text-blue-400 text-sm sm:text-base">{member.role}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
