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
  width: 380,
  bgcolor: '#0f2327',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};

export default function LoginModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-5 relative p-2 py-5">
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 text-white text-xl cursor-pointer"
            >
              {reactIcons.close}
            </button>
            <div className="mx-auto">
              <img src="/images/logo.png" className="h-20" alt="" />
            </div>
            <LoginForm onClose={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
LoginModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
