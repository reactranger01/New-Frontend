import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { getImage } from '@/utils/imagekit';

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
  const [seconds, setSeconds] = React.useState(6);
  React.useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);
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
            Please Wait...{seconds}
          </h2>
          <img
            src={getImage('/images/timer.gif')}
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
