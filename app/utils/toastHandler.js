import toast from 'react-hot-toast';

export const showToast = (type, message, id) => {
  switch (type) {
    case 'success':
      toast.success(message, { id });
      break;
    case 'error':
      toast.error(message, { id });
      break;
    case 'warn':
    case 'warning':
      toast(message, { id, icon: '⚠️' });
      break;
    case 'info':
      toast(message, { id, icon: 'ℹ️' });
      break;
    case 'loading':
      toast.loading(message, { id });
      break;
    default:
      toast(message, { id });
      break;
  }
};
