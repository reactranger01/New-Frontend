import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';

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

export default function BetProcessing({ isOpen }) {
  return (
    <Modal
      open={isOpen}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // black with 50% opacity
        },
      }}
    >
      <Box sx={style}>
        <div className="bg-white hide-scrollbar p-6 flex flex-col items-center gap-4">
          <h2 className="text-16 font-bold text-center">
            Your Bet Is Being Processed <br />
            Please Wait...
          </h2>
          <img
            src="/images/clockIcon.png"
            className="w-12 h-12 lg:h-16 lg:w-16"
            alt=""
          />
        </div>
      </Box>
    </Modal>
  );
}

BetProcessing.propTypes = {
  isOpen: PropTypes.bool,
};
