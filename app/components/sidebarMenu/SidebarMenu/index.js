import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { SidebarSubMenu } from '@/components';
import { reactIcons } from '@/utils/icons';
import { getData } from '@/utils/apiHandlers';

const SidebarMenu = ({ game, back }) => {
  const [tournamentData, setTournamentData] = useState([]);
  const handleBack = () => {
    back(0);
  };

  const getCompition = async (game) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 10000),
    );
    try {
      const res = await Promise.race([
        getData(`/catalogue/${game}/competitions`),
        timeoutPromise,
      ]);

      if (res?.status === 200) {
        setTournamentData(res.data);
      } else {
        setTournamentData([]);
      }
    } catch (error) {
      if (error.message === 'Request timed out') {
        console.error('API request timed out after 10 seconds');
      } else {
        console.error(error);
      }
      setTournamentData([]);
    }
  };

  useEffect(() => {
    if (game?.route) {
      getCompition(game?.route);
    }
  }, [game?.route]);

  return (
    <div className="sidebar text-12">
      <button onClick={handleBack} className="py-2 ">
        <p className="pl-2 flex items-center gap-2 font-semibold">
          {reactIcons.casino} Sports
        </p>
      </button>
      <div className="py-2 bg-[#8C1000] text-white">
        <p className="pl-2 flex items-center gap-2">
          <img src={game.icon} alt={game.icon} className="w-4 h-4 invert" />{' '}
          {game.title}
        </p>
      </div>
      <SidebarSubMenu
        // setOpen={setOpen}
        item={tournamentData}
        game={game?.route}
      />
    </div>
  );
};

SidebarMenu.propTypes = {
  game: PropTypes.string,
  back: PropTypes.func,
};

export default SidebarMenu;
