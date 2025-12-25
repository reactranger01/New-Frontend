import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';
import { desktopModalStyle, mobileModalStyle } from '@/utils/helper';
import { useMediaQuery } from '@mui/material';
import { getImage } from '@/utils/imagekit';
const CountryRestriction = ({ open, setOpen, type }) => {
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
          <div className="flex justify-between gap-2">
            <div className="flex items-center">
              <img
                src={getImage('/images/footer/3.png')}
                className="  invert w-[20px] h-[20px]"
                alt="gameCare"
              />
              <h2 id="modal-modal-title" className="text-lg font-bold">
                RESTRICTED TERRITORIES
              </h2>
              ;
            </div>
            <button
              onClick={handleClose}
              className=" text-black text-xl cursor-pointer"
            >
              <AiOutlineClose />
            </button>
          </div>

          {/* Modal Content */}

          <p id="modal-modal-description" className="text-sm text-gray-700">
            Access to this site is restricted in certain geographical
            territories. Customers residing in the listed territories are
            prohibited from accessing the site and its services.
          </p>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            The restricted territories are:
          </p>
          <p className="text-sm text-gray-700">
            Afghanistan, Algeria, Australia, Bosnia and Herzegovina, Bulgaria,
            Canada, China (People&#39;s Republic of), Cuba, Cyprus, Denmark,
            Ethiopia, France (and French territories), Germany, Gibraltar, Iran
            (Islamic Republic of), Iraq, Ireland, Italy, Korea (Democratic
            People&#39;s Republic of), Lao (People&#39;s Democratic Republic
            of), Macau, Malta, Myanmar, Netherlands, New Zealand, Poland,
            Portugal, Puerto Rico, Qatar, Romania, Russian Federation (Russia),
            Singapore, Slovakia, South Africa, Spain, Sudan, Syrian Arab
            Republic, Taiwan, Turkey, Uganda, Ukraine (Donetsk and Luhansk
            Regions), United Kingdom, United States (and U.S. Territories),
            Yemen.
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
CountryRestriction.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  type: PropTypes.string,
};
export default CountryRestriction;
