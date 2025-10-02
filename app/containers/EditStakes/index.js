import GradientHeading from '@/components/GradientHeading';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditStakes = () => {
  const [stakebutton, setStakeButton] = useState([
    { text: '100', value: 100 },
    { text: '200', value: 200 },
    { text: '300', value: 300 },
    { text: '400', value: 400 },
    { text: '500', value: 500 },
    { text: '600', value: 600 },
    { text: '700', value: 700 },
    { text: '800', value: 800 },
  ]);

  useEffect(() => {
    const localStakeData = JSON.parse(
      localStorage.getItem('localBetStakeData'),
    );
    if (localStakeData && Array.isArray(localStakeData)) {
      setStakeButton(localStakeData);
    }
  }, []);
  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="pb-2 md:py-2">
        <GradientHeading heading={'Edit Stakes'} />
      </div>

      <div className="flex gap-[5px] items-center w-full mb-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          {stakebutton?.map((item, index) => (
            <input
              key={index}
              type="text"
              className="border border-black rounded-md outline-none text-14 py-2 px-5"
              value={item?.value || ''} // ✅ prevents controlled/uncontrolled warning
              onChange={(e) => {
                const newStakeButton = [...stakebutton];
                newStakeButton[index].value = e.target.value;
                newStakeButton[index].text = e.target.value;
                setStakeButton(newStakeButton);
              }}
            />
          ))}

          <button
            onClick={() => {
              localStorage.setItem(
                'localBetStakeData',
                JSON.stringify(stakebutton),
              );
              toast.success('Stake Edited Successfully');
            }}
            className="col-span-2 bg-primary-1300 text-16 h-8 flex-center rounded-[4px] w-full text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStakes;
