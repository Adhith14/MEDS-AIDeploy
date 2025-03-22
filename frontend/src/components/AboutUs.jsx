import React, { useState, useEffect, useRef } from 'react';
import Squares from './Squares';

const AboutUs = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cratesRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    if (!cratesRef.current) return;
    
    let angle = 0;
    const centerX = 100;
    const centerY = 100;
    const radius = 60;
    const crateElements = cratesRef.current.querySelectorAll('.crate');
    
    const animate = () => {
      if (isHovering) {
        // Stop animation when hovering
        cancelAnimationFrame(animationRef.current);
        return;
      }
      
      crateElements.forEach((crate, index) => {
        // Position in triangle formation (120° apart)
        const crateAngle = angle + (index * (Math.PI * 2) / 3);
        const x = centerX + Math.cos(crateAngle) * radius;
        const y = centerY + Math.sin(crateAngle) * radius;
        
        crate.style.transform = `translate(${x}px, ${y}px) rotate(${angle * 30}deg)`;
      });
      
      angle += 0.005;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isHovering]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background squares with the provided styling */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <Squares 
          speed={0.2} 
          squareSize={40}
          direction='diagonal'
          borderColor='#ffc05c'
          hoverFillColor='#222'
        />
      </div>

      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300/30 to-blue-500/30 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">About Us</h1>
            <div className="w-32 h-1 bg-white/80 rounded-full"></div>
          </div>

          {/* Content with organic shapes */}
          <div className="grid md:grid-cols-12 gap-8 text-white">
            {/* Story Section - Curved shape */}
            <div className="md:col-span-7 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[60px] shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"></div>
              <div className="relative p-10 z-10">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg">
                  We began with a simple vision: to create products that make a difference. 
                  Founded in 2018, our journey has been defined by innovation, perseverance, 
                  and a commitment to excellence. Every challenge we've faced has shaped us 
                  into the company we are today.
                </p>
              </div>
            </div>

            {/* Mission Section - Wavy shape */}
            <div className="md:col-span-5 relative group md:mt-16">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500 to-indigo-600 rounded-[45px] shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"></div>
              <div className="relative p-8 z-10">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg">
                  We're on a mission to revolutionize how people interact with technology. 
                  Through thoughtful design and cutting-edge solutions, we aim to create 
                  experiences that elevate everyday life.
                </p>
              </div>
            </div>

            {/* Team Section - Organic shape */}
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-[70px] shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"></div>
              <div className="relative p-8 z-10">
                <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                <p className="text-lg">
                  Our diverse team brings together expertise from various fields, united by 
                  a shared passion for innovation. We believe in collaboration, creativity, 
                  and continuous learning.
                </p>
              </div>
            </div>

            {/* Values Section - Blob-like shape */}
            <div className="md:col-span-7 relative group md:mt-8">
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-[55px] shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"></div>
              <div className="relative p-10 z-10">
                <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span>Innovation in everything</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span>Integrity in relationships</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span>Impact through solutions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span>Inclusivity in community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Container for Get In Touch and Rotating Crates - using flex */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between">
            {/* Contact section - Reduced width */}
            <div className="md:w-2/3 relative overflow-hidden group mb-8 md:mb-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[100px] shadow-xl transform transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-2xl"></div>
              <div className="relative p-8 text-white z-10">
                <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
                <p className="text-lg text-center mb-6">
                  We'd love to hear from you. Let's start a conversation about how we can help bring your ideas to life.
                </p>
                <div className="flex justify-center">
                  <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>

            {/* Rotating crates container */}
            <div 
              ref={cratesRef} 
              className="md:w-1/3 h-48 relative z-30 flex justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* LinkedIn Crates with hover effect */}
              {[
                { color1: "blue-400", color2: "cyan-300", id: 0, link: "https://www.linkedin.com/in/adhithkl/" },
                { color1: "cyan-400", color2: "blue-300", id: 2, link: "https://www.linkedin.com/in/anngeo/" },
                { color1: "indigo-400", color2: "blue-300", id: 1, link: "https://www.linkedin.com/in/tonykseby/" }
              ].map((colorSet) => (
                <a 
                  key={colorSet.id}
                  href={colorSet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`crate absolute w-24 h-24 bg-gradient-to-br from-${colorSet.color1} to-${colorSet.color2} rounded-2xl shadow-lg opacity-80 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:opacity-100 hover:scale-110 flex items-center justify-center`}
                >
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;