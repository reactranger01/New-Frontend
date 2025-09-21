import React from 'react';
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] bottom-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
      {/* <PulseLoader color="#0F2327" /> */}
      <img
        src="/images/loader2.png"
        alt="logo"
        className="w-24 h-24 rounded-full animate-spin"
      />
    </div>
  );
};

export default Loading;
