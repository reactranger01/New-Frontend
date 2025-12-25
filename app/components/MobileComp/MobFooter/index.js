import CountryRestriction from '@/components/FooterModals/CountryRestriction';
import Underage from '@/components/FooterModals/Underage';
import { getImage } from '@/utils/imagekit';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MobFooter = () => {
  const [openUnderage, setOpenUnderage] = useState(false);
  const [openCountryRestriction, setOpenCountryRestriction] = useState(false);
  const location = useLocation();
  if (location.pathname === '/dashboard') {
    return null;
  }
  return (
    <div className="bg-[#0f2327] flex items-center justify-between px-2 py-2">
      <div
        onClick={() => window.open('https://www.gamcare.org.uk/', '_blank')}
        className="h-7 w-7"
      >
        <img
          src={getImage('/images/footer/1.png')}
          className="bg-white h-full w-full "
          alt="gameCare"
        />
      </div>
      <div onClick={() => setOpenCountryRestriction(true)} className="h-7 w-7">
        <img
          src={getImage('/images/footer/3.png')}
          className="bg-white h-full w-full "
          alt="gameCare"
        />
      </div>
      <div
        onClick={() => setOpenUnderage(true)}
        className="flex cursor-pointer items-center gap-2"
      >
        <div className="h-7 w-7 ">
          <img
            src={getImage('/images/footer/2.png')}
            className="bg-white h-full w-full "
            alt="gameCare"
          />
        </div>
        <p className="capitalize text-10 text-white">
          Underage Gambling is an offence
        </p>
      </div>
      {openUnderage && (
        <Underage
          open={openUnderage}
          setOpen={setOpenUnderage}
          type={'mobile'}
        />
      )}
      {openCountryRestriction && (
        <CountryRestriction
          open={openCountryRestriction}
          setOpen={setOpenCountryRestriction}
          type={'mobile'}
        />
      )}
    </div>
  );
};

export default MobFooter;
