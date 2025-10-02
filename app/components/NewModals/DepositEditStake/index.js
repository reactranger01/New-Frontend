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

export default function DepositEditStake({
  isOpen,
  handleClose,
  stakebutton,
  setStakeButton,
}) {
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
          <div className="bg-white  hide-scrollbar">
            <div className="flex items-center justify-between bg-[#1E8067] p-2">
              <h1 className="  text-18  text-white">Edit Stakes</h1>
              <button
                onClick={handleClose}
                className=" z-20 text-white font-bold text-2xl cursor-pointer "
              >
                {reactIcons.close}
              </button>
            </div>
            <div className="py-[10px] px-2 text1-14">
              <div className="grid grid-cols-4 gap-2">
                {stakebutton?.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border border-black rounded-md outline-none text-14 py-2 px-5"
                    value={item?.value || ''} // ✅ prevents controlled/uncontrolled warning
                    onChange={(e) => {
                      const newStakeButton = [...stakebutton];
                      newStakeButton[index].value = e.target.value;
                      newStakeButton[index].text = e.target.value;
                      setStakeButton(newStakeButton);
                    }}
                  />
                ))}

                <button
                  onClick={handleClose}
                  className="col-span-2 border  border-primary-1300 text-16 h-8 flex-center rounded-[4px] w-full text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem(
                      'localStakeData',
                      JSON.stringify(stakebutton),
                    );
                    handleClose();
                  }}
                  className="col-span-2 bg-primary-1300 text-16 h-8 flex-center rounded-[4px] w-full text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
DepositEditStake.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  stakebutton: PropTypes.array,
  setStakeButton: PropTypes.func,
};
