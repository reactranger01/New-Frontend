import { getAuthData } from './apiHandlers';

export const calcCurrentBetStats = (betData) => {
  if (betData) {
    if (betData.market === 'session') {
      betData.percent = betData.percent / 100;
      betData.percent += 1;
      betData.percent = Number(Number(betData.percent));
    }
    if (betData.market === 'bookmaker') {
      betData.price = betData.price / 100;
      betData.price += 1;
      betData.price = Number(Number(betData.price));
    }
    let win = 0;
    let loss = 0;
    if (
      betData.market === 'Match Odds' ||
      betData.market === 'MATCH_ODDS' ||
      betData.market === 'bookmaker'
    ) {
      if (betData?.betOn === 'BACK') {
        win = betData.stake * (betData.price - 1);
        loss = betData.stake * -1;
      } else {
        loss = betData.stake * (betData.price - 1) * -1;
        win = betData.stake * 1;
      }
      const calculateDtae = {
        type: betData.gameType,
        eventId: betData.eventId,
        selectionId: betData.selectionId,
        eventType: betData.eventType,
        selection: betData.selection,
        betOn: betData?.betOn,
        calculation: {
          win: win,
          loss: loss,
        },
      };
      return calculateDtae;
    } else {
      if (betData.market === 'session') {
        if (betData?.betOn === 'BACK') {
          win = betData.stake * (betData.percent - 1);
          loss = betData.stake * -1;
        } else {
          loss = betData.stake * (betData.percent - 1) * -1;
          win = betData.stake * 1;
        }
        const calculateDtae = {
          type: betData.gameType,
          eventId: betData.eventId,
          selectionId: betData.selectionId,
          eventType: betData.eventType,
          selection: betData.selection,
          betOn: betData?.betOn,
          calculation: {
            win: win,
            loss: loss,
          },
        };
        return calculateDtae;
      } else {
        if (betData?.betOn === 'BACK') {
          win = betData.stake * (betData.price - 1);
          loss = betData.stake * -1;
        } else {
          loss = betData.stake * (betData.price - 1) * -1;
          win = betData.stake * 1;
        }
        const calculateDtae = {
          type: betData.gameType,
          eventId: betData.eventId,
          selectionId: betData.selectionId,
          eventType: betData.eventType,
          selection: betData.selection,
          betOn: betData?.betOn,
          calculation: {
            win: win,
            loss: loss,
          },
        };
        return calculateDtae;
      }
    }
  } else {
    return null;
  }
};

export const calcPlacedBetOddsCriketCalculation = (
  bets,
  matchOddsMarket,
  oddsData,
  eventId,
) => {
  const eventBets = [];
  const fancyBets = [];
  const placedBetWinLossData = {};
  if (bets) {
    bets.forEach((element) => {
      if (element.event_id === Number(eventId)) {
        eventBets.push(element);
      }
    });
  }
  eventBets.forEach((bet) => {
    let win = 0;
    let loss = 0;
    if (bet.bet_on === 'BACK') {
      win = bet.stake * (bet.price - 1);
      loss = bet.stake * -1;
    } else {
      win = bet.stake;
      loss = bet.stake * (bet.price - 1) * -1;
    }
    if (
      bet?.market != 'session' &&
      bet?.market != 'bookmaker' &&
      bet?.market != 'Normal' &&
      bet?.market != 'fancy'
    ) {
      for (let i = 0; i < matchOddsMarket?.catalogue?.length; i++) {
        if (matchOddsMarket?.catalogue[i]?.market_name == bet?.game_type) {
          for (let j = 0; j < oddsData?.runners?.length; j++) {
            if (
              !placedBetWinLossData[matchOddsMarket?.catalogue[i]?.market_name]
            ) {
              placedBetWinLossData[matchOddsMarket?.catalogue[i]?.market_name] =
                {};
            }
            if (
              !placedBetWinLossData[matchOddsMarket?.catalogue[i]?.market_name][
                [oddsData?.runners[j]?.selectionId]
              ]
            ) {
              placedBetWinLossData[matchOddsMarket?.catalogue[i]?.market_name][
                [oddsData?.runners[j]?.selectionId]
              ] = 0;
            }
            if (
              Number([[oddsData?.runners[j]?.selectionId]]) ==
              Number(bet?.selection_id)
            ) {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[
                  matchOddsMarket?.catalogue[i]?.market_name
                ][[oddsData?.runners[j]?.selectionId]] += Number(
                  Number(win).toFixed(2),
                );
              } else {
                placedBetWinLossData[
                  matchOddsMarket?.catalogue[i]?.market_name
                ][[oddsData?.runners[j]?.selectionId]] += Number(
                  Number(loss).toFixed(2),
                );
              }
            } else {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[matchOddsMarket.catalogue[i]?.market_name][
                  [oddsData?.runners[j]?.selectionId]
                ] += Number(Number(loss).toFixed(2));
              } else {
                placedBetWinLossData[matchOddsMarket?.catalogue[i].market_name][
                  [oddsData?.runners[j]?.selectionId]
                ] += Number(Number(win).toFixed(2));
              }
            }
          }
          break;
        }
      }
    }
    if (bet?.market === 'bookmaker')
      if (bet?.game_type === 'fancy') fancyBets.push(bet);
  });
  const matchOddsallData = placedBetWinLossData['Match Odds']
    ? Object.entries(placedBetWinLossData['Match Odds']).map(([id, data]) => ({
        id: parseInt(id),
        data: data,
        type: data >= 0 ? 'profit' : 'loss',
        marketName: 'Match Odds',
      }))
    : [];
  const calculateData = {
    type: 'odds',
    exposer: matchOddsallData,
  };
  return calculateData;
};

