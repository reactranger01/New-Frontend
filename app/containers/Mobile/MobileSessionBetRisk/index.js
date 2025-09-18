/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Loading } from '@/components';
import { getAuthData } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { useSelector } from 'react-redux';

const MobileSessionBetRisk = ({ isOpen, closeModal, singleRowData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const getSessionData = async () => {
    setLoading(true);
    try {
      const response = await getAuthData(
        `/user/getsessionPLbyuserid?eventId=${singleRowData?.eventId}&gameId=${singleRowData?.gameId}&selectionId=${singleRowData?.selectionId}&userId=${singleRowData?.userId}&gameType=${singleRowData?.gameType}&commision=${singleRowData?.commision}`,
      );
      if (response?.status === 201 || response?.status === 200) {
        if (response?.data) {
          setdata(response?.data);
        }
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      return null;
    }
    setLoading(false);
  };
  useEffect(() => {
    if (
      singleRowData?.eventId &&
      singleRowData?.gameId &&
      singleRowData?.selectionId &&
      singleRowData?.userId
    ) {
      getSessionData();
    }
  }, [
    singleRowData?.eventId,
    singleRowData?.gameId,
    singleRowData?.selectionId,
    singleRowData?.userId,
    stateUpdate,
  ]);

  return (
    <div>
      {loading && <Loading />}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[520px] relative transform overflow-hidden rounded-2xl  align-middle shadow-xl transition-all">
                  <div className="text-center border-b border-[#b9b7b7] md:text-20 text-18 font-semibold bg-white p-4">
                    <p className="text-black">{singleRowData?.RunnerName}</p>
                  </div>
                  <div className="bg-white p-4 py-6 flex flex-col gap-4">
                    <div>
                      <table className="w-full min-w-full ">
                        <thead>
                          <tr className="bg-white text-black w-full border-b border-b-[#b9b7b7]  xl:text-16 text-14">
                            <th className="rounded-tl-lg w-[50%] ">
                              <div className=" xl:text-16 text-14">SN.</div>
                            </th>{' '}
                            <th className="w-[50%]  ">
                              <div className=" xl:text-14 border-l border-l-[#b9b7b7] text-14 ">
                                Amount
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="max-h-[400px] overflow-y-auto theme-scroller">
                          {data &&
                            data?.map((items, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="bg-white text-black w-full border-b border-b-[#b9b7b7] divide-[#b9b7b7] xl:text-16 text-14"
                                >
                                  <td className="w-[50%] text-center  text-12">
                                    <div className="border-l border-l-[#b9b7b7]">
                                      {items?.position}
                                    </div>
                                  </td>{' '}
                                  <td className=" w-[50%]  text-12">
                                    <div
                                      className={` ${
                                        items?.profit_or_loss > 0
                                          ? 'text-green-700'
                                          : 'text-red-700'
                                      } border-r border-r-[#b9b7b7] border-l border-l-[#b9b7b7] xl:text-14 text-14`}
                                    >
                                      {numberWithCommas(
                                        items?.profit_or_loss || 0,
                                      ) || 0}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className=" md:p-4 p-3 flex justify-end md:gap-4 gap-3 bg-white">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="btn w-full rounded-lg h-[38px] md:h-[48px] text-14 md:text-16 px-7 md:px-12 font-medium text-black border border-[#b9b7b7] bg-white  "
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
MobileSessionBetRisk.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  singleRowData: PropTypes.object.isRequired,
};
export default MobileSessionBetRisk;
