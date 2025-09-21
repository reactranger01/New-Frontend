import React, { useCallback, useEffect, useRef, useState } from 'react';
import Switch from '@mui/material/Switch';
import { getAuthData, putApiReq } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
const SettingsMobile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stakeData, setStakeData] = useState([]);
  const [editedStakes, setEditedStakes] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    getStakesData();
  }, []);

  const getStakesData = async () => {
    const response = await getAuthData('/user/get-usermeta-details');
    if (response?.status === 200) {
      setStakeData(response?.data?.chipSetting || []);
    } else {
      setStakeData([]);
    }
  };
  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => {
      if (!prevIsEditing) {
        setEditedStakes(stakeData.map((stake) => ({ ...stake })));
      }
      return !prevIsEditing;
    });
  };

  const handleInputChange = useCallback((index, value) => {
    setEditedStakes((prevStakes) => {
      const updatedStakes = [...prevStakes];
      updatedStakes[index] = {
        ...updatedStakes[index],
        name: value,
        value: value,
      };
      return updatedStakes;
    });
    setFocusedIndex(index);
  }, []);
  useEffect(() => {
    if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex, editedStakes]);

  const handleSave = async () => {
    const response = await putApiReq('/user/update-chipssetting', {
      oneclick: editedStakes,
    });
    if (response?.status) {
      toast.success('Stake Updated successfully');
      setStakeData(editedStakes);
      setIsEditing(false);
    } else {
      console.error('Update failed');
    }
  };
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <div className="p-6 w-full min-h-screen max-w-md mx-auto rounded-md shadow-lg ">
      <h2 className="text-xl font-semibold mt-5 ">Settings</h2>
      <div className="mb-6">
        <h3 className="text-lg mb-2">One Click Settings</h3>
        <div className="flex items-center justify-between mb-4 text-14">
          <span>Two-factor authentication</span>
          <label className="switch">
            <Switch {...label} defaultChecked color="default" />
          </label>
        </div>
        <div className="flex items-center justify-between mb-4 text-14">
          <span>Tap to turn on one click betting</span>
          <label className="switch">
            <Switch {...label} defaultChecked color="default" />
          </label>
        </div>
      </div>
      <div>
        <div className="relative mb-6">
          <button
            className="w-full flex justify-between items-center bg-white border border-gray-300 py-2 px-4 rounded-sm"
            onClick={toggleDropdown}
          >
            Stakes settings
            <span className="text-gray-500">&#9662;</span>
          </button>
        </div>
        {isDropdownOpen && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Edit Stakes</h3>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {(isEditing ? editedStakes : stakeData).map((stake, index) => (
                <div
                  key={stake.value}
                  className={`border ${
                    isEditing ? 'border-black' : 'border-green-500'
                  } bg-primary-800 text-center py-2 rounded-sm ${
                    index === stakeData.length - 1 ? 'col-span-3' : ''
                  }`}
                >
                  {isEditing ? (
                    <input
                      type="number"
                      value={stake.name}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="bg-transparent text-center text-green-500 text-14 border-none outline-none w-full"
                    />
                  ) : (
                    <span className="text-green-500 text-14">{stake.name}</span>
                  )}
                </div>
              ))}
            </div>
            <button
              className="w-full py-2 bg-teal-800 text-white rounded-sm"
              onClick={isEditing ? handleSave : toggleEditMode}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit Texas Holdem Stakes</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {['20', '50', '100'].map((stake) => (
            <div
              key={stake}
              className="border border-green-500 text-green-500 text-center text-14 py-2 rounded-sm"
            >
              {stake}
            </div>
          ))}
        </div>
        <button className="w-full py-2 bg-teal-800 text-white rounded-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default SettingsMobile;
