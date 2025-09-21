import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { reactIcons } from '@/utils/icons';
import { dropNavLinks } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

export default function DropDown() {
  const navigate = useNavigate();

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => {
        const { close } = popupState;

        const handleLinkClick = (item) => {
          navigate(item.path);
          close();
        };

        return (
          <div>
            <Button sx={{ color: 'white' }} {...bindTrigger(popupState)}>
              <button className="text-[#fcedca] text-14 font-medium flex-center gap-2 hover:underline">
                <span className="text-xl">{reactIcons.setting}</span> Account
              </button>
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className="text-12">
                {dropNavLinks.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => handleLinkClick(item)}
                    className="font-bold text1-12 px-3 border-b border-gray-200  cursor-pointer"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            </Popover>
          </div>
        );
      }}
    </PopupState>
  );
}
