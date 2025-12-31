import type React from "react";



const WaveformIllustration : React.FC<any> = ({IsSignUP}) => {
  const heights = [
    18, 35, 52, 68, 78, 65, 48, 38, 55, 72, 82, 70,
    52, 42, 58, 75, 85, 72, 58, 45, 62, 75, 65, 48, 35, 22
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-8">

      {/* Ambient Glow Behind Waveform */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(138, 47, 255, 0.15) 0%, rgba(138, 47, 255, 0.05) 50%, transparent 100%)",
            animationDuration: "4s"
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(75, 112, 255, 0.12) 0%, rgba(75, 112, 255, 0.04) 50%, transparent 100%)",
            animationDelay: "2s",
            animationDuration: "5s"
          }}
        />
      </div>

      {/* Illustration Container */}
      <div className="relative z-10 w-full max-w-sm space-y-6">

        {/* Waveform Section */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-center gap-1.5 h-20">
            {heights.map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-linear-to-t from-[#8A2FFF] to-[#4C6FFF]"
                style={{
                  height: `${h}%`,
                  animation: "waveform 2.5s ease-in-out infinite",
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0.75 + h / 250,
                  boxShadow: "0 0 8px rgba(138, 47, 255, 0.3)"
                }}
              />
            ))}
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2 pb-5">
            <div className="flex gap-2">
              <h1 className="text-4xl text-white">Welcome to</h1>
              <h1 className="text-4xl bg-linear-to-r from-cyan-700 via-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                ScripTum !
              </h1>
            </div>
            <p className="text-center text-gray-300"> {IsSignUP === false ? "Sign in to continue your transcription workspace." : "Sign Up to Start Your journey."}</p>
          </div>

          {/* Text Lines Placeholder */}
          <div className="space-y-2.5 px-8 pt-2">
            <div
              className="h-[7px] rounded-full bg-linear-to-r from-[#8A2FFF]/35 to-[#4C6FFF]/35 animate-shimmer"
              style={{
                width: "100%",
                animationDelay: "0s",
                boxShadow: "0 2px 8px rgba(138,47,255,0.15)"
              }}
            />
            <div
              className="h-[7px] rounded-full bg-linear-to-r from-[#8A2FFF]/30 to-[#4C6FFF]/30 animate-shimmer"
              style={{
                width: "88%",
                animationDelay: "0.3s",
                boxShadow: "0 2px 8px rgba(138,47,255,0.12)"
              }}
            />
            <div
              className="h-[7px] rounded-full bg-linear-to-r from-[#8A2FFF]/28 to-[#4C6FFF]/28 animate-shimmer"
              style={{
                width: "75%",
                animationDelay: "0.6s",
                boxShadow: "0 2px 8px rgba(138,47,255,0.1)"
              }}
            />
            <div
              className="h-[7px] rounded-full bg-linear-to-r from-[#8A2FFF]/25 to-[#4C6FFF]/25 animate-shimmer"
              style={{
                width: "92%",
                animationDelay: "0.9s",
                boxShadow: "0 2px 8px rgba(138,47,255,0.08)"
              }}
            />
          </div>
        </div>

        {/* Caption Card */}
        <div
          className="text-center px-6 py-4 rounded-2xl backdrop-blur-xl mx-4 mt-8 bg-white/40"
        >
          <p className="text-gray-900 font-medium leading-relaxed text-sm">
            AI-powered transcription that turns your audio into structured, accurate text.
          </p>
        </div>

        {/* Floating Accent Dots */}
        <div
          className="absolute top-6 right-8 w-2 h-2 rounded-full bg-linear-to-br from-[#8A2FFF] to-[#4C6FFF] opacity-50 animate-float-slow"
          style={{ boxShadow: "0 0 12px rgba(138,47,255,0.5)" }}
        />
        <div
          className="absolute top-2 right-16 w-1.5 h-1.5 rounded-full bg-linear-to-br from-[#4C6FFF] to-[#8A2FFF] opacity-35 animate-float-slower"
          style={{ boxShadow: "0 0 8px rgba(75,112,255,0.4)" }}
        />
        <div
          className="absolute top-8 left-6 w-2 h-2 rounded-full bg-linear-to-br from-[#8A2FFF] to-[#4C6FFF] opacity-45 animate-float-slow"
          style={{
            animationDelay: "1s",
            boxShadow: "0 0 10px rgba(138,47,255,0.5)"
          }}
        />

        {/* Floating Glass Shape */}
        <div
          className="absolute top-4 right-4 w-14 h-14 rounded-2xl backdrop-blur-sm animate-float"
          style={{
            background:
              "linear-gradient(135deg, rgba(138,47,255,0.06), rgba(75,112,255,0.06))",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 24px rgba(138,47,255,0.08)"
          }}
        />

        {/* Subtle Wave Line */}
        <div className="absolute bottom-2 right-12 opacity-25">
          <svg width="36" height="18" viewBox="0 0 36 18" fill="none">
            <path
              d="M0 9C4.5 9 4.5 0 9 0C13.5 0 13.5 18 18 18C22.5 18 22.5 0 27 0C31.5 0 31.5 9 36 9"
              stroke="url(#waveGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="9" x2="36" y2="9">
                <stop offset="0%" stopColor="#8A2FFF" />
                <stop offset="100%" stopColor="#4C6FFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}


export default WaveformIllustration;