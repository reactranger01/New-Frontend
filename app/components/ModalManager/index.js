import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginModal } from '@/containers/pageListAsync';
import ForgotPasswordModal from '../FogotPasswordModal';
import { closeModal } from '@/redux/Slices/modalSlice';

const ModalManager = () => {
  const { type, isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  switch (type) {
    case 'login':
      return (
        <LoginModal
          isOpen={isOpen}
          handleClose={() => dispatch(closeModal())}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPasswordModal
          isOpen={isOpen}
          handleClose={() => dispatch(closeModal())}
        />
      );

    default:
      return null;
  }
};

export default ModalManager;
