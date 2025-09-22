import React, { useEffect, useState } from 'react';
/*eslint-disable */
import { MobFooter, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useSelector } from 'react-redux';
// import { isLoggedIn } from '@/utils/apiHandlers';

function MobLayout() {
  const isLogin = isLoggedIn();
  const [state, setState] = React.useState(false);
  const betData = useSelector((state) => state.bet.selectedBet);
  const login = isLoggedIn();
  const [showMarquee, setShowMarquee] = useState(true);
  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(!state);
  };
  useEffect(() => {
    if (isLogin && betData.length > 0) {
      setState(true);
    }
    // eslint-disable-next-line
  }, [betData, isLogin]);
  return (
    <>
      <div className="relative light-bg">
        <div className="fixed w-full top-0 z-50">
          {/* {login && showMarquee && (
            <HeaderMarque
              showMarquee={showMarquee}
              setShowMarquee={setShowMarquee}
            />
          )} */}
          <Navbar />
        </div>
        <div
          className={`${
            login && showMarquee
              ? 'mt-[80px]'
              : login && !showMarquee
              ? 'mt-[56px]'
              : !login && !showMarquee
              ? 'mt-[56px]'
              : 'mt-[56px]'
          } mb-[56px]`}
        >
          <Outlet />
        </div>

        <div className="fixed w-full bottom-0 z-50">
          <MobFooter />
        </div>
      </div>
    </>
  );
}

export default MobLayout;
