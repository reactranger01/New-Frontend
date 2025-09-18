import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import moment from 'moment';
import { reactIcons } from '@/utils/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '@/utils/constants';
import { LoginModal } from '@/containers/pageListAsync';
import { getAuthData, isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '@/redux/actions';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { SidebarDrawer } from '@/components';
import { useMediaQuery } from '@mui/material';
import RightSidebarDrawer from '@/components/MobileComp/RightSidebarDrawer';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [openModal, setOpenModal] = useState(false);
  const login = isLoggedIn();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const isLogin = isLoggedIn();
  const [open, setOpen] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTab = useMediaQuery('(max-width:1024px)');
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const userInfo = useSelector((state) => state.user);
  const handleLogout = () => {
    Cookies.remove('__users__isLoggedIn');
    Cookies.remove('test__users__isLoggedIn');
    Cookies.remove('development__users__isLoggedIn');
    localStorage.removeItem('__users__isLoggedIn');
    localStorage.removeItem('lotus_userID');
    window.location.reload();
    removeAuthCookie();
    navigate('/');
    toast.success('Logged Out Successfully...');
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const toggleRightDrawer = (newOpen) => () => {
    setOpenRight(newOpen);
  };
  const getSearchResults = async () => {
    const response = await getAuthData(
      `${process.env.API_URL}/catalogue/cricket/search-by-events?search=${searchQuery}`,
    );
    if (response?.status === 200) {
      setFilteredResults(response?.data?.data);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleCloseSearch = () => {
    setSearchOn(false);
    setSearchQuery('');
  };

  const handleEventClick = (event) => {
    navigate(
      `/dashboard/${
        event?.sportId == '1'
          ? 'football'
          : event?.sportId == '2'
          ? 'tennis'
          : 'cricket'
      }/market/${event?.matchId}`,
      {
        state: { data: event },
      },
    );
    setFilteredResults([]);
    setSearchQuery('');
    setSearchOn(false);
  };

  const handleSearchIconClick = () => {
    setSearchOn(true);
  };
  useEffect(() => {
    if (searchQuery.length >= 3) {
      getSearchResults();
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    dispatch(init());
    const intervalId = setInterval(() => {
      dispatch(init());
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, login]);

  return (
    <>
      {!searchOn ? (
        <>
          <nav className="bg-[#1E8067]">
            <div className="container  pt-[20px] pb-[30px] flex items-center justify-between gap-10">
              <div className="flex items-center gap-2">
                {location.pathname == '/' ? (
                  <div
                    onClick={toggleDrawer(true)}
                    className="md:hidden flex-center text-xl text-white"
                  >
                    {reactIcons.hamburger}
                  </div>
                ) : (
                  <div
                    onClick={() => navigate(-1)}
                    className="md:hidden flex-center text-xl text-white"
                  >
                    {reactIcons.bigLeft}
                  </div>
                )}

                <div className="flex-center gap-3 w-fit">
                  <img
                    onClick={() => navigate('/')}
                    src="/images/lotusLogo.jpg"
                    alt="LOGO"
                    className="  h-9 cursor-pointer"
                  />
                  <p className="md:flex-center hidden text-white text-12 ">
                    {moment().format('MMM D, YYYY')}
                    <span className=" text-white md:text-16 text-12 font-bold ml-1">
                      {time}
                    </span>
                  </p>
                </div>
              </div>

              {/* {isLogin && !isMobile && (
                <div className="flex flex-col text-12 gap-1">
                  <div className="relative w-[250px] ">
                    <span className="absolute ay-center left-2 text-16">
                      {reactIcons.search}
                    </span>
                    <input
                      type="text"
                      placeholder="Search Events"
                      className="pl-7 outline-none rounded-sm py-1 w-full"
                      value={searchQuery}
                      onChange={handleSearch}
                    />

                    {filteredResults.length == 0 && searchQuery.length >= 3 ? (
                      <ul className="absolute bg-white shadow-lg rounded  w-full z-10 top-[60px]">
                        <li className="p-2 hover:bg-gray-200 cursor-pointer">
                          Match Not Found
                        </li>
                      </ul>
                    ) : (
                      <>
                        {searchQuery.length >= 3 && (
                          <ul className="absolute bg-white shadow-lg rounded  w-full z-10 top-[60px]">
                            {filteredResults.map((result, index) => (
                              <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleEventClick(result)}
                              >
                                {result?.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )} */}

              {isLogin ? (
                isTab ? (
                  <div className="flex items-center gap-2">
                    {isMobile && (
                      <div
                        onClick={handleSearchIconClick}
                        className="text-xl text-white"
                      >
                        {reactIcons.search}
                      </div>
                    )}{' '}
                    {!(location.pathname === '/dashboard' && isMobile) && (
                      <button
                        onClick={toggleRightDrawer(true)}
                        className="text-white bg-[#2c4f58] px-2 py-1 text-12 rounded-md flex-center gap-2"
                      >
                        {reactIcons.user}{' '}
                        {numberWithCommas(
                          userInfo?.balance -
                            Math.abs(userInfo?.exposureAmount) || 0,
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="text-white text-12 hidden md:block font-lato flex-1">
                      <p className="leading-none mb-1">
                        Logged in as {User?.username}
                      </p>
                      <p className="leading-none">
                        Last logged in: 18/09/2025 23:13 PM
                      </p>
                    </div>
                    {/* <div className="text-12 md:text-12 leading-4 font-semibold md:font-bold hidden  md:flex flex-col bg-white rounded-full px-4 py-1 h-[42px]">
                      <span className="text-black">
                        Bal:
                        {numberWithCommas(
                          userInfo?.balance -
                            Math.abs(userInfo?.exposureAmount) || 0,
                        )}
                      </span>
                      <span className="text-primary-darkgreen ">
                        Exp:
                        {numberWithCommas(userInfo?.exposureAmount || 0)}
                      </span>
                    </div> */}
                    <div className="flex items-center ">
                      <button className="text-[14px] mr-2 bg-[#026B4F] border-r-2 border-b-2 text-white hover:text-[#f4d821] hover:bg-[#1E8067] px-2 py-1 rounded-[3px] border-black/25">
                        Deposit
                      </button>
                      <button className="text-[14px] bg-[#026B4F] border-r-2 border-b-2 text-white hover:text-[#f4d821] hover:bg-[#1E8067] px-2 py-1 rounded-[3px] border-black/25">
                        Withdrawal
                      </button>
                      <DropDown />
                      <button
                        className="text-[#fcedca]  text-14 font-medium flex-center gap-2"
                        onClick={() => handleLogout()}
                      >
                        <span className="text-xl">{reactIcons.logout}</span>{' '}
                        Logout
                      </button>
                    </div>
                  </>
                )
              ) : (
                <div>
                  {isMobile ? (
                    <div className="flex items-center gap-2">
                      <div
                        onClick={handleSearchIconClick}
                        className="text-xl text-white"
                      >
                        {reactIcons.search}
                      </div>
                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-white bg-[#2c4f58] px-2 py-1 text-12 rounded-md flex-center gap-2"
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-[#fcedca] text-14 font-medium flex-center gap-2 hover:underline"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-[#fcedca] text-14 font-medium flex-center gap-2 hover:underline"
                      >
                        Signup
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
          <div className=" bg-white md:border-b border-gray-200 w-full overflow-x-auto ">
            <div className="hidden md:flex-center text-[#440a57] gap-3 min-w-[1330px]">
              <p className="font-bold text-14 py-2 shrink-0 lg:hidden">
                <button
                  onClick={toggleDrawer(true)}
                  className="flex-center gap-1 leading-3"
                >
                  <span>{reactIcons.dot}</span> Menu
                </button>
              </p>
              {navLinks.map((item, index) => (
                <NavLink
                  to={item.path}
                  className="sport-menu__link py-2 shrink-0"
                  key={index}
                >
                  <p className="flex-center gap-1 leading-3">
                    <span>{reactIcons.dot}</span> {item.title}
                  </p>
                </NavLink>
              ))}
            </div>
          </div>
          {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
          <SidebarDrawer
            setOpen={setOpen}
            toggleDrawer={toggleDrawer}
            open={open}
          />
          <RightSidebarDrawer
            setOpen={setOpenRight}
            toggleDrawer={toggleRightDrawer}
            open={openRight}
          />
        </>
      ) : (
        <div className="relative w-full h-[56px]  flex items-center">
          <input
            type="text"
            placeholder="Search Events"
            value={searchQuery}
            onChange={handleSearch}
            className="text-white text-14 bg-transparent w-full px-3 pr-10 h-full outline-none"
          />
          {filteredResults.length == 0 && searchQuery.length >= 3 ? (
            <ul className="absolute bg-white shadow-lg rounded  w-full z-10 top-[60px]">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                Match Not Found
              </li>
            </ul>
          ) : (
            <>
              {searchQuery.length >= 3 && (
                <ul className="absolute bg-white shadow-lg rounded  w-full z-10 top-[60px]">
                  {filteredResults.map((result, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleEventClick(result)}
                    >
                      {result?.name}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          <div
            onClick={handleCloseSearch}
            className="absolute ay-center right-3 text-white text-xl"
          >
            {reactIcons.close}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
