import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { links } from '@/utils/constants';
import { NavLink, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { reactIcons } from '@/utils/icons';

const getIdArr = [
  {
    id: 1,
    img: '/images/drawer/whatsapp.webp',
  },
  {
    id: 1,
    img: '/images/drawer/insta.webp',
  },
  {
    id: 1,
    img: '/images/drawer/tele.webp',
  },
  {
    id: 1,
    img: '/images/drawer/fb.webp',
  },
];

export default function SidebarDrawer({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const handleLinkClick = (item) => {
    toggleDrawer(false)(); // call the returned function
    navigate(item?.path);
  };

  const renderDrawerContent = () => {
    return (
      <div className="w-[240px] shrink-0 bg-white border border-[#ddd] overflow-hidden">
        <div className="flex flex-col w-full">
          <NavLink
            onClick={toggleDrawer}
            to={'/'}
            className={
              'text-[16px] font-bold border-b text-black border-[#ddd] py-[9px] pl-[15px] flex items-center gap-2  hover:bg-gray-100'
            }
          >
            <div className="text-[#e4c41e] w-[18px]">{reactIcons.star}</div>
            Favourites
          </NavLink>
          {links.map((item, index) => (
            <div
              onClick={() => handleLinkClick(item)}
              // to={item.path}
              key={index}
              className={
                'text-[16px] font-bold border-b text-black border-[#ddd] py-[9px] pl-[15px] flex items-center gap-2  hover:bg-gray-100'
              }
            >
              <span className="">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[18px] h-[18px]"
                />
              </span>{' '}
              {item.title}
            </div>
          ))}
        </div>

        <div className="px-4">
          <h4 className="text-[#1e8067] text-16 font-bold my-4">
            Get Instant ID On Whatsapp
          </h4>
          <div>
            {getIdArr.map((item, index) => (
              <img
                src={item?.img}
                key={index}
                className="w-[80%] mb-2"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          {renderDrawerContent()}
        </Box>
      </Drawer>
    </div>
  );
}

SidebarDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
};
