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
const Exclusion = ({ open, setOpen }) => {
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
          <h2 id="modal-modal-title" className="text-lg font-bold">
            WHAT IS A SELF-EXCLUSION?
          </h2>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            Self-exclusion is a facility that the Site offers to help those
            customers who feel that their gambling is out of control and want us
            to help them stop. By entering into a self-exclusion agreement with
            the Site, you will be prevented from using your Account (as defined
            in the terms and conditions) for a specific period, as determined by
            you, of between 6 months and 5 years.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            HOW TO SELF-EXCLUDE FROM THE SITE
          </h2>
          <p className="text-sm text-gray-700">
            If at any time you should you wish to exclude yourself from use of
            the Site (as defined in the terms and conditions), you must submit
            this request by email to{' '}
            <a href="/">customer.service@verifyexch.com.</a>
          </p>
          <p className="text-sm text-gray-700">
            Please inform us of the period for which you wish to self-exclude.
            The minimum is 6 months and the maximum is 5 years. If you request
            self-exclusion but do not specify a period, we will exclude you for
            the minimum period of six months (“Minimum Period”).
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            HOW SOON AFTER REQUESTING A SELF-EXCLUSION WILL IT BE ACTIVATED?
          </h2>
          <p className="text-sm text-gray-700">
            We will endeavour to apply your exclusion as soon as practically
            possible. Normally, we will be able to reset your password to
            prevent you accessing the Site within 24 hours of your request.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            WHAT HAPPENS IF I SELF-EXCLUDE?{' '}
          </h2>
          <p className="text-sm text-gray-700">
            We will make all reasonable efforts to:
          </p>
          <ol className="text-sm text-gray-700">
            <li>1. Prevent any marketing material being forwarded to you;</li>
            <li>2. Remove you from any marketing databases operated by us;</li>
            <li>
              3. Suspend your activity by cancelling your ability to access the
              Site for the period requested by you, or if no period is requested
              by you, for the Minimum Period; and
            </li>

            <li>
              4. Permanently close your Customer Account if instructed to do so
              by you, and return all funds owed to you to your nominated bank
              account.
            </li>
          </ol>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            CAN I RE-ACTIVATE MY ACCOUNT OR OPEN A NEW ACCOUNT DURING THE
            SELF-EXCLUSION PERIOD?
          </h2>
          <p className="text-sm text-gray-700">
            Accounts that have been self-excluded cannot be reactivated under
            any circumstances until the expiry of the self-exclusion period.
          </p>
          <p className="text-sm text-gray-700">
            During the period of your exclusion, you must not attempt to re-open
            any existing Account(s), seek to open any new Accounts or seek to
            place bets through any other customer’s Account.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            IF I WOULD LIKE TO RE-ACTIVATE MY ACCOUNT, IS THIS POSSIBLE?
          </h2>
          <p className="text-sm text-gray-700">
            At the end of the self-exclusion period, you must contact us in
            person and confirm such intention in writing. If it is decided (in
            the Site’s absolute discretion) to permit you to re-open your
            Account/open a new Account, you should be aware that a 24-hour
            waiting period will be imposed prior to the Account being available
            for use.
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
Exclusion.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Exclusion;
