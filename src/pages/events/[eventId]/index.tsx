// @ts-nocheck
import EventDetailButton from "@/components/EventDetailButton";
import { fetcher } from "@/lib/fetcher";
import { IEvent } from "@/types/dataTypes";
import { Category } from "@/types/dropdownValues";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const EventDetails = () => {
  const router = useRouter();

  const { data } = useSWR<IEvent>(`events/${router.query.eventId}`, fetcher);

  return (
    <div
      className={`py-[50px] min-h-screen px-[180px] border-solid border-[1px] border-black`}
    >
      <Link href={"/events"}>
        <button className="btn">Back</button>
      </Link>
      <div className={`flex gap-20 h-2/3 mt-3`}>
        <Image
          src={data?.image}
          alt="event image"
          width={200}
          height={60}
          className="rounded-lg w-1/4 h-[300px]"
        />

        <div className="flex flex-col gap-2 ">
          <div>
            {data?.startTime} ({data?.duration})
          </div>
          <div className="flex gap-5">
            <h1 className="text-[40px]">{data?.name}</h1>
            <div className="my-auto">
              <span className="badge badge-md my-auto">
                {Category[data?.category]}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="mx-2  my-auto">
              <Image
                src="/icons/MoneyIcon.svg"
                width={20}
                height={20}
                alt="bookmark icon"
              />
            </div>
            <p className="text-[20px]">${data?.price}</p>
          </div>

          <div className="flex">
            <div className="mx-2  my-auto">
              <Image
                src="/icons/UserIcon.svg"
                width={15}
                height={15}
                alt="bookmark icon"
              />
            </div>
            <p className="text-[20px]">
              {data?.current}/{data?.capacity}
            </p>
          </div>

          <div className="flex mb-3">
            <div className="mx-2 my-auto ">
              <Image
                src="/icons/LocationIcon.svg"
                width={15}
                height={15}
                alt="bookmark icon"
              />
            </div>
            <p className="text-[20px]">{data?.location}</p>
          </div>

          {data && <EventDetailButton eventData={data} />}
        </div>
        <div className={`max-h-[350px] overflow-y-scroll w-2/5`}>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
