import { isLoggedIn } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import { links } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SidebarMenu } from '..';
import { getImage } from '@/utils/imagekit';

const LeftSidebarDesk = () => {
  const [step, setStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const betData = useSelector((state) => state.bet.selectedBet);

  const isLogin = isLoggedIn();
  const [state, setState] = React.useState(false);

  useEffect(() => {
    if (isLogin && betData.length > 0) {
      setState(true);
    }
    // eslint-disable-next-line
  }, [betData, isLogin]);

  // eslint-disable-next-line
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
  return (
    <div className="w-[165px] shrink-0 bg-white hidden lg:block border border-[#ddd] overflow-hidden">
      {step === 0 ? (
        <div className="flex flex-col">
          {links.map((item, index) => (
            <NavLink
              onClick={() => handleLinkClick(item)}
              to={item.path}
              key={index}
              className={
                'text-[13px] font-bold border-b text-[#811f0f] border-[#ddd] py-[9px] pl-[15px] flex items-center gap-2 hover:scale-110 hover:bg-gray-100'
              }
            >
              <span className="text-xl">
                <img
                  src={getImage(item.icon)}
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
  );
};

export default LeftSidebarDesk;
