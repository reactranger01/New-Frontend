import Exclusion from '@/components/FooterModals/Exclusion';
import Kyc from '@/components/FooterModals/Kyc';
import Responsible from '@/components/FooterModals/Responsible';
import RulsRegulation from '@/components/FooterModals/RulsRegulation';
import Underage from '@/components/FooterModals/Underage';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [openRuls, setOpenRuls] = useState(false);
  const [openKyc, setOpenKyc] = useState(false);
  const [openExclusion, setExclusion] = useState(false);
  const [openResponsible, setResponsible] = useState(false);
  const [openUnderage, setOpenUnderage] = useState(false);
  const Footerlist = [
    {
      title: 'Underage Gambling is an offence',
      img: '/images/footer/2.png',
    },
    // {
    //   title: 'Restricted territories',
    //   img: '/images/footer/3.png',
    // },
    {
      title: 'KYC',
    },
    {
      title: 'Rules & Regulations',
    },
    {
      title: 'Responsible Gambling',
    },
    {
      title: 'Exclusion Policy',
    },
    {
      title: '© 2016-2024',
    },
  ];
  const handleClickModal = (title) => {
    switch (title) {
      case 'Underage Gambling is an offence':
        setOpenUnderage(true);
        break;
      case 'Restricted territories':
        // Add state logic here if needed
        break;
      case 'KYC':
        setOpenKyc(true);
        break;
      case 'Rules & Regulations':
        setOpenRuls(true);
        break;
      case 'Responsible Gambling':
        setResponsible(true);
        break;
      case 'Exclusion Policy':
        setExclusion(true);
        break;
      default:
        console.warn('No matching modal found for title:', title);
    }
  };
  return (
    <>
      <footer className="w-full py-3  overflow-auto bg-[#0F2327] text-white flex items-center justify-center">
        <div className="flex flex-wrap gap-x-8 gap-y-2 items-center justify-center container">
          <Link to="/" className="h-9 w-9  ">
            <img
              src="/images/footer/1.png"
              className="bg-white h-full w-full "
              alt="gameCare"
            />
          </Link>
          {Footerlist.map((item, index) => {
            return (
              <div key={index} className="text-12 flex-center gap-3">
                {item?.img && (
                  <img src={item.img} alt="" className="h-8 w-8 object-cover" />
                )}
                <div onClick={() => handleClickModal(item.title)}>
                  {item.title}{' '}
                </div>
              </div>
            );
          })}
        </div>
        {openRuls && <RulsRegulation open={openRuls} setOpen={setOpenRuls} />}
        {openKyc && <Kyc open={openKyc} setOpen={setOpenKyc} />}
        {openExclusion && (
          <Exclusion open={openExclusion} setOpen={setExclusion} />
        )}
        {openResponsible && (
          <Responsible open={openResponsible} setOpen={setResponsible} />
        )}
        {openUnderage && (
          <Underage
            open={openUnderage}
            setOpen={setOpenUnderage}
            type={'desktop'}
          />
        )}
      </footer>
    </>
  );
}

export default Footer;
