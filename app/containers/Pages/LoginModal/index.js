import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { LoginForm } from '@/components';
import { PropTypes } from 'prop-types';
import { reactIcons } from '@/utils/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 424,
  width: '100%',
  bgcolor: '#1E8067',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 0,
  borderRadius: '10px',
  overflowY: 'auto',
};

export default function LoginModal({ isOpen, handleClose }) {
  return (
    <div className="">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#8f8f8f',
        }}
      >
        <Box sx={style}>
          <div className="">
            <button
              onClick={handleClose}
              className="absolute top-2 z-20 right-2  text-black font-bold text-2xl cursor-pointer bg-[#f4d821] rounded"
            >
              {reactIcons.close}
            </button>

            <LoginForm onClose={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
