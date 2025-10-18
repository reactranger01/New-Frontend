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
  //   maxWidth: 640,
  width: '100%',
  Height: '100%',
  bgColor: '#ffffff',
  //   bgcolor: '#1E8067',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 0,
  borderRadius: '10px',
  //   overflowY: 'auto',
  //   height: '99vh',
};

export default function AuraLobbyModal({ isOpen, handleClose }) {
  const userToken = localStorage.getItem('__users__isLoggedIn');

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
          <div className="bg-white h-[98vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center gap-5 bg-[#1E8067] p-2">
              <button
                onClick={handleClose}
                className=" z-20 text-white font-bold text-xl cursor-pointer "
              >
                {reactIcons.bigLeft}
              </button>
              <h1 className="  text-18  text-white">Lobby Aura</h1>
            </div>
            <div className="h-full w-full">
              <iframe
                src={`https://aura.fawk.app/${userToken}/9804`}
                allow="autoplay; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="Lobby Aura"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
AuraLobbyModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
