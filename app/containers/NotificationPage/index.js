import GradientHeading from '@/components/GradientHeading';
import React from 'react';

const NotificationPage = () => {
  return (
    <div>
      <div className=" w-full lg:max-w-[570px]">
        <GradientHeading heading={'Notification'} />
      </div>
      <div className="bg-[#1e80671f] p-2 rounded">
        <div className="bg-white rounded flex flex-col items-center justify-center gap-2 p-3">
          <img
            className="h-[74px] w-[94px]"
            src="/images/rightDrawer/notifIcon.svg"
            alt=""
          />
          <p className="text-18 font-bold text-center">No notification yet!</p>
          <p className="text-12 text-center max-w-[200px] leading-4">
            Check this section for updated, news and general notification
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
