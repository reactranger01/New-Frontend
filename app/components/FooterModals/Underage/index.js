import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';
import { desktopModalStyle, mobileModalStyle } from '@/utils/helper';
import { useMediaQuery } from '@mui/material';
import { getImage } from '@/utils/imagekit';
const Underage = ({ open, setOpen, type }) => {
  const handleClose = () => setOpen(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={type == 'desktop' ? desktopModalStyle : mobileModalStyle}>
        <div className="flex flex-col gap-5 text-10 p-2 py-5">
          {/* Close Button */}
          {isMobile && (
            <div className="flex items-center">
              <img
                src={getImage('/images/footer/2.png')}
                className="  invert w-[20px] h-[20px]"
                alt="gameCare"
              />
              <h2 id="modal-modal-title" className="text-lg font-bold">
                UNDER GAMBLING IS AN OFFENCE
              </h2>
            </div>
          )}
          <div className="flex justify-between">
            <h2 id="modal-modal-title" className="text-lg font-bold">
              Protection of minors
            </h2>{' '}
            <button
              onClick={handleClose}
              className=" text-black text-xl cursor-pointer"
            >
              <AiOutlineClose />
            </button>
          </div>

          {/* Modal Content */}

          <p id="modal-modal-description" className="text-sm text-gray-700">
            It is illegal for anybody under the age of 18 to gamble.
          </p>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            Our site has strict policies and verification measures to prevent
            access to minors.
          </p>
          <p className="text-sm text-gray-700">
            We encourage parents to consider the use of internet protection
            tools. You may find the following links useful:
          </p>

          {!isMobile ? (
            <>
              <ul className="text-sm text-gray-700">
                <li>Cyberpatrol</li>
                <li>Cybersitter</li>
              </ul>
            </>
          ) : (
            <div>
              <button className="bg-white border border-black w-full py-2">
                Cyberpatrol
              </button>
              <button className="bg-white mt-2 border border-black w-full py-2">
                Cybersitter
              </button>
            </div>
          )}

          {/* Footer Button */}
          {!isMobile && (
            <Button
              variant="contained"
              color="success"
              onClick={handleClose}
              className="self-end"
            >
              Ok
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};
Underage.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  type: PropTypes.string,
};
export default Underage;
