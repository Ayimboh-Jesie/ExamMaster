import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <header className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Take Your Revision Exercise to the Next Level and Pass with Confidence
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Unlock Your Potential with Our Comprehensive Exam Question Platform.
          </p>
          <button className="mt-6 bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition">
            Get Started
          </button>
        </div>
      </header><br/>
    </div>



    
  );
}

export default LandingPage;
