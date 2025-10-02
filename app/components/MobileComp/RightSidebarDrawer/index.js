import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { linksRight } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import { Link, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Cookies from 'js-cookie';
import { isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { openModal } from '@/redux/Slices/modalSlice';
export default function RightSidebarDrawer({ open, setOpen, toggleDrawer }) {
  const login = isLoggedIn();
  const dispatch = useDispatch();
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
            <div className=" px-2 grid grid-cols-2 gap-2 p-1 rounded-md bg-white">
              <Link
                to="/account/deposit"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center py-2 gap-2 text-[13px] font-lato font-bold rounded-lg bg-[#1e8067] text-white"
              >
                <img
                  src="/images/deposit.png"
                  className="w-[18px] h-[18px]"
                  alt=""
                />{' '}
                Deposit
              </Link>
              <Link
                to="/account/withdrawal"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center py-2 gap-2 text-[13px] font-lato font-bold rounded-lg  text-white  bg-[#dc2626]"
              >
                <img
                  src="/images/withdraw.png"
                  className="w-[18px] h-[18px]"
                  alt=""
                />{' '}
                Withdraw
              </Link>
            </div>
          )}
          <div className="bg-[#daf1eb] flex items-center justify-between px-3 ">
            <p className="text-14 font-semibold">One Click Bet</p>
            <div className="w-fit">
              <FormControlLabel
                sx={{
                  marginX: 0,
                }}
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
          <div className=" px-[11px] ">
            <div className="flex items-center justify-between">
              <div className="py-[5px] flex items-center  text-[13px] font-bold">
                <p className="w-[85px]">Display Name</p>
                <p>: {userInfo?.username}</p>
              </div>
              <div className="text-[#1e8067] font-bold">{reactIcons.edit}</div>
            </div>
            <div className="flex items-center text-[13px] font-bold">
              <p className="w-[85px]">Balance</p>
              <p>: {numberWithCommas(userInfo?.balance || 0)}</p>
            </div>
            {/* <div className="flex items-center text-[13px] font-bold">
              <p className="w-[85px]">Credit limit</p>
              <p>: {numberWithCommas(userInfo?.creditAmount || 0)}</p>
            </div> */}
            <div className="flex items-center text-[13px] font-bold">
              <p className="w-[85px]">Net Exposure</p>
              <p className="text-red-500">
                : {numberWithCommas(userInfo?.exposureAmount || 0) || 0}
              </p>
            </div>

            <div>
              {/* <button className="text-14 my-2 py-2 flex-center border border-[#1e8067] bg-[#1e8067] text-white rounded-[30px] w-full">
                LOCKED BONUS 120.00
              </button> */}
              <button className="text-14 my-2 py-2 flex-center rounded-[30px] text-white w-full bg-[linear-gradient(180deg,#1e8067,#1e8067_48.4%,#2f3332)]">
                REFER & EARN
              </button>
            </div>
          </div>
        </div>
        {linksRight.map((item, index) => {
          return item?.type && item?.type === 'rules' ? (
            <div
              onClick={() => dispatch(openModal('rules'))}
              key={index}
              className="text-12 border-y border-[#ddd] py-3 px-3 flex items-center font-bold gap-2 "
            >
              <img
                src={item.icon}
                className="rightS-svg w-[18px] h-[18px]"
                alt=""
              />{' '}
              {item.title}
            </div>
          ) : (
            <NavLink
              to={item.path}
              onClick={() => setOpen(false)}
              key={index}
              className="text-12 border-y border-[#ddd] py-3 px-3 flex items-center font-bold gap-2 "
            >
              <img
                src={item.icon}
                className="rightS-svg w-[18px] h-[18px]"
                alt=""
              />{' '}
              {item.title}
            </NavLink>
          );
        })}
        <div
          onClick={handleLogout}
          className="text-12  bg-[#DC2626] py-3 px-3 flex items-center font-semibold text-white gap-2 "
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
