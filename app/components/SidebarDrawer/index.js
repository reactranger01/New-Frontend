import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SidebarMenu } from '@/components';
import { links } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function SidebarDrawer({ open, toggleDrawer, setOpen }) {
  const [step, setStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const handleLinkClick = (item) => {
    setStep(1);
    setSelectedGame(item);
  };
  const renderDrawerContent = () => {
    if (step === 0) {
      return (
        <div className="flex flex-col">
          <NavLink
            onClick={() => setOpen(false)}
            className="text-14 border-b border-[#ddd] text-white bg-[#163439] py-3 pl-5 flex items-center gap-2 hover:scale-110 hover:bg-gray-100"
            to="/"
          >
            <span className="text-xl">{reactIcons.home}</span> Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="text-12 border-b border-[#ddd] py-3 pl-5 flex items-center gap-2 hover:scale-110 hover:bg-gray-100"
            to="/dashboard"
          >
            <span className="text-xl">
              <img
                src="/images/icons/casino.png"
                alt="casino"
                className="w-4 h-4"
              />
            </span>{' '}
            Live Casino
          </NavLink>
          {links.map((item, index) => (
            <NavLink
              onClick={() => handleLinkClick(item)}
              key={index}
              className="text-12 border-b border-[#ddd] py-3 pl-5 flex items-center gap-2 hover:scale-110 hover:bg-gray-100"
            >
              <span className="text-xl">
                {' '}
                <img src={item.icon} alt={item.title} className="w-4 h-4" />
              </span>{' '}
              {item.title}
            </NavLink>
          ))}
        </div>
      );
    } else {
      return (
        <SidebarMenu setOpen={setOpen} game={selectedGame} back={setStep} />
      );
    }
  };

  return (
    <div>
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
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};
