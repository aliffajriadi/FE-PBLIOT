export const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-xs z-50">
      <video
        src="/loading.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-40"
      ></video>

      <p className="text-primary font-semibold">Loading....</p>
    </div>
  );
};