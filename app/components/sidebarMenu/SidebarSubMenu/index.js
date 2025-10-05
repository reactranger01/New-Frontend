import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icons';
import { getData } from '@/utils/apiHandlers';
import { useNavigate, useParams } from 'react-router-dom';

const SidebarSubMenu = ({ item, game }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [seriesId, setSeriesId] = useState();

  const toggleOpen = (seriesId) => {
    setIsOpen(!isOpen);
    setSeriesId(seriesId);
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    const fetchData = async () => {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000),
      );
      try {
        const res = await Promise.race([
          getData(`/catalogue/${game}/events?seriesId=${seriesId}`),
          timeoutPromise,
        ]);
        if (res?.status === 200) {
          const filteredData = res.data.filter(
            (event) => event.isDelete === false,
          );
          setEventsData(filteredData);
        } else {
          setEventsData([]);
        }
      } catch (error) {
        if (error.message === 'Request timed out') {
          console.error('API request timed out after 10 seconds');
        } else {
          console.error(error);
        }
        setEventsData([]);
      }
    };
    if (seriesId) {
      fetchData();
    }
  }, [game, seriesId]);

  const handleNavigation = (child) => {
    if (game === 'cricket') {
      navigate(
        child?.event_id
          ? `/cricket/market/${child?.event_id}`
          : `/cricket/market/${child?.matchId}`,
        { state: { data: child } },
      );
    } else if (game === 'soccer') {
      navigate(
        child?.event_id
          ? `/football/market/${child?.event_id}`
          : `/football/market/${child?.matchId}`,
        { state: { data: child } },
      );
    } else if (game === 'tennis') {
      navigate(
        child?.event_id
          ? `/tennis/market/${child?.event_id}`
          : `/tennis/market/${child?.matchId}`,
        { state: { data: child } },
      );
    }
    // setOpen(false);
  };

  return (
    <div>
      <div>
        {item.length > 0 ? (
          <>
            {' '}
            {item &&
              item.map((subItem, subIndex) => {
                return (
                  <>
                    <p
                      key={subIndex}
                      className={` ${
                        seriesId == subItem?.seriesId && isOpen
                          ? 'bg-[#8c100012] border-l-2 border-[#8c1000]'
                          : ''
                      } flex items-center leading-4 justify-between gap-2 text-12 cursor-pointer px-3 py-2 hover:bg-[#8c100012]`}
                      onClick={() => {
                        toggleOpen(subItem?.seriesId);
                      }}
                    >
                      {subItem?.competition_name}
                      <span>
                        {isOpen ? reactIcons.upArrow : reactIcons.downArrow}
                      </span>
                    </p>
                    {isOpen && eventsData && seriesId == subItem?.seriesId && (
                      <>
                        {eventsData.length > 0 ? (
                          <div className="ml-2">
                            {eventsData.map((child, index) => (
                              <p
                                onClick={() => handleNavigation(child)}
                                key={index}
                                className={` ${
                                  eventId === child?.matchId
                                    ? 'text-[#8C1000] font-bold'
                                    : ''
                                } flex items-center leading-4 text-[11px] justify-between gap-1 cursor-pointer px-3 py-1 `}
                              >
                                {child?.name}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <div className="ml-2">
                            <p className="flex items-center leading-4 justify-center gap-2 cursor-pointer px-3 py-2 ">
                              No Data Available
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                );
              })}
          </>
        ) : (
          <div className="ml-2 text-center">
            <p className="flex items-center leading-4 justify-center gap-2 cursor-pointer px-3 py-2 ">
              No Data Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

SidebarSubMenu.propTypes = {
  item: PropTypes.array.isRequired,
  game: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SidebarSubMenu;
