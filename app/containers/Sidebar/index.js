/* eslint-disable */
import { BetSlip, Footer, MobFooter, Navbar, SidebarMenu } from '@/components';
import { links } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const Sidebar = () => {
  const betData = useSelector((state) => state.bet.selectedBet);
  const [step, setStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const isLogin = isLoggedIn();
  const [state, setState] = React.useState(false);
  const isMobileDevice = useMediaQuery('(max-width:768px)');

  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(!state);
  };
  const handleLinkClick = (item) => {
    setStep(1);
    setSelectedGame(item);
  };
  useEffect(() => {
    if (isLogin && betData.length > 0) {
      setState(true);
    }
    // eslint-disable-next-line
  }, [betData, isLogin]);
  return (
    <div className="light-bg">
      <Navbar />
      <section className=" mx-auto xl:container  px-4 md:px-6  xl:px-0">
        <div className="2xl:container  flex gap-5 mx-auto">
          <div className="w-[165px] shrink-0 bg-white hidden lg:block border border-[#ddd] overflow-hidden">
            {step === 0 ? (
              <div className="flex flex-col">
                {links.map((item, index) => (
                  <NavLink
                    onClick={() => handleLinkClick(item)}
                    // to={item.path}
                    key={index}
                    className={
                      'text-[13px] font-bold border-b text-[#811f0f] border-[#ddd] py-[9px] pl-[15px] flex items-center gap-2 hover:scale-110 hover:bg-gray-100'
                    }
                  >
                    <span className="text-xl">
                      {' '}
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-4 h-4"
                      />
                    </span>{' '}
                    {item.title}
                  </NavLink>
                ))}
              </div>
            ) : (
              <SidebarMenu game={selectedGame} back={setStep} />
            )}
          </div>
          <div className="flex-1 min-w-0 w-full ">
            <Outlet />
          </div>
          <div className="!w-[290px] mt-[15px] hidden lg:block flex-shrink-0">
            <BetSlip />
          </div>
        </div>
      </section>
      {isMobileDevice ? <MobFooter /> : <Footer />}
    </div>
  );
};

export default Sidebar;
