import { Footer, Loading, Navbar } from '@/components';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { casinoProviders, categoryIconMap } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@/utils/toastHandler';
import { setIframeUrl } from '@/redux/Slices/casinoUrlSlice';
import { openModal } from '@/redux/Slices/modalSlice';

const Casino = () => {
  const dispatch = useDispatch();
  const iframeUrl = useSelector((state) => state?.casino?.iframeUrl);
  const user = useSelector((state) => state.user);
  const categoriesContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [casinoData, setCasinoData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeProvider, setActiveProvider] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('All');
  const itemRefs = useRef([]);
  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleProviderClick = (provider) => {
    setActiveProvider(provider);
    setActiveCategory('All');
    setSearchTerm('');
    dispatch(setIframeUrl(null));
  };
  const handleCategoryClick = (category, index) => {
    setActiveCategory(category?.category || 'All');
    setSearchTerm('');
    dispatch(setIframeUrl(null));

    // Fixed smooth scroll
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const getPlatform = () =>
    /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

  // ✅ fetch categories dynamically
  const getCategories = async () => {
    try {
      const params = new URLSearchParams();
      if (activeProvider && activeProvider.trim().toLowerCase() !== 'all') {
        params.append('provider', activeProvider);
      }

      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await getAuthData(`/user/get-casino-category${query}`);

      if (response?.status) {
        setCategories(response?.data?.games || []);
      } else {
        setCategories([{ category: 'All', icon: '/images/all.png' }]);
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err?.message || 'Failed to fetch categories');
    }
  };

  // fetch games
  const getCasinoData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeProvider && activeProvider.trim().toLowerCase() !== 'all')
        params.append('provider', activeProvider);
      if (activeCategory && activeCategory !== 'All')
        params.append('category', activeCategory);
      if (debouncedSearch) params.append('search', debouncedSearch);

      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await getAuthData(`/user/get-casino-games${query}`);

      if (response?.status) {
        setCasinoData(response?.data?.games || []);
      } else {
        toast.dismiss();
        toast.error(response?.error || 'Failed to fetch casino games');
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider]);

  useEffect(() => {
    getCasinoData();

    return () => {
      dispatch(setIframeUrl(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeProvider, debouncedSearch]);

  const handleGameClick = async (game) => {
    const toastId = 'gameToast';
    if (user?.userType?.toLowerCase() === 'demo') {
      showToast(
        'error',
        'This is a demo login. To play casino, use your registered account.',
        toastId,
      );
      return;
    }
    setLoading(true);
    try {
      const platform = getPlatform();
      if (!user?.id) {
        showToast('error', 'User ID not found. Please log in again.', toastId);
        return;
      }

      const payload = { platform, gameid: game?.game_id, id: user.id };
      const res = await postAuthData('/user/create-session', payload);

      if (res?.status === 200) {
        dispatch(setIframeUrl(res?.data?.url));
      } else {
        showToast(
          'error',
          res?.data?.message || 'Failed to start game',
          toastId,
        );
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="">
        <div className="p-2  rounded-xl">
          <div className="bg-[#249F62] py-1 px-[10px] flex items-center rounded-[3px] text-white gap-1 text-14 font-roboto font-bold">
            <span className=""> {reactIcons.play}</span> Casino
          </div>

          <div className="relative w-full mt-2">
            <span className="absolute ay-center left-2">
              {reactIcons.search}
            </span>
            <input
              type="text"
              placeholder="Search Games"
              className="bg-transparent w-full border border-primary-100 text-black  pl-6 pr-10 py-2 rounded-[3px] text-sm h-[26px]  placeholder:text-[#312b2b]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <span
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black bg-white text-lg rounded-full cursor-pointer"
              >
                {reactIcons.cross}
              </span>
            )}
          </div>

          {/* providers */}
          <div className="flex border gap-[2px]  mt-2 overflow-x-auto">
            {casinoProviders.map((provider) => (
              <button
                key={provider}
                onClick={() => handleProviderClick(provider)}
                className={`px-4 py-2 text-12 rounded-sm  whitespace-nowrap font-lato font-bold 
                ${
                  activeProvider === provider
                    ? 'bg-[#F4D821] text-black'
                    : 'bg-white text-white  bg-[linear-gradient(180deg,#00c694,#174f41)]'
                }`}
              >
                {provider}
              </button>
            ))}
          </div>

          {/* categories */}
          <div
            ref={categoriesContainerRef}
            className="flex items-center gap-1 overflow-x-auto py-2"
          >
            {categories?.map((cat, index) => (
              <button
                key={cat?.category || index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleCategoryClick(cat, index)}
                className={`px-3 py-1 flex flex-col items-center min-w-[90px] h-[55px] font-lato text-10 justify-center rounded 
   whitespace-nowrap transition-all flex-shrink-0
  ${
    activeCategory === cat?.category
      ? ' bg-[#F4D821] text-white'
      : 'bg-[#E9E9E9] text-black'
  }`}
              >
                <img
                  src={
                    categoryIconMap[cat?.category] ||
                    '/images/casinoicon/i1.png'
                  }
                  alt={cat?.category}
                  className="w-6 h-6 mb-1 "
                />
                <span>{cat?.category}</span>
              </button>
            ))}
          </div>

          {/* games grid / iframe */}
          {!iframeUrl ? (
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7  gap-[2px] mb-2">
              {loading && (
                <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-md">
                  <Loading isLoading={loading} />
                </div>
              )}

              {!loading && casinoData?.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-4">
                  No data available for casino
                </div>
              )}

              {casinoData?.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full cursor-pointer"
                  onClick={() => {
                    if (isLoggedIn()) {
                      handleGameClick(item);
                    } else {
                      dispatch(openModal('login'));
                    }
                  }}
                >
                  <img
                    src={item?.game_images}
                    className="w-full h-32 md:h-44 object-fill"
                    alt={`Game ${index}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[calc(100vh-290px)] lg:h-[calc(100vh-270px)]">
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title="Casino Game"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Casino;

// import { CasinoSlider, Loading } from '@/components';
// import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
// import { SliderLinks } from '@/utils/constants';
// import { isMobile } from 'react-device-detect';
// import toast from 'react-hot-toast';
// import React, { useCallback, useEffect, useState } from 'react';
// import CasinoPlay from '@/components/CasinoPlay';
// import { useDispatch, useSelector } from 'react-redux';
// import { reactIcons } from '@/utils/icons';
// import { useLocation } from 'react-router-dom';
// // import CasinoModal from '../CasinoModal';
// import { useMediaQuery } from '@mui/material';
// import { openModal } from '@/redux/Slices/modalSlice';
// import { getImage } from '@/utils/imagekit';
// const Casino = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [allCasinoGame, setAllCasinoGame] = useState([]);
//   const [providerSearch, setProviderSearch] = useState('all');
//   const [deviceType, setDeviceType] = useState(null);
//   const [url, setUrl] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const userIdFromRedux = useSelector((state) => state.user.id);
//   const userInfo = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   // const [casinoPoints, setCasinoPoints] = useState(false);
//   // const [gameId, setGameId] = useState();
//   const location = useLocation();
//   const isMobileDevice = useMediaQuery('(max-width:768px)');
//   const isLogin = isLoggedIn();
//   const passedProvider = location?.state?.provider;
//   const passedId = location?.state?.id;

//   useEffect(() => {
//     if (passedProvider) {
//       setProviderSearch(passedProvider);
//       setSelectedIndex(passedId);
//     }
//     getCasinoGame();
//     setDeviceType(isMobile ? 'mobile' : 'desktop');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [passedProvider, deviceType]);
//   useEffect(() => {
//     getCasinoGame();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [providerSearch]);
//   const getCasinoGame = async () => {
//     setisLoading(true);
//     try {
//       const endpoint =
//         providerSearch === 'all'
//           ? '/user/casino-by-category'
//           : `/user/casino-by-category?category=${providerSearch}`;
//       const response = await getAuthData(endpoint);
//       if (response?.status === 201 || response?.status === 200) {
//         setAllCasinoGame(response?.data);
//         setUrl(null);
//         setisLoading(false);
//       }
//     } catch (e) {
//       console.error(e);
//       setisLoading(false);
//       return null;
//     }
//   };

//   const handleCasinoGame = useCallback(
//     async (id) => {
//       if (userInfo.casinoLock) {
//         toast.error(
//           'Casino is currently locked. Please contact the admin for assistance.',
//         );
//         return;
//       }
//       if (userIdFromRedux) {
//         try {
//           const response = await postAuthData('/user/create-session', {
//             platform: deviceType,
//             id: userIdFromRedux,
//             gameid: String(id),
//           });
//           if (response?.status === 200 || response?.status === 201) {
//             if (response.data?.url) {
//               setUrl(response.data?.url);
//             } else {
//               toast.error('Game not live now');
//             }
//           } else {
//             toast.error(response?.data?.message || 'Something went wrong');
//           }
//         } catch (error) {
//           toast.error(error || 'Something went wrong');
//         }
//       } else {
//         console.error('error');
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [deviceType, userIdFromRedux],
//   );
//   return (
//     <div className={`${isMobileDevice && 'bg-[#0F2327]'} `}>
//       {isLoading && <Loading />}
//       <div className="border-b border-black  py-3 hidden md:block">
//         <h1 className="text-24">Live Casino</h1>
//       </div>
//       <div className="text-white md:hidden flex items-center gap-2 text-16 font-bold bg-[#1A4E61] py-2 px-3">
//         <span>{reactIcons.bigLeft}</span>
//         Live Casino
//       </div>
//       <div className={`w-full ${url ? 'hidden' : ''}`}>
//         <CasinoSlider
//           setSelectedIndex={setSelectedIndex}
//           setProviderSearch={setProviderSearch}
//           setUrl={setUrl}
//         />
//       </div>

//       <div
//         className={`flex items-center justify-between overflow-x-auto gap-1 ${
//           isMobile && 'slider-casino'
//         } ${url ? 'hidden' : ''}`}
//       >
//         {SliderLinks.map((item, index) => (
//           <div
//             className={`flex flex-col items-center md:h-[45px] h-[70px] ${
//               selectedIndex === item?.id ? 'bg-primary-1200' : 'bg-[#0f2327]'
//             } rounded px-3 py-3 md:py-1 cursor-pointer w-full min-w-[100px] text-white border-[1px] border-[#ffffff26] md:border-none`}
//             key={index}
//             onClick={() => {
//               setUrl(null);
//               setProviderSearch(item?.provider);
//               setSelectedIndex(item?.id);
//             }}
//           >
//             <div>
//               <img
//                 src={getImage(item.icon)}
//                 alt={item?.provider}
//                 className="h-7 w-7 md:h-4 md:w-4 object-cover"
//               />
//             </div>
//             <p className="text-xs mt-0.5 whitespace-nowrap">{item.title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="md:my-10">
//         <h1 className="hidden md:flex items-center capitalize font-semibold gap-2 my-4">
//           {url && (
//             <span
//               className="flex justify-center text-22 text-red-700 items-center"
//               onClick={() => setUrl('')}
//             >
//               {' '}
//               {reactIcons.circleLeftArrow}
//             </span>
//           )}{' '}
//           <span> {reactIcons.casino}</span>
//           {providerSearch || 'Roulette'}
//         </h1>
//         {url ? (
//           <CasinoPlay url={url} />
//         ) : (
//           <div className="grid 2xl:grid-cols-4 grid-cols-3 sm1:grid-cols-3 md:grid-cols-3 gap-2 mt-4 md:mt-0">
//             {allCasinoGame?.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative h-full cursor-pointer"
//                 onClick={() => {
//                   if (isLogin) {
//                     handleCasinoGame(item?.id);
//                     // setGameId(item?.id);
//                     // setCasinoPoints(true);
//                   } else {
//                     dispatch(openModal('login'));
//                   }
//                 }}
//               >
//                 <img
//                   src={getImage(item?.game_images)}
//                   alt={item.provider}
//                   loading="lazy"
//                   className="h-auto md:h-full md:w-full w-auto object-cover"
//                 />
//                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center py-2">
//                   <p className="text-xs md:text-sm font-semibold">
//                     {item.title}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* {casinoPoints && (
//           <CasinoModal
//             casinoPoints={casinoPoints}
//             setCasinoPoints={setCasinoPoints}
//             handleCasinoGame={handleCasinoGame}
//             gameId={gameId}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Casino;
