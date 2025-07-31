import React from 'react';
import { BrainCircuit, Code, ShieldCheck, CircuitBoard } from 'lucide-react';

const DomainsSection = () => {
    const domains = [
        { name: 'AI & ML', desc: 'Exploring intelligent systems and data-driven solutions.', icon: <BrainCircuit className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-blue-500" /> },
        { name: 'Web & App Dev', desc: 'Building modern, responsive digital experiences.', icon: <Code className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-blue-500" /> },
        { name: 'Cybersecurity', desc: 'Protecting digital assets in an interconnected world.', icon: <ShieldCheck className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-blue-500" /> },
        { name: 'Embedded & IoT', desc: 'Connecting the physical and digital worlds.', icon: <CircuitBoard className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-blue-500" /> }
    ];

    return (
        <section id="domains" className="py-14 sm:py-20">
            <div className="container mx-auto px-2 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Our Technical Domains</h2>
                <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {domains.map(domain => (
                        <div key={domain.name} className="domain-card glass-card p-4 sm:p-8 rounded-xl text-center">
                            <div className="h-20 sm:h-24 w-full mb-3 sm:mb-4 flex items-center justify-center">
                                {domain.icon}
                            </div>
                            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{domain.name}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">{domain.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DomainsSection;