export const calcPlacedBetBookmakerCricketalculation = (
  bets,
  bookmakerTransformData,
  eventId,
) => {
  const eventBets = [];
  const placedBetWinLossData = {};
  if (bets) {
    bets.forEach((element) => {
      if (element.event_id === Number(eventId)) {
        eventBets.push(element);
      }
    });
  }
  eventBets.forEach((bet) => {
    let win = 0;
    let loss = 0;
    if (bet.bet_on === 'BACK') {
      win = bet.stake * (bet.price - 1);
      loss = bet.stake * -1;
    } else {
      win = bet.stake;
      loss = bet.stake * (bet.price - 1) * -1;
    }
    if (
      bet?.market != 'session' &&
      bet?.market != 'Match Odds' &&
      bet?.market != 'Normal' &&
      bet?.market != 'fancy'
    ) {
      for (let i = 0; i < 1; i++) {
        if ('bookmaker' == bet?.game_type) {
          for (let j = 0; j < bookmakerTransformData?.runners?.length; j++) {
            if (!placedBetWinLossData[bookmakerTransformData?.market]) {
              placedBetWinLossData[bookmakerTransformData?.market] = {};
            }
            if (
              !placedBetWinLossData[bookmakerTransformData?.market][
                [bookmakerTransformData?.runners[j]?.selectionId]
              ]
            ) {
              placedBetWinLossData[bookmakerTransformData?.market][
                [bookmakerTransformData?.runners[j]?.selectionId]
              ] = 0;
            }
            if (
              Number([[bookmakerTransformData?.runners[j]?.selectionId]]) ==
              Number(bet?.selection_id)
            ) {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[bookmakerTransformData?.market][
                  [bookmakerTransformData?.runners[j]?.selectionId]
                ] += Number(Number(win).toFixed(2));
              } else {
                placedBetWinLossData[bookmakerTransformData?.market][
                  [bookmakerTransformData?.runners[j]?.selectionId]
                ] += Number(Number(loss).toFixed(2));
              }
            } else {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[bookmakerTransformData?.market][
                  [bookmakerTransformData?.runners[j]?.selectionId]
                ] += Number(Number(loss).toFixed(2));
              } else {
                placedBetWinLossData[bookmakerTransformData?.market][
                  [bookmakerTransformData?.runners[j]?.selectionId]
                ] += Number(Number(win).toFixed(2));
              }
            }
          }
          break;
        }
      }
    }
  });
  const matchOddsallData = placedBetWinLossData[bookmakerTransformData?.market]
    ? Object.entries(placedBetWinLossData[bookmakerTransformData?.market]).map(
        ([id, data]) => ({
          id: parseInt(id),
          data: data,
          type: data >= 0 ? 'profit' : 'loss',
          marketName: 'bookmaker',
        }),
      )
    : [];
  const calculateData = {
    type: 'bookmaker',
    exposer: matchOddsallData,
  };
  return calculateData;
};

export const calcPlacedBetOddsFootballOrTenisCalculation = (
  bets,
  matchOddsMarket,
  eventId,
) => {
  const eventBets = [];
  const fancyBets = [];
  const placedBetWinLossData = {};
  if (bets) {
    bets.forEach((element) => {
      if (element.event_id === Number(eventId)) {
        eventBets.push(element);
      }
    });
  }
  eventBets.forEach((bet) => {
    let win = 0;
    let loss = 0;
    if (bet.bet_on === 'BACK') {
      win = bet.stake * (bet.price - 1);
      loss = bet.stake * -1;
    } else {
      win = bet.stake;
      loss = bet.stake * (bet.price - 1) * -1;
    }
    if (
      bet?.market != 'session' &&
      bet?.market != 'bookmaker' &&
      bet?.market != 'Normal' &&
      bet?.market != 'fancy'
    ) {
      for (let i = 0; i < matchOddsMarket?.length; i++) {
        if (matchOddsMarket[i]?.market_name == bet?.game_type) {
          for (let j = 0; j < matchOddsMarket[i]?.runners?.length; j++) {
            if (!placedBetWinLossData[matchOddsMarket[i]?.market_name]) {
              placedBetWinLossData[matchOddsMarket[i]?.market_name] = {};
            }
            if (
              !placedBetWinLossData[matchOddsMarket[i]?.market_name][
                [matchOddsMarket[i]?.runners[j]?.selectionId]
              ]
            ) {
              placedBetWinLossData[matchOddsMarket[i]?.market_name][
                [matchOddsMarket[i]?.runners[j]?.selectionId]
              ] = 0;
            }
            if (
              Number([[matchOddsMarket[i]?.runners[j]?.selectionId]]) ==
              Number(bet?.selection_id)
            ) {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[matchOddsMarket[i]?.market_name][
                  [matchOddsMarket[i]?.runners[j]?.selectionId]
                ] += Number(Number(win).toFixed(2));
              } else {
                placedBetWinLossData[matchOddsMarket[i]?.market_name][
                  [matchOddsMarket[i]?.runners[j]?.selectionId]
                ] += Number(Number(loss).toFixed(2));
              }
            } else {
              if (bet.bet_on === 'BACK') {
                placedBetWinLossData[matchOddsMarket[i]?.market_name][
                  [matchOddsMarket[i]?.runners[j]?.selectionId]
                ] += Number(Number(loss).toFixed(2));
              } else {
                placedBetWinLossData[matchOddsMarket[i].market_name][
                  [matchOddsMarket[i]?.runners[j]?.selectionId]
                ] += Number(Number(win).toFixed(2));
              }
            }
          }
          break;
        }
      }
    }
    if (bet?.market === 'bookmaker')
      if (bet?.game_type === 'fancy') fancyBets.push(bet);
  });
  const combinedData = {};
  const primaryKey = Object.keys(placedBetWinLossData)[0]; // Dynamically get the first key
  combinedData[primaryKey] = {};
  for (const key in placedBetWinLossData) {
    Object.assign(combinedData[primaryKey], placedBetWinLossData[key]);
  }
  const matchOddsallData = Object.entries(placedBetWinLossData).flatMap(
    ([marketName, data]) =>
      Object.entries(data).map(([id, value]) => ({
        id: parseInt(id),
        data: value,
        type: value >= 0 ? 'profit' : 'loss',
        marketName: marketName,
      })),
  );
  const calculateData = {
    type: 'odds',
    exposer: matchOddsallData,
  };
  return calculateData;
};

export function updatePlacedBetCalculation(
  currentBetCalculation,
  heading,
  placedBetCalculation,
) {
  const { selectionId, calculation, betOn, type } = currentBetCalculation;
  if (!calculation || (Object.keys(calculation).length === 0 && !selectionId)) {
    return placedBetCalculation;
  }
  const updatedExposer = placedBetCalculation?.exposer?.map((entry) => {
    if (entry.marketName === type) {
      if (entry.id === Number(selectionId)) {
        const updatedData =
          betOn === 'BACK'
            ? entry.data + calculation.win
            : entry.data + calculation.loss;
        return {
          ...entry,
          data: updatedData,
          type: updatedData >= 0 ? 'profit' : 'loss',
        };
      } else {
        const updatedData =
          betOn === 'BACK'
            ? entry.data + calculation.loss
            : entry.data + calculation.win;
        return {
          ...entry,
          data: updatedData,
          type: updatedData >= 0 ? 'profit' : 'loss',
        };
      }
    }
    return entry;
  });

  return {
    ...placedBetCalculation,
    exposer: updatedExposer,
  };
}

export const getUserBets = async (eventId) => {
  try {
    const response = await getAuthData(
      `/bet/current-list?eventId=${eventId}&offset=0&limit=100`,
    );
    if (response?.status === 200) {
      return response?.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching user bets:', error);
    return {};
  }
};

export const transformBookmakerData = (bookData) => {
  if (!bookData.catalogue || bookData.catalogue.length === 0) {
    return bookData;
  }
  const firstCatalogue = bookData.catalogue[0];
  return {
    ...bookData,
    ...firstCatalogue,
    runners: JSON.parse(firstCatalogue.runners),
    catalogue: undefined,
  };
};

export const mobileModalStyle = {
  position: 'fixed',
  bottom: '0%',
  left: '50%',
  transform: 'translate(-50%, 5%)',
  width: '100%',
  bgcolor: 'white',
  outline: 'none',
  p: 2,
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
};

export const desktopModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};

