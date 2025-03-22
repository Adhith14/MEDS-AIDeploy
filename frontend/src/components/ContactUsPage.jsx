import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Users } from 'lucide-react';

// Squares component implementation
const Squares = ({ speed = 0.2, squareSize = 40, direction = 'diagonal', borderColor = '#ffc05c', hoverFillColor = '#222' }) => {
  // Generate squares for the background
  const squareCount = 50; // Number of squares to generate
  const squares = Array(squareCount).fill().map((_, i) => ({
    id: i,
    size: Math.random() * (squareSize * 0.5) + squareSize * 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    speed: (Math.random() * 0.5 + 0.5) * speed,
  }));

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {squares.map(square => (
        <div
          key={square.id}
          className="absolute border-2 transition-all duration-300 hover:bg-opacity-30"
          style={{
            width: `${square.size}px`,
            height: `${square.size}px`,
            left: `${square.x}%`,
            top: `${square.y}%`,
            borderColor: borderColor,
            transform: `rotate(${square.rotation}deg)`,
            animation: `float-${direction} ${20 / square.speed}s infinite linear`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverFillColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-diagonal {
          0% {
            transform: translate(0, 0) rotate(${Math.random() * 360}deg);
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}100px, ${Math.random() > 0.5 ? '' : '-'}100px) rotate(${Math.random() * 360}deg);
          }
        }
        @keyframes float-up {
          0% { transform: translateY(0) rotate(${Math.random() * 360}deg); }
          100% { transform: translateY(-100px) rotate(${Math.random() * 360}deg); }
        }
        @keyframes float-down {
          0% { transform: translateY(0) rotate(${Math.random() * 360}deg); }
          100% { transform: translateY(100px) rotate(${Math.random() * 360}deg); }
        }
        @keyframes float-left {
          0% { transform: translateX(0) rotate(${Math.random() * 360}deg); }
          100% { transform: translateX(-100px) rotate(${Math.random() * 360}deg); }
        }
        @keyframes float-right {
          0% { transform: translateX(0) rotate(${Math.random() * 360}deg); }
          100% { transform: translateX(100px) rotate(${Math.random() * 360}deg); }
        }
      `}</style>
    </div>
  );
};

const ContactUsPage = () => {
  const [formData, setState] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Social media links with Font Awesome icon classes
  const socialMediaLinks = [
    { name: 'Facebook', iconClass: 'fab fa-facebook-f', color: '#1877F2' },
    { name: 'Twitter', iconClass: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'Instagram', iconClass: 'fab fa-instagram', color: '#E4405F' },
    { name: 'LinkedIn', iconClass: 'fab fa-linkedin-in', color: '#0A66C2' },
    { name: 'YouTube', iconClass: 'fab fa-youtube', color: '#FF0000' }
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Squares Component */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Squares
          speed={0.2}
          squareSize={40}
          direction='diagonal'
          borderColor='#ffc05c'
          hoverFillColor='#222'
        />
      </div>
      
      {/* Glassmorphism container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Contact form section */}
        <div className="w-full md:w-3/5 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 border border-white border-opacity-20">
          <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="Your name" 
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Email</label>
              <input 
                type="email" 
                className="w-full p-3 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="your@email.com" 
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea 
                className="w-full p-3 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="How can we help you?" 
              ></textarea>
            </div>
            
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>
        
        {/* Info section */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-orange-400 to-orange-600 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Get in touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white opacity-70">Phone</p>
                  <p className="text-white font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white opacity-70">Email</p>
                  <p className="text-white font-semibold">hello@company.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white opacity-70">Address</p>
                  <p className="text-white font-semibold">123 Business Ave, Suite 500<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Media Icons Area with icon at center */}
          <div className="mt-8 relative h-40">
            <div className="social-circle-container">
              {/* Center point with icon instead of text */}
              <div className="social-center">
                <i className="fas fa-share-alt text-white text-lg"></i>
              </div>
              
              {/* Social media icons orbiting the center */}
              {socialMediaLinks.map((social, index) => {
                const angle = (index * (360 / socialMediaLinks.length));
                
                return (
                  <div 
                    key={social.name}
                    className="social-icon"
                    style={{
                      animationDelay: `${index * -1.5}s`
                    }}
                  >
                    <i className={social.iconClass} style={{ color: social.color }}></i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Font Awesome script */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      
      {/* CSS for the rotating animation */}
      <style jsx>{`
        .social-circle-container {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto;
        }
        
        .social-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          animation: pulse 2s infinite;
        }
        
        .social-icon {
          position: absolute;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          
          top: 50%;
          left: 50%;
          margin-left: -20px;
          margin-top: -20px;
          transform-origin: center;
          animation: orbit 10s linear infinite;
        }
        
        .social-icon i {
          font-size: 18px;
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;