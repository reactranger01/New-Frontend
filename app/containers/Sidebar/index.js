/* eslint-disable */
import { BetSlip, SidebarMenu } from '@/components';
import { links } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const Sidebar = () => {
  const betData = useSelector((state) => state.bet.selectedBet);
  const [step, setStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const isLogin = isLoggedIn();
  const [state, setState] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:1024px)');

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
    <>
      <section className="light-bg mx-auto">
        <div className="2xl:container  flex gap-4 mx-auto">
          <div className="w-[180px] shrink-0 bg-white hidden lg:block border border-[#ddd] overflow-hidden">
            {step === 0 ? (
              <div className="flex flex-col">
                <NavLink
                  className={
                    'text-12 border-b border-[#ddd] py-3 pl-5 flex items-center gap-2 hover:scale-110  hover:bg-gray-100'
                  }
                  to="/dashboard"
                >
                  <span className="text-xl">{reactIcons.casino}</span> Live
                  Casino
                </NavLink>
                {links.map((item, index) => (
                  <NavLink
                    onClick={() => handleLinkClick(item)}
                    // to={item.path}
                    key={index}
                    className={
                      'text-12 border-b border-[#ddd] py-3 pl-5 flex items-center gap-2 hover:scale-110 hover:bg-gray-100'
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
          <div className="flex-1 h-[100vh] w-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </section>

      {/* {isLogin && betData.length > 0 && isMobile && (
        <Drawer anchor={'bottom'} open={state} onClose={toggleDrawer()}>
          <Box role="presentation" onKeyDown={toggleDrawer('bottom', false)}>
            <BetSlip />
          </Box>
        </Drawer>
      )} */}
    </>
  );
};

export default Sidebar;
