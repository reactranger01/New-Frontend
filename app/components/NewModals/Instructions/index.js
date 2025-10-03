import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { reactIcons } from '@/utils/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 640,
  width: '100%',
  bgcolor: '#0f2327',
  outline: 'none',
  p: 0,
  borderRadius: '10px',
};

export default function Instructions({ isOpen, handleClose, text, videoFile }) {
  return (
    <div className="">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // black with 50% opacity
          },
        }}
      >
        <Box sx={style}>
          <div className="bg-white  hide-scrollbar">
            <div className="flex items-center justify-between bg-[#1E8067] p-2">
              <h1 className="  text-18  text-white">{text}</h1>
              <button
                onClick={handleClose}
                className=" z-20 text-white font-bold text-2xl cursor-pointer "
              >
                {reactIcons.close}
              </button>
            </div>
            <div className="py-[10px] px-2 text1-14">
              <video controls>
                <source src={videoFile} type="video/mp4" />
              </video>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
Instructions.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string,
  videoFile: PropTypes.string,
};
