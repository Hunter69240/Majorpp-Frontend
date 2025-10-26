import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <style>
          {`
            @keyframes fade {
              0%, 39%, 100% { opacity: 0.3; }
              40% { opacity: 1; }
            }
          `}
        </style>

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 30}deg) translate(40px)`,
              animation: "fade 1.2s linear infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
