/* eslint-disable */
import { BetSlip, Footer, Navbar } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebarDesk from '@/components/LeftSidebarDesk';

const LayoutThree = () => {
  return (
    <div className="light-bg">
      <Navbar />
      <section className=" mx-auto xl:container  px-2 sm:px-4   xl:px-0">
        <div className="2xl:container  w-full mx-auto">
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LayoutThree;
