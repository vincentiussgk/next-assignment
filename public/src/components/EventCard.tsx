import useBalance from "@/hooks/useBalance";
import { IEvent, IUser } from "@/types/dataTypes";
import { Category } from "@/types/dropdownValues";
import { datePickerToStringMonth } from "@/utils/datePickerToStringMonth";
import { timeToString } from "@/utils/timeToString";
import { trimString } from "@/utils/trimString";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = ({
  eventData,
  bookmarkDetails,
  handleBookmarkChange,
}: {
  eventData: IEvent;
  bookmarkDetails: any;
  handleBookmarkChange: any;
}) => {
  const { currentUser } = useBalance();

  return (
    <div className={`relative flex `}>
      {bookmarkDetails ? (
        <button
          className={`absolute p-[12px] right-100 top-0 rounded-[8px] ${
            currentUser ? "z-[10]" : "z-[-1]"
          } `}
          onClick={() => handleBookmarkChange({ bookmarkId: bookmarkDetails })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 384 512"
          >
            <path
              fill="#7c0000"
              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
            />
          </svg>
        </button>
      ) : (
        <button
          className={`absolute p-[12px]  right-100 top-0 rounded-[8px] ${
            currentUser ? "z-[10]" : "z-[-1]"
          } `}
          onClick={() => handleBookmarkChange({ eventId: eventData?.id })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 384 512"
          >
            <path
              fill="#7c0000"
              d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
            />
          </svg>
        </button>
      )}

      <Link href={`events/${eventData?.id}`}>
        <div className="card card-compact bg-[#1d1c1c] text-[#bbb] w-96 shadow-xl cursor-pointer group">
          <figure className={`relative py-[12px] px-[50px] `}>
            <Image
              src={eventData?.image}
              alt="event image"
              width={200}
              height={200}
              className="max-w-none h-[200px]"
            />

            <div
              className={`absolute p-[12px] right-0 bottom-0 text-white bg-[#7c0000] 
          rounded-tl-[12px] hidden transition-all transition-duration-700
          group-hover:block `}
            >
              View Event
            </div>
          </figure>

          <div className="card-body h-[240px]">
            {datePickerToStringMonth(eventData?.date)} ● (
            {timeToString(eventData?.duration)})
            <div className="flex flex-row justify-between">
              <h2 className="card-title">{eventData?.name}</h2>
              <div className={`flex justify-between`}>
                <div>
                  <span className="badge">
                    {" "}
                    {Category[eventData?.category]}
                  </span>
                </div>
              </div>
            </div>
            <p>{trimString(eventData?.description, 200)}</p>
            <div className={`flex flex-row justify-between align-middle`}>
              <div className={`flex flex-row`}>
                <Image
                  src="/icons/MoneyIcon.svg"
                  width={24}
                  height={24}
                  alt="bookmark icon"
                />
                <div className="align-middle">${eventData?.price}</div>
              </div>
              <div className="flex flex-row align-middle">
                <div className="mx-2">
                  <Image
                    src="/icons/UserIcon.svg"
                    width={15}
                    height={15}
                    alt="bookmark icon"
                  />
                </div>
                {eventData?.current}/{eventData?.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/icons/LocationIcon.svg"
                width={12}
                height={12}
                alt="location icon"
                className="mx-1"
              />
              {eventData?.location}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
