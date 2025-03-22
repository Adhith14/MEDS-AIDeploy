import React from "react";
import { Link } from "react-router-dom";
import Squares from "./Squares";

const PreviousPrediction = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white text-center">
      {/* Background Squares */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <Squares 
          speed={0.2} 
          squareSize={40}
          direction="diagonal"
          borderColor="#ffc05c"
          hoverFillColor="#222"
        />
      </div>

        {/* Content */}
        <h1 className="text-6xl font-bold drop-shadow-lg text-black">404</h1>
        <p className="text-2xl mt-4 text-black">Oops! Looks like this page took the wrong prescription.</p>
        <p className="text-lg mt-2 opacity-80 text-black">But don’t worry, we have the right remedy!</p>

        {/* Home Link */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PreviousPrediction;