export const getFixtureDataMobile = async (
  game,
  setInplay,
  setInplayTrue,
  setInplayFalse,
  setLoading,
) => {
  setLoading(true);
  try {
    const response = await getAuthData(
      `/catalogue/${game}/get-fixture-details`,
    );
    if (response?.status === 200 || response?.status === 201) {
      const data = response?.data.filter((item) => item.isDelete === false);
      if (data) {
        setLoading(false);
        const todayDate = new Date().toISOString().split('T')[0];
        const inplayTrueData = [];
        const inplayFalseData = [];
        data
          .sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime))
          .forEach((item) => {
            const entryDate = new Date(item?.matchDateTime)
              ?.toISOString()
              ?.split('T')[0];
            if (
              entryDate >= todayDate ||
              item?.status === 'ACTIVE' ||
              item?.status === 'OPEN'
            ) {
              if (item?.inplay === true) {
                inplayTrueData.push(item);
              } else {
                inplayFalseData.push(item);
              }
            }
          });

        setInplay(data);
        setInplayTrue(inplayTrueData);
        setInplayFalse(inplayFalseData);
      }
    }
  } catch (e) {
    setLoading(false);
    console.error(`Error fetching data from ${game}:`, e);
  }
};

export const getFixtureData = async (
  game,
  setInplayTrue,
  setInplayFalse,
  setLoading,
  setLoaderOneTime,
) => {
  setLoading(true);
  try {
    const response = await getAuthData(
      `/catalogue/${game}/get-fixture-details`,
    );
    if (response?.status === 200 || response?.status === 201) {
      const data = response?.data.filter((item) => item.isDelete === false);
      if (data) {
        const todayDate = new Date().toISOString().split('T')[0];
        const inplayTrueData = [];
        const inplayFalseData = [];
        setLoading(false);
        setLoaderOneTime(true);
        data
          .sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime))
          .forEach((item) => {
            const entryDate = new Date(item?.matchDateTime)
              ?.toISOString()
              ?.split('T')[0];
            if (
              entryDate >= todayDate ||
              item?.status === 'ACTIVE' ||
              item?.status === 'OPEN'
            ) {
              if (item?.inplay === true) {
                inplayTrueData.push(item);
              } else {
                inplayFalseData.push(item);
              }
            }
          });

        setInplayTrue(inplayTrueData);
        setInplayFalse(inplayFalseData);
      }
    }
  } catch (e) {
    setLoading(false);
    setLoaderOneTime(true);
    console.error(`Error fetching data from ${game}:`, e);
  }
};

export const fetchEventData = async (game, eventId, setters) => {
  const {
    setLoading,
    setLoaderOneTime,
    setOddsData,
    setBookmakerData,
    setFancyData,
    setSessionData,
    setMatchOddsMarket,
    setParticularMatchData,
    setFixtureEventName,
    setAllMarketData,
  } = setters;

  setLoading(true);
  try {
    const response = await getAuthData(
      `/catalogue/${game}/get-catalogue-details?eventId=${eventId}`,
    );
    if (response?.status === 200 || response?.status === 201) {
      if (response?.data) {
        const { data } = response;
        setLoading(false);
        setLoaderOneTime(true);
        if (
          setOddsData &&
          setBookmakerData &&
          setFancyData &&
          setSessionData &&
          setMatchOddsMarket &&
          setParticularMatchData
        ) {
          const matchOddsData = data?.events.find(
            (item) => item.market_name === 'Match Odds',
          );
          setOddsData(matchOddsData);
          setBookmakerData(data?.bookmakerData);
          setFancyData(data?.fancyData);
          setSessionData(data?.sessionData);
          setMatchOddsMarket({
            catalogue: [matchOddsData],
            marketName: matchOddsData?.market_name,
          });
          setParticularMatchData({
            eventName: matchOddsData?.name,
            marketId: matchOddsData?.market_id,
          });
        }
        if (setFixtureEventName) setFixtureEventName(data);
        if (setAllMarketData) setAllMarketData(data?.events);
      }
    }
  } catch (e) {
    setLoading(false);
    setLoaderOneTime(true);
    console.error(`Error fetching event data from ${game}:`, e);
  }
};
