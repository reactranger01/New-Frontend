const IMAGEKIT_BASE_URL = process.env.IMAGEKIT_URL;
// IMAGEKIT_URL=https://ik.imagekit.io/esfzc31bu

/**
 * Get ImageKit image URL
 * @param {string} path - image path inside ImageKit folder
 * @param {object} options - transformation options
 */
export const getImage = (path, options = {}) => {
  if (!path) return '';

  const transformations = [];

  if (options.w) transformations.push(`w-${options.w}`);
  if (options.h) transformations.push(`h-${options.h}`);
  if (options.q) transformations.push(`q-${options.q}`);

  // default optimization
  transformations.push('f-auto');

  const tr = transformations.length ? `?tr=${transformations.join(',')}` : '';

  return `${IMAGEKIT_BASE_URL}${path}${tr}`;
};

// export const getVideo = (path, options = {}) => {
//   if (!path) return '';

//   const transformations = [];

//   // resize video
//   if (options.w) transformations.push(`w-${options.w}`);
//   if (options.h) transformations.push(`h-${options.h}`);

//   // quality → controls bitrate for video
//   if (options.q) transformations.push(`q-${options.q}`);

//   // video codec (recommended)
//   if (options.codec) transformations.push(`vc-${options.codec}`);
//   // examples: h264, vp9, av1

//   // bitrate control (kbps)
//   if (options.br) transformations.push(`br-${options.br}`);

//   // generate poster frame (in seconds)
//   if (options.poster !== undefined) {
//     transformations.push(`so-${options.poster}`);
//   }

//   const tr = transformations.length ? `?tr=${transformations.join(',')}` : '';

//   return `${IMAGEKIT_BASE_URL}${path}${tr}`;
// };

export const getVideo = (path) => {
  if (!path) return '';
  return `${IMAGEKIT_BASE_URL}${path}`;
};
