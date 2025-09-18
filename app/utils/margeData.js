export const mergeData1 = (eventNames, parsedData) => {
  return eventNames.map((eventItem) => {
    const parsedItem = parsedData.find(
      (item) =>
        Number(item.eventid || item?.matchId) ===
        Number(eventItem.event_id || eventItem.matchId),
    );

    if (parsedItem) {
      const updatedRunners = parsedItem.odds.map((runner) => {
        const eventRunner = eventItem.runners.find(
          (er) => Number(er.selectionId) === Number(runner.selectionId),
        );

        return {
          ...runner,
          runnerName: eventRunner ? eventRunner.runnerName : null,
        };
      });

      return {
        ...eventItem,
        ...parsedItem,
        odds: updatedRunners || [],
        runners: eventItem.runners,
      };
    }

    return {
      ...eventItem,
      odds: [],
    };
  });
};
export const mapOddsWithRunners = (data) => {
  return data?.map((item) => {
    let modifiedOdds = item?.odds?.map((odd) => {
      let correspondingRunner = item?.runners?.find(
        (r) => Number(r.selectionId) === Number(odd.selectionId),
      );
      return {
        ...odd,
        runnerName: correspondingRunner?.runnerName || '',
      };
    });
    return {
      ...item,
      odds: {
        ...item.odds,
        runners: modifiedOdds,
        marketId: item.marketId || item.market_id,
        inplay: item.inplay || false,
      },
    };
  });
};
export const sortFixtureData = (data) => {
  return data.sort((a, b) => {
    if (a.inplay && !b.inplay) {
      return -1;
    }
    if (!a.inplay && b.inplay) {
      return 1;
    }
    return new Date(a.matchDateTime) - new Date(b.matchDateTime);
  });
};
export const getRunnerName = (items, fixtureEventName) => {
  const correspondingFixture = fixtureEventName.find((fixture) =>
    fixture.runners.some(
      (fixtureRunner) =>
        fixtureRunner.selectionId.toString() === items.selectionId,
    ),
  );

  const fixtureRunner = correspondingFixture
    ? correspondingFixture.runners.find(
        (fixtureRunner) =>
          fixtureRunner.selectionId.toString() === items.selectionId,
      )
    : null;

  return fixtureRunner ? fixtureRunner.runnerName : '';
};
export function intToString(num) {
  const n = Number(num);

  // Check if the converted number is valid
  if (isNaN(n)) {
    return ''; // Return a default value for invalid inputs
  }
  if (num < 1000) {
    return num;
  }
  var si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].v) {
      break;
    }
  }
  return (
    (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
    si[i].s
  );
}

export const processFixtureData = (eventNames, parsedData) => {
  // Merge, map, and sort in one function
  return eventNames
    .map((eventItem) => {
      // Find a matching parsedItem based on event_id
      const parsedItem = parsedData.find(
        (item) => item.eventid === eventItem.event_id,
      );

      if (parsedItem) {
        // If matching parsedItem is found, update with parsed data
        const updatedRunners = parsedItem.odds.map((runner) => {
          const eventRunner = eventItem.runners.find(
            (er) => er.selectionId === runner.selectionId,
          );

          return {
            ...runner,
            runnerName: eventRunner ? eventRunner.runnerName : null,
          };
        });

        return {
          ...eventItem,
          ...parsedItem, // Merge all keys from parsedItem
          odds: {
            ...parsedItem.odds,
            runners: updatedRunners || [], // Update odds with parsed data
            marketId: parsedItem.marketId || parsedItem.market_id,
          },
        };
      }
      return {
        ...eventItem,
        odds: [],
      };
    })
    .map((item) => {
      // Map odds with runners
      const modifiedOdds = item.odds.map((odd) => {
        const correspondingRunner = item.runners.find(
          (r) => r.selectionId === odd.selectionId,
        );
        return {
          ...odd,
          runnerName: correspondingRunner?.runnerName || '',
        };
      });

      return {
        ...item,
        odds: modifiedOdds,
      };
    })
    .sort((a, b) => {
      // Sort fixture data
      if (a.inplay && !b.inplay) {
        return -1;
      }
      if (!a.inplay && b.inplay) {
        return 1;
      }
      return new Date(a.matchDateTime) - new Date(b.matchDateTime);
    });
};
