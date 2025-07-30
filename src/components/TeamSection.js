import React from 'react';

const TeamSection = () => (
  <section id="team" className="py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet the Council</h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto mb-12"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[
          { name: 'Person Name', role: 'Chairperson' },
          { name: 'Person Name', role: 'Vice Chairperson' },
          { name: 'Person Name', role: 'Secretary' },
          { name: 'Person Name', role: 'Treasurer' },
        ].map(member => (
          <div key={member.role} className="text-center">
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

export default TeamSection;
