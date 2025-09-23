import React from 'react';

import { Footer, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';
// import { isLoggedIn } from '@/utils/apiHandlers';
// import HeaderMarque from '@/components/HeaderMarque';

function Landing() {
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
      <Footer />
    </div>
  );
}

export default Landing;
