import React from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icons';
const PreviewImage = ({ previewImage, close, handleProfileImage }) => {
  const handleUploadClick = () => {
    handleProfileImage();
    close(false);
  };
  return (
    <div className="fixed inset-0 z-[1000]  !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-70  text-black ">
      <div className="lg:w-[500px] lg:h-[500px] rounded-xl border border-slate-400 bg-white p-8 relative ">
        <div className="font-ubuntu flex flex-col items-center justify-between h-full w-full mt-2 px-10">
          <div className="">
            <h1 className=" text-center  font-normal text-20">Preview Image</h1>
          </div>

          <div className="rounded-full size-72   flex items-center justify-center shadow-[0_0_36.8px_0_#2D46DE33]">
            <img
              className="h-full w-full rounded-full object-cover"
              src={previewImage}
              alt=""
            />
          </div>

          <div className=" flex items-center justify-center gap-2">
            <button
              className={
                ' rounded-8 border text-black text-14 py-2 px-7 border-[#F0923B]'
              }
              onClick={() => close(null)}
            >
              Cancel
            </button>
            <button
              className={
                ' rounded-8 border text-white text-14 py-2 px-7 bg-[#F0923B]'
              }
              onClick={handleUploadClick}
            >
              Upload
            </button>
          </div>
        </div>

        {/* cross icon */}
        <button
          onClick={() => close(null)}
          className="absolute text-[#1C1B1F] text-2xl top-2 right-2 "
        >
          {reactIcons.close}
        </button>
      </div>
    </div>
  );
};
PreviewImage.propTypes = {
  previewImage: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  handleProfileImage: PropTypes.func.isRequired,
};

export default PreviewImage;
