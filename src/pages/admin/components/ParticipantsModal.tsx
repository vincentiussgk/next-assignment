import useSWRParticipants from "@/hooks/useSWRParticipants";
import { trimString } from "@/utils/trimString";
import React, { isValidElement, useState } from "react";
import PaginationButton from "./PaginationButton";
import { IEvent } from "@/types/dataTypes";

interface ParticipantsModalProps {
  event: IEvent;
  closeModal: () => void;
}

const ParticipantsModal = ({ event, closeModal }: ParticipantsModalProps) => {
  const [page, setPage] = useState(1);

  const { data, slicedData, pageLimit, columns, mutate, error, isLoading } =
    useSWRParticipants(event.id, page);

  return (
    <>
      <div
        className={`bg-[rgba(0,_0,_0,_0.2)] w-screen h-screen z-0
        top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        transition-opacity ease-in-out duration-300 
        absolute`}
        onClick={closeModal}
      ></div>
      <div
        className={`fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        
        transition-opacity ease-in-out duration-300`}
      >
        <div
          className={`flex flex-col 
          bg-white text-white
          z-10 rounded-[16px]
          shadow-[0 5px 20px 0 rgba(0, 0, 0, 0.04)] `}
        >
          <div
            className={`flex text-black justify-between px-[25px] py-[15px]`}
          >
            <h2>Attending Participants for {event.name}</h2>
            <h2 onClick={closeModal} className={`cursor-pointer`}>
              X
            </h2>
          </div>
          <div
            className={`text-[14px] py-[20px] px-[50px]
            text-black
            text-left gap-y-[10px]
            border-t-[1px] border-b-[1px] border-[#BABABA]`}
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns?.map((column, idx) => (
                    <th key={idx} scope="col" className={`px-6 py-3 group`}>
                      <div className={`flex justify-between items-center`}>
                        {column.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((dataRow, idx) => (
                  <tr
                    key={dataRow?.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {columns?.map((column, idx) => {
                      return (
                        <td key={idx} className="px-6 py-4 justify-center">
                          {isValidElement(dataRow[column.name])
                            ? dataRow[column.name]
                            : trimString(dataRow[column.name], 50)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`flex justify-end mt-[14px] gap-x-[6px]`}>
              <PaginationButton onClick={() => setPage(1)} value="<<" />
              <PaginationButton
                buttonStyle={page === 1 ? "disabled" : "primary"}
                onClick={() => setPage(page - 1)}
                value="<"
              />

              {[...Array(pageLimit).keys()].map((i) => (
                <PaginationButton
                  key={i + 1}
                  buttonStyle={page === i + 1 ? "selected" : "primary"}
                  onClick={() => setPage(i + 1)}
                  value={(i + 1).toString()}
                />
              ))}
              <PaginationButton
                buttonStyle={page === pageLimit ? "disabled" : "primary"}
                onClick={() => setPage(page + 1)}
                value=">"
              />
              <PaginationButton onClick={() => setPage(pageLimit)} value=">>" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantsModal;
