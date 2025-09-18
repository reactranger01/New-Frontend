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
const Kyc = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-5 relative p-2 py-5 h-screen ">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-black text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </button>

          {/* Modal Content */}
          <h2 id="modal-modal-title" className="text-lg font-bold text-center">
            KYC
          </h2>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            We are committed to the highest level of security, hence require all
            our members to provide us with certain documentation in order to
            validate their accounts.
          </p>
          <p className="text-sm text-gray-700">
            Please note that the identification process shall be complete before
            any withdrawal of funds can take place.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold ">
            WHY DO I NEED TO PROVIDE DOCUMENTATION?
          </h2>
          <p className="text-sm text-gray-700">There are several reasons:</p>

          <ul className="text-sm text-gray-700">
            <li>
              We are committed to providing a socially responsible platform for
              online gaming. All of our members must be 18 or older, and we are
              bound by our licensing agreement to verify this.
            </li>
            <li>
              It is in our interests to guarantee maximum security on all
              transactions.
            </li>
            <li>
              Our payment processors and licensing agreement require that our
              policies are in line with international banking standards. A
              proven business relationship with each and every member is
              mandatory for the protection of all parties.
            </li>
            <li>
              By ensuring that your account details are absolutely correct, the
              inconvenience of &#39;missing payments&#39; can be avoided. It can
              take weeks (and sometimes months) to trace, recall, and resend
              using the correct information. This lengthy process also results
              in additional fees from our processors.
            </li>
          </ul>
          <h2 className="text-lg font-bold">
            WHAT DOCUMENTS DO I NEED TO PROVIDE?
          </h2>
          <p className="text-sm text-gray-700">
            <strong>PROOF OF ID:</strong> A color copy of a valid government
            issued form of ID (Driver&#39;s License, Passport, State ID or
            Military ID)
          </p>
          <p className="text-sm text-gray-700">
            <strong>PROOF OF ADDRESS:</strong> A copy of a recent utility bill
            showing your address
          </p>
          <p className="text-sm text-gray-700">
            Note: If your government ID shows your address, you do not need to
            provide further proof of address.
          </p>
          <p className="text-sm text-gray-700">
            Additional documentation might be required as the company sees fit.
          </p>

          <h2 className="text-lg font-bold">
            WHEN DO I NEED TO PROVIDE THESE DOCUMENTS?
          </h2>
          <p className="text-sm text-gray-700">
            Please provide these at your earliest possible convenience to avoid
            any delays in processing your transactions. Documents must be
            received before any withdrawals are executed. Under special
            circumstances we may require the documents before further activity
            (deposits and wagering) can take place on your account.
          </p>
          <p className="text-sm text-gray-700">
            Please understand, if we do not have the required documents on file,
            your pending withdrawals will be cancelled and credited back to your
            account. You will be notified when this happens.
          </p>

          <h2 className="text-lg font-bold">
            HOW CAN I SEND YOU THESE DOCUMENTS?
          </h2>
          <p className="text-sm text-gray-700">
            Please scan your documents, or take a high quality digital camera
            picture, save the images as jpegs, then submit the files here.
          </p>

          <h2 className="text-lg font-bold">
            HOW DO I KNOW MY DOCUMENTS ARE SAFE WITH YOU?
          </h2>
          <p className="text-sm text-gray-700">
            All files are protected with the highest level of encryption at
            every step of the review process. All documentation received is
            treated with the utmost respect and confidentiality.
          </p>
          <p className="text-sm text-gray-700">
            We’d like to thank you for your cooperation in helping us make our
            platform a safer place to play. As always, if you have any questions
            about this policy, or anything else, don’t hesitate to contact us
            using the contact us here.
          </p>

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
Kyc.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Kyc;
