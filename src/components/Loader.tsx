import "./Loader.css";

export function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black space-y-4">
      <span className="loader"></span>
      <p className="text-white font-mono text-sm">
        Initializing Model Parameters...
      </p>
    </div>
  );
}
