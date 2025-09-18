import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};
const Responsible = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-5 relative p-2 py-5">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-black text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </button>

          {/* Modal Content */}
          <h2 id="modal-modal-title" className="text-lg font-bold text-center">
            Responsible Gambling
          </h2>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            The Site is committed to Responsible Gambling and we take our
            responsibilities towards our customers very seriously. We aim to
            provide an environment in which you can bet in a safe, fair and
            above all responsible manner. If you feel you may have a problem
            when it comes to controlling your gambling, please consider using
            one of our tools aimed at helping this:
          </p>
          <ol className="text-sm text-gray-700">
            <li>1. By selecting a deposit limit per day, week or month;</li>
            <li>
              2. By using our “time out” facility to allow you to suspend your
              account activity for the following durations - 24 hours, one week,
              one month or any other period as you may reasonably request up to
              a maximum of 6 weeks; or
            </li>
            <li>
              3. Opting for a self-exclusion, the minimum period being six
              months which means your account will be blocked for a set amount
              of time. Self-exclusions cannot be undone and may only be unlocked
              by contacting customer services when the self-exclusion time runs
              out.
            </li>
          </ol>

          {/* Footer Button */}
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            className="self-end"
          >
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
Responsible.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Responsible;
