import React from 'react';
import { PropTypes } from 'prop-types';

const HeaderMarque = ({ showMarquee, setShowMarquee }) => {
  return (
    <div className="w-full bg-[#0f2327] flex px-2 items-center">
      <div className="ml-36 hidden md:block">
        <img
          src="/images/home/ball.gif"
          alt="gif"
          className="h-8 cursor-pointer"
        />
      </div>
      {showMarquee && (
        <div className="flex items-center w-full">
          <marquee className="text-white flex justify-center items-center text-12 font-medium p-1 w-full">
            {Array(1000)
              .fill(null)
              .map((_, index) => {
                return (
                  <span key={index}>
                    {' '}
                    <span className="mx-4">
                      Welcome to our Lotus Pro Exchange!{' '}
                    </span>
                    <span className="mx-4">
                      15+ Sports with Original Betfair Markets, Powered by
                      Betfair! |{' '}
                    </span>
                    <span>Dive into the Ultimate Casino Adventure! | </span>
                    <span className="mx-4">
                      Choose from over 8000 live casino and slot games for
                      endless entertainment and big wins!{' '}
                    </span>
                    <span className="mx-4">
                      Introduce a new feature for automatic deposits and
                      withdrawals.
                    </span>
                  </span>
                );
              })}
          </marquee>
          <button
            onClick={() => setShowMarquee(false)}
            className="ml-2 text-white cursor-pointer p-1 text-lg block md:hidden absolute right-2 bg-[#0f2327]"
          >
            ✖
          </button>
        </div>
      )}

      <div className="mr-36 hidden md:block">
        <img
          src="/images/home/ball.gif"
          alt="gif"
          className="h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};
HeaderMarque.propTypes = {
  showMarquee: PropTypes.bool,
  setShowMarquee: PropTypes.func,
};

export default HeaderMarque;
