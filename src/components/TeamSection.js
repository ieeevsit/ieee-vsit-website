import React, { useState } from 'react';

const coreCommittee = [
  { name: 'Person Name', role: 'Chairperson' },
  { name: 'Person Name', role: 'Vice Chairperson' },
  { name: 'Person Name', role: 'Secretary' },
  { name: 'Person Name', role: 'Treasurer' },
];

const heads = [
  { name: 'Head Name', role: 'Technical Head' },
  { name: 'Head Name', role: 'Design Head' },
  { name: 'Head Name', role: 'Event Head' },
  { name: 'Head Name', role: 'PR Head' },
];

const members = [
  { name: 'Member Name', role: 'Member' },
  { name: 'Member Name', role: 'Member' },
  { name: 'Member Name', role: 'Member' },
  { name: 'Member Name', role: 'Member' },
];

const tabs = [
  { label: "Core Committee", key: "core" },
  { label: "Heads", key: "heads" },
  { label: "Members", key: "members" },
];

const getTeam = (tab) => {
  if (tab === "core") return coreCommittee;
  if (tab === "heads") return heads;
  if (tab === "members") return members;
  return [];
};

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState("core");
  const team = getTeam(activeTab);

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-6">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={member.role + idx} className="text-center">
              <div className="relative inline-block">
                <img src="https://placehold.co/400x400/1f2937/ffffff?text=Member" className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700" alt="Team Member" />
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
              <p className="text-blue-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
