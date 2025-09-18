import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { reactIcons } from '@/utils/icons';
import moment from 'moment';
import 'moment-timezone';
import { useEffect } from 'react';
import { useState } from 'react';

export default function TimeDropDown() {
  const [systemTimeZoneOffset, setSystemTimeZoneOffset] = useState('');
  const [computerTimeZoneOffset, setComputerTimeZoneOffset] = useState('');
  const [istTimeZoneOffset, setIstTimeZoneOffset] = useState('');

  useEffect(() => {
    const updateOffsets = () => {
      const systemOffset = moment().format('Z');
      setSystemTimeZoneOffset(systemOffset);

      const computerOffset = moment().tz(moment.tz.guess()).format('Z');
      setComputerTimeZoneOffset(computerOffset);

      const istOffset = moment().tz('Asia/Kolkata').format('Z');
      setIstTimeZoneOffset(istOffset);
    };

    updateOffsets();
  }, []);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button sx={{ color: 'white' }} {...bindTrigger(popupState)}>
            (+05:30 {reactIcons.dropArrow})
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
            <div className=" text-12 min-w-[230px]">
              <p className="py-[6px] px-3">
                System Time - (GMT {systemTimeZoneOffset})
              </p>
              <p className="py-[6px] px-3 border-y border-gray-200">
                Your computer Time - (GMT {computerTimeZoneOffset})
              </p>
              <p className="py-[6px] px-3 ">
                India Standard Time - (GMT {istTimeZoneOffset})
              </p>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
