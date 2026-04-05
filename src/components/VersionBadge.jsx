const VersionBadge = () => {
  return (
    // Outer wrapper for the dark background context (optional, just for display)
    <>
      {/* The Gradient Border Wrapper
        - bg-gradient-to-r creates the purple-to-blue transition.
        - p-[1.5px] acts as the thickness of the border.
        - rounded-2xl gives it the pill/rounded rectangle shape.
      */}
      <div className="relative inline-flex p-0.5 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500">
        <div className="flex h-full w-full items-center justify-center rounded-xl py-1 px-3 bg-[#161b2e]/90">
          {/* The Text
            - Using a custom textShadow to replicate the glassy/embossed inner shadow effect on the numbers.
          */}
          <span
            className="text-xl font-light text-gray-300 tracking-wide font-sans"
            style={{
              textShadow:
                "2px 3px 5px rgba(0, 0, 0, 0.7), -1px -1px 2px rgba(255, 255, 255, 0.1)",
            }}
          >
            Version 2.0
          </span>
        </div>
      </div>
    </>
  );
};

export default VersionBadge;
