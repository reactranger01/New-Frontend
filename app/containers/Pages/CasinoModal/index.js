import React from 'react';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getImage } from '@/utils/imagekit';

const CasinoModal = ({
  setCasinoPoints,
  casinoPoints,
  gameId,
  handleCasinoGame,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 300,
    bgcolor: '#f6f9fa',
    outline: 'none',
    p: 2,
    borderRadius: '10px',
  };
  const userInfo = useSelector((state) => state.user.casinoLock);

  const handleClose = () => {
    if (userInfo === true) {
      toast.error('Action restricted. Casino betting is currently locked.');
      setCasinoPoints(false);
      return;
    }
    handleCasinoGame(gameId);
    setCasinoPoints(false);
  };
  return (
    <div className="">
      <Modal
        open={casinoPoints}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" p-2 py-5">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-18">Please Note</h1>
            </div>
            <div className="flex justify-center items-center my-4">
              <img
                src={getImage('/images/casino/coin.png')}
                className="w-[100px] h-[107px]"
                alt=""
              />
            </div>
            <div className="flex justify-center items-center my-4 font-semibold">
              <h1 className="text-xs">100 Points = 1 Casino Point</h1>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={handleClose}
                className="cursor-pointer px-2 py-1 bg-[#5E9D71] rounded-md text-white text-12 font-semibold"
              >
                Okay
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
CasinoModal.propTypes = {
  casinoPoints: PropTypes.bool,
  setCasinoPoints: PropTypes.func,
  handleCasinoGame: PropTypes.func,
  gameId: PropTypes.any,
};

export default CasinoModal;
