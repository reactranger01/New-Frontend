import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { linksRight } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Cookies from 'js-cookie';
import { isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
export default function RightSidebarDrawer({ open, setOpen, toggleDrawer }) {
  const login = isLoggedIn();
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
          <div className="flex items-center justify-between bg-[linear-gradient(180deg,#1e8067,#1e8067_48.4%,#2f3332)] border-b border-gray-100 py-2 text-14 text-black mx-auto text-start font-bold">
            <div className="flex items-center gap-2 text-white pl-2">
              {userInfo?.username} {reactIcons.copy}
            </div>
            <button
              onClick={toggleDrawer}
              className="absolute top-2 z-20 right-2  text-black font-bold text-xl cursor-pointer bg-[#f4d821] rounded"
            >
              {reactIcons.close}
            </button>
          </div>
          {login && (
            <div className="  grid grid-cols-2 gap-2 p-2 rounded-md bg-white">
              <button className="flex items-center justify-center py-2 gap-2 text-[13px] font-lato font-bold rounded-sm bg-[#1e8067] text-white">
                <img
                  src="/images/deposit.png"
                  className="w-[18px] h-[18px]"
                  alt=""
                />{' '}
                Deposit
              </button>
              <button className="flex items-center justify-center py-2 gap-2 text-[13px] font-lato font-bold rounded-sm  text-white  bg-[#dc2626]">
                <img
                  src="/images/withdraw.png"
                  className="w-[18px] h-[18px]"
                  alt=""
                />{' '}
                Withdraw
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p>One Click Bet</p>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    // checked={isChecked === true}
                    // onChange={() => handleToggle(item.id, isChecked, idx)}
                    color="primary"
                    // disabled={loading}
                  />
                }
              />
            </div>
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
