"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { 
  FaRocket, 
  FaGlobe, 
  FaTrophy, 
  FaLightbulb, 
  FaGraduationCap, 
  FaHandshake, 
  FaUsers, 
  FaBriefcase, 
  FaAward, 
  FaBook,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaNetworkWired,
  FaProjectDiagram,
  FaMedal,
  FaChartLine,
  FaCode,
  FaCogs,
  FaUserTie,
  FaStar
} from "react-icons/fa";

interface CounterState {
  events: number;
  members: number;
  projects: number;
  awards: number;
}

interface CounterTargets {
  events: number;
  members: number;
  projects: number;
  awards: number;
}

const JoinIEEEPage: React.FC = () => {
  const router = useRouter();
  const [counters, setCounters] = useState<CounterState>({ events: 0, members: 0, projects: 0, awards: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#050510';
    document.body.style.color = '#e5e7eb';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const targets: CounterTargets = { events: 50, members: 200, projects: 25, awards: 15 };
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    
    Object.keys(targets).forEach(key => {
      const targetKey = key as keyof CounterTargets;
      const increment = targets[targetKey] / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[targetKey]) {
          current = targets[targetKey];
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, interval);
    });
  };

  const handleRegistrationClick = () => {
    router.push('/registration');
  };

  const handleHeaderNavigation = (section: string) => {
    router.push(`/#${section}`);
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({ 
        top: element.offsetTop - 100, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .domain-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .domain-card:hover {
            transform: translateY(-10px);
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
        customButton={
          <a 
            href="/registration" 
            className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-300"
          >
            Register Now
          </a>
        }
      />
      <main className="w-full min-h-screen starry-bg text-gray-200 relative overflow-hidden">
        
        {/* Starry Background */}
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
              {/* Icosahedron wireframe paths */}
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
          
          {/* Existing floating background elements with adjusted colors */}
          <div className="absolute top-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-blue-500/8 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-600/4 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 md:w-80 md:h-80 bg-blue-400/4 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 md:pt-24 pb-8 md:pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative">
              {/* IEEE Logo */}
              <div className="relative inline-block mb-4 md:mb-6">
                <img
                  src="/ieee-emblem.png"
                  alt="IEEE Emblem"
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 object-contain mx-auto"
                />
              </div>
              
              {/* Main Title - Single Line */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 md:mb-4 leading-tight whitespace-nowrap">
                <span className="text-blue-400">Join IEEE </span>
                <span className="text-white">VSIT</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed px-4">
                Unlock your potential, build the future, and connect with the world's largest technical community
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-8 px-4">
                <button 
                  onClick={() => scrollToElement('benefits-section')}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-base md:text-lg font-bold transition-all duration-300"
                >
                  Explore Benefits
                </button>
                <button 
                  onClick={() => scrollToElement('stats-section')}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-blue-400 text-blue-400 rounded-full text-base md:text-lg font-semibold hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
              
              {/* Benefits Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto px-4">
                {[
                  { icon: FaRocket, text: "Innovation" },
                  { icon: FaNetworkWired, text: "Global Network" },
                  { icon: FaTrophy, text: "Excellence" },
                  { icon: FaLightbulb, text: "Learning" }
                ].map((item, index) => (
                  <div key={index} className="glass-card rounded-xl md:rounded-2xl p-2 md:p-4 hover:bg-white/10 transition-all duration-300">
                    <item.icon className="text-xl md:text-3xl mb-1 md:mb-2 text-blue-400 mx-auto" />
                    <div className="text-xs md:text-sm font-semibold text-gray-300">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="stats-section" className="py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { key: 'events' as keyof CounterState, label: 'Events Organized', suffix: '+', icon: FaCalendarAlt },
                { key: 'members' as keyof CounterState, label: 'Active Members', suffix: '+', icon: FaUsers },
                { key: 'projects' as keyof CounterState, label: 'Projects Completed', suffix: '+', icon: FaProjectDiagram },
                { key: 'awards' as keyof CounterState, label: 'Awards Won', suffix: '+', icon: FaMedal }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-blue-400/50 transition-all duration-300">
                    <stat.icon className="text-2xl md:text-3xl text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-4xl lg:text-5xl font-black text-blue-400 mb-1 md:mb-2">
                      {counters[stat.key]}{stat.suffix}
                    </div>
                    <div className="text-xs md:text-sm text-gray-300 font-semibold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Status Section - Moved Here */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex items-center justify-center mb-3">
                <FaUserTie className="text-blue-400 text-2xl md:text-3xl mr-3" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Ready to Join?</h2>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Take the first step towards transforming your future with IEEE VSIT
              </p>
              <button
                onClick={handleRegistrationClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <FaCheckCircle className="mr-2" />
                  Start Registration
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section id="benefits-section" className="py-8 md:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
                Why Choose <span className="text-blue-400">IEEE VSIT?</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Experience unparalleled growth opportunities and join a community of innovators
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: FaCode,
                  title: "Premium Workshops",
                  description: "Access exclusive technical workshops led by industry experts, covering cutting-edge technologies like AI, IoT, and blockchain."
                },
                {
                  icon: FaNetworkWired,
                  title: "Global Networking",
                  description: "Connect with IEEE professionals worldwide, attend international conferences, and build lasting professional relationships."
                },
                {
                  icon: FaChartLine,
                  title: "Leadership Development",
                  description: "Lead teams, organize events, and develop management skills that will set you apart in your career."
                },
                {
                  icon: FaBriefcase,
                  title: "Career Advancement",
                  description: "Access exclusive internship opportunities, job placements, and career guidance from industry mentors."
                },
                {
                  icon: FaStar,
                  title: "Competitions & Awards",
                  description: "Participate in prestigious IEEE competitions, hackathons, and win scholarships and recognition."
                },
                {
                  icon: FaCogs,
                  title: "Research Opportunities",
                  description: "Collaborate on cutting-edge research projects and publish papers in IEEE journals and conferences."
                }
              ].map((benefit, index) => (
                <div key={index} className="group">
                  <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-blue-400/50 transition-all duration-500 domain-card h-full">
                    <benefit.icon className="text-3xl md:text-5xl mb-4 md:mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 md:py-12 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-white mb-8 md:mb-12">
              What Our <span className="text-blue-400">Members Say</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "Final Year, Computer Engineering",
                  quote: "IEEE VSIT transformed my college experience. The workshops and networking opportunities helped me land my dream job at a top tech company!",
                  icon: FaUsers
                },
                {
                  name: "Arjun Patel",
                  role: "Third Year, Electronics Engineering", 
                  quote: "Leading projects through IEEE taught me invaluable leadership skills. I'm now confident in managing teams and driving innovation.",
                  icon: FaRocket
                },
                {
                  name: "Sneha Gupta",
                  role: "Alumni, Software Engineer at Google",
                  quote: "My IEEE journey started at VSIT and opened doors to global opportunities. The community and mentorship are unmatched!",
                  icon: FaGraduationCap
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 h-full">
                  <testimonial.icon className="text-3xl md:text-4xl mb-4 text-blue-400" />
                  <p className="text-sm md:text-base text-gray-300 italic mb-4 md:mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-bold text-white text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-blue-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-white mb-8 md:mb-12">
              Frequently Asked <span className="text-blue-400">Questions</span>
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  question: "Who can join IEEE VSIT?",
                  answer: "Any VSIT student passionate about technology, innovation, or leadership development. No prior technical experience required - we welcome all backgrounds!"
                },
                {
                  question: "What makes IEEE VSIT special?",
                  answer: "We offer unique opportunities like international conference participation, direct industry mentorship, and access to cutting-edge research projects that you won't find elsewhere."
                },
                {
                  question: "How much does membership cost?",
                  answer: "We offer flexible membership options to suit different budgets. Detailed pricing will be announced with registration. Financial assistance is available for deserving students."
                },
                {
                  question: "When does registration open?",
                  answer: "Registration for the 2024-25 academic year will open soon! Follow our social media or join our WhatsApp group for instant updates."
                },
                {
                  question: "What time commitment is expected?",
                  answer: "Participation is flexible based on your schedule. Most activities are evening/weekend based, and you can choose your level of involvement."
                }
              ].map((faq, index) => (
                <div key={index} className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-base md:text-xl font-bold text-blue-400 mb-2 md:mb-3">{faq.question}</h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default JoinIEEEPage;