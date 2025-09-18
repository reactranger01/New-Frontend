import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MobileGameHeader = ({
  type,
  GameName,
  inplayTrueData,
  inplayFalseData,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {type == 'LiveMatches' &&
      (inplayTrueData == null || inplayTrueData?.length == 0) ? (
        ''
      ) : (
        <>
          {type == 'LiveMatches' && (
            <div className="flex items-center justify-between">
              <div
                onClick={() => navigate('/mobile/cricket')}
                className="flex flex-1 items-center gap-2 text-16 font-semibold"
              >
                <span className="text-xl text-[#257b23]">
                  {reactIcons.cricket}
                </span>
                {GameName}
              </div>
              <div className="grid grid-cols-3 w-[140px]">
                <div className="col-span-1 flex-center text-10 font-semibold">
                  1
                </div>
                <div className="col-span-1 flex-center text-10 font-semibold">
                  X
                </div>
                <div className="col-span-1 flex-center text-10 font-semibold">
                  2
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {type == 'NotLiveMatches' &&
      (inplayFalseData == null || inplayFalseData?.length == 0) ? (
        ''
      ) : (
        <>
          {type == 'NotLiveMatches' && (
            <div className="flex items-center justify-between">
              <div
                onClick={() =>
                  navigate(
                    GameName == 'Cricket'
                      ? '/mobile/cricket'
                      : GameName == 'Tennis'
                      ? '/mobile/tennis'
                      : GameName == 'Football'
                      ? '/mobile/football'
                      : '',
                  )
                }
                className="flex flex-1 items-center gap-2 text-16 font-semibold"
              >
                <span className="text-xl text-[#257b23]">
                  {GameName == 'Cricket' && reactIcons.cricket}
                  {GameName == 'Tennis' && reactIcons.tennis}
                  {GameName == 'Football' && reactIcons.football}
                </span>
                {GameName}
              </div>
              <div className="grid grid-cols-3 w-[140px]">
                <div className="col-span-1 flex-center text-10 font-semibold">
                  1
                </div>
                <div className="col-span-1 flex-center text-10 font-semibold">
                  X
                </div>
                <div className="col-span-1 flex-center text-10 font-semibold">
                  2
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
MobileGameHeader.propTypes = {
  type: PropTypes.string.isRequired,
  GameName: PropTypes.string,
  inplayTrueData: PropTypes.array,
  inplayFalseData: PropTypes.array,
};

export default MobileGameHeader;
