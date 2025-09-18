import React from 'react';

import { Footer, MobFooter, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
// import { isLoggedIn } from '@/utils/apiHandlers';
// import HeaderMarque from '@/components/HeaderMarque';

function Landing() {
  const isMobile = useMediaQuery('(max-width:768px)');
  // const [showMarquee, setShowMarquee] = useState(true);
  // const login = isLoggedIn();
  return (
    <div className="">
      {/* {login && !isMobile && (
        <HeaderMarque
          showMarquee={showMarquee}
          setShowMarquee={setShowMarquee}
        />
      )} */}
      <Navbar />
      <Outlet />
      {isMobile ? <MobFooter /> : <Footer />}
    </div>
  );
}

export default Landing;
