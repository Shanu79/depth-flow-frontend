
export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050511] text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
          We'll be right back!
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          We are currently undergoing scheduled maintenance to improve your experience. 
          Please check back shortly.
        </p>
      </div>
    </div>
  );
}