import { PreviewImage } from '@/components';
import { postReq } from '@/utils/apiHandlers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ImageUpload = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFileFile] = useState(null);
  /* eslint-disable-next-line */
  const [imageUrl, setImageUrl] = useState(null);
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 6291456) {
      toast.error('file size should be less than 2MB');
      return;
    }
    setSelectedFileFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleProfileImage = async () => {
    try {
      let fileImg = new FormData();
      fileImg.append('file', selectedFile);
      const response = await postReq('/upload', fileImg);
      const { status, data, error } = response;
      if (status) {
        setImageUrl(data.url);
      } else if (error) {
        Array.isArray(error.message)
          ? error?.message.map((msg) => toast.error(msg))
          : toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div>
      {previewImage && (
        <PreviewImage
          previewImage={previewImage}
          close={setPreviewImage}
          handleProfileImage={handleProfileImage}
        />
      )}
      <div className="relative m-5">
        <label
          className="h-full w-full cursor-pointer border border-gray-500 rounded-2xl p-2 px-5"
          htmlFor="profilePicUpload"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="profilePicUpload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePreviewImage}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
