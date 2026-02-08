import { Footer, Loading, Navbar } from '@/components';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { casinoProviders } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@/utils/toastHandler';
import { openModal } from '@/redux/Slices/modalSlice';

const Casino = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const itemRefs = useRef([]);
  const loaderRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [casinoData, setCasinoData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeProvider, setActiveProvider] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('All');

  const [iframeHtml, setIframeHtml] = useState(null);

  const LIMIT = 50;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /* -------------------- Debounce Search -------------------- */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  /* -------------------- Handle Browser Back -------------------- */
  useEffect(() => {
    const handleBack = () => {
      if (iframeHtml) {
        setIframeHtml(null);
      }
    };

    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [iframeHtml]);

  /* -------------------- Providers -------------------- */
  const handleProviderClick = (provider) => {
    setActiveProvider(provider);
    setActiveCategory('All');
    setSearchTerm('');
    setIframeHtml(null);
  };

  /* -------------------- Categories -------------------- */
  const handleCategoryClick = (category, index) => {
    setActiveCategory(category?.category || 'All');
    setSearchTerm('');
    setIframeHtml(null);

    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* -------------------- Fetch Categories -------------------- */
  const getCategories = async () => {
    try {
      const params = new URLSearchParams();
      if (activeProvider.toLowerCase() !== 'all') {
        params.append('provider', activeProvider);
      }

      const res = await getAuthData(
        `/user/get-casino-category?${params.toString()}`,
      );

      setCategories(res?.status ? res?.data?.games || [] : []);
    } catch {
      toast.error('Failed to fetch categories');
    }
  };

  /* -------------------- Fetch Games -------------------- */
  const getCasinoData = async (loadMore = false) => {
    if (loading || loadingMore || !hasMore) return;

    loadMore ? setLoadingMore(true) : setLoading(true);

    try {
      const params = new URLSearchParams();

      if (activeProvider.toLowerCase() !== 'all')
        params.append('provider', activeProvider);

      if (activeCategory !== 'All') params.append('category', activeCategory);

      if (debouncedSearch) params.append('search', debouncedSearch);

      params.append('limit', LIMIT);
      params.append('offset', loadMore ? offset : 0);

      const res = await getAuthData(
        `/user/get-casino-games?${params.toString()}`,
      );

      const games = res?.data?.games || [];

      setCasinoData((prev) => (loadMore ? [...prev, ...games] : games));
      setOffset((prev) => (loadMore ? prev + LIMIT : LIMIT));

      if (games.length < LIMIT) setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* -------------------- Infinite Scroll -------------------- */
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && getCasinoData(true),
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, offset]);

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    setCasinoData([]);
    getCasinoData();
  }, [activeCategory, activeProvider, debouncedSearch]);

  useEffect(() => {
    getCategories();
  }, [activeProvider]);

  /* -------------------- Launch Game -------------------- */
  const handleGameClick = async (game) => {
    if (!isLoggedIn()) {
      dispatch(openModal('login'));
      return;
    }

    setLoading(true);

    try {
      const payload = {
        platform: /Mobi|Android|iPhone/i.test(navigator.userAgent)
          ? 'mobile'
          : 'desktop',
        gameid: game?.game_id,
        id: user.id,
      };

      const res = await postAuthData('/user/create-session', payload);

      if (res?.status === 200 && res?.data?.data) {
        const raw = res.data.data;
        const json = JSON.parse(raw.substring(raw.indexOf('{')));

        window.history.pushState({ game: true }, '');

        setIframeHtml(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</head>
<body style="margin:0;padding:0;overflow:hidden;">
  ${json.gameHtml || ''}
  <script>
    ${json.gameScript || ''}

    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
  </script>
</body>
</html>
        `);
      } else {
        showToast('error', 'Game launch failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen">
      <Navbar />

      {!iframeHtml ? (
        <>
          <div className="p-2">
            <div className="bg-[#249F62] py-1 px-3 rounded text-white font-bold flex gap-1">
              {reactIcons.play} Casino
            </div>

            <input
              className="w-full border mt-2 px-3 py-1"
              placeholder="Search Games"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Providers */}
            <div className="flex gap-1 mt-2 overflow-x-auto">
              {casinoProviders.map((p) => (
                <button
                  key={p}
                  onClick={() => handleProviderClick(p)}
                  className={`px-3 py-1 whitespace-nowrap ${
                    activeProvider === p
                      ? 'bg-yellow-400'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="flex gap-1 mt-2 overflow-x-auto">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => handleCategoryClick(cat, i)}
                  className={`px-2 py-1 whitespace-nowrap ${
                    activeCategory === cat.category
                      ? 'bg-yellow-400'
                      : 'bg-gray-200'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Games */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {casinoData.map((game, i) => (
                <img
                  key={i}
                  src={game.game_images}
                  className="cursor-pointer"
                  onClick={() => handleGameClick(game)}
                />
              ))}
            </div>

            {hasMore && <div ref={loaderRef} className="h-10" />}
            {loading && <Loading isLoading />}
          </div>

          <Footer />
        </>
      ) : (
        /* ---------------- GAME VIEW ---------------- */
        <div
          className="fixed left-0 right-0 bottom-0 z-[9999] bg-black"
          style={{ top: '64px' }}
        >
          {/* Back Button */}
          <button
            onClick={() => {
              setIframeHtml(null);
              window.history.back();
            }}
            className="absolute top-2 left-2 z-[10000] bg-yellow-400 px-3 py-1 rounded font-bold"
          >
            ← Back
          </button>

          <iframe
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            srcDoc={iframeHtml}
            allowFullScreen
            title="Casino Game"
            style={{
              width: '100%',
              height: '100%',
              border: '0',
              display: 'block',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Casino;
