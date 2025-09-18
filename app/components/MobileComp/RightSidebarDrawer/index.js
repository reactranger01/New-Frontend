import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { linksRight } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Cookies from 'js-cookie';
import { removeAuthCookie } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '@/utils/numberWithCommas';

export default function RightSidebarDrawer({ open, setOpen, toggleDrawer }) {
  const userInfo = useSelector((state) => state.user);
  const handleLogout = () => {
    Cookies.remove('__users__isLoggedIn');
    Cookies.remove('test__users__isLoggedIn');
    Cookies.remove('development__users__isLoggedIn');
    localStorage.removeItem('__users__isLoggedIn');
    localStorage.removeItem('lotus_userID');
    window.location.reload();
    removeAuthCookie();
    setOpen(false);
    toast.success('Logged Out Successfully...');
  };

  const renderDrawerContent = () => {
    return (
      <div className="flex flex-col">
        <div>
          <div className="border-b border-gray-100 py-2 text-16 text-black mx-auto text-center font-bold">
            {userInfo?.username}
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2 font-bold">
              {reactIcons.bank} Balance Information
            </div>
            <div className="flex items-center justify-between text-14 my-2">
              <p>Available Credit</p>
              <p>{numberWithCommas(userInfo?.balance || 0)}</p>
            </div>
            <div className="flex items-center justify-between text-14 my-2">
              <p>Credit limit</p>
              <p>{numberWithCommas(userInfo?.creditAmount || 0)}</p>
            </div>
            <div className="flex items-center justify-between text-14 my-2">
              <p>Winnings</p>
              <p
                className={`${
                  Number(userInfo?.balance) - Number(userInfo?.creditAmount) <
                    0 && 'text-red-500'
                }`}
              >
                {numberWithCommas(
                  Number(userInfo?.balance) - Number(userInfo?.creditAmount),
                ) || 0}
              </p>
            </div>
            <div className="flex items-center justify-between text-14 my-2">
              <p>Net Exposure</p>
              <p>{numberWithCommas(userInfo?.exposureAmount || 0) || 0}</p>
            </div>
          </div>
        </div>
        {linksRight.map((item, index) => (
          <NavLink
            to={item.path}
            onClick={() => setOpen(false)}
            key={index}
            className="text-12 border-y border-[#ddd] py-3 px-3 flex items-center gap-2 "
          >
            <span className="text-xl">{item.icon}</span> {item.title}
          </NavLink>
        ))}
        <div
          onClick={handleLogout}
          className="text-12 border-y border-[#ddd] py-3 px-3 flex items-center gap-2 "
        >
          <span className="text-xl">{reactIcons.logout}</span> Sign Out
        </div>
      </div>
    );
  };

  return (
    <div>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          {renderDrawerContent()}
        </Box>
      </Drawer>
    </div>
  );
}

RightSidebarDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};
