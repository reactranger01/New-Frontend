import { useEffect, useState } from 'react';
import { getAuthData } from '@/utils/apiHandlers'; // aapke project ka helper
import { getQueryString } from '@/utils/formatter';
import moment from 'moment';

let getAllBetsDataBool = false; // global flag to prevent multiple calls

export const useFetchMyBetsData = ({
  take = 10,
  //   startDate,
  //   endDate,
  eventId,
}) => {
  const [betsData, setBetsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const today = new Date();

  const getAllBets = async () => {
    if (getAllBetsDataBool) return;
    getAllBetsDataBool = true;
    setLoading(true);

    const params = getQueryString({
      limit: 20,
      startDate: moment(today).startOf('day').toISOString(),
      endDate: moment(today).endOf('day').toISOString(),
      eventId: eventId,
      status: 'current',
    });

    try {
      const response = await getAuthData(
        `/bet/get-past-currentbets?${params}`,
        // `/user/GetAllEventsBets?${params}`,
      );

      if (response?.status === 200) {
        setBetsData(response.data);
      }
    } catch (err) {
      console.error('Error fetching bets:', err);
    } finally {
      setLoading(false);
      getAllBetsDataBool = false;
    }
  };

  useEffect(() => {
    getAllBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take]);

  return { betsData, loading, refetch: getAllBets };
};
