import "./Loader.css";
import bgVideo from "@/assets/loader-bg.mp4"; // put your video inside assets

export function Loader() {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src="/videos/7234993-uhd_3840_2160_30fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <span className="loader"></span>
        <p className="text-white font-mono text-sm">
          Initializing Model Parameters...
        </p>
      </div>
    </div>
  );
}
