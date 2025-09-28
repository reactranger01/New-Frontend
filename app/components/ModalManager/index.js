import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginModal } from '@/containers/pageListAsync';
import ForgotPasswordModal from '../FogotPasswordModal';
import { closeModal } from '@/redux/Slices/modalSlice';
import RegisterModal from '../RegisterModal';
import RulesModal from '../RulesModal';

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
    case 'register':
      return (
        <RegisterModal
          isOpen={isOpen}
          handleClose={() => dispatch(closeModal())}
        />
      );
    case 'rules':
      return (
        <RulesModal
          isOpen={isOpen}
          handleClose={() => dispatch(closeModal())}
        />
      );
    default:
      return null;
  }
};

export default ModalManager;
