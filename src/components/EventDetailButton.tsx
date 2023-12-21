import useBalance from "@/hooks/useBalance";
import { manipWithFetch } from "@/lib/fetch";
import { fetcher } from "@/lib/fetcher";
import Spinner from "@/pages/admin/components/Spinner";
import { IEvent } from "@/types/dataTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

interface IEventDetailButtonProps {
  eventData: IEvent;
}

const EventDetailButton = ({ eventData }: IEventDetailButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useBalance();

  const { data } = useSWR<IEvent[]>(
    `purchases?eventId=${router.query.eventId}&userId=${currentUser?.id}`,
    fetcher
  );

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await manipWithFetch(
        `events/${router.query.eventId}`,
        {
          current: parseInt(eventData?.current) + 1,
        },
        "PATCH"
      );

      await manipWithFetch(`purchases`, {
        userId: parseInt(currentUser?.id),
        eventId: parseInt(router.query.eventId),
        paymentStatus: false,
      });
      toast.success("Event successfully booked!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (eventData?.current >= eventData?.capacity) {
    return <button className={`btn btn-disabled`}>Sorry, Fully Booked!</button>;
  }

  if (data && data.length > 0) {
    if (data[0].paymentStatus) {
      return <button className={`btn disabled`}>Event Booked</button>;
    }

    return (
      <Link href={`/events/${router.query.eventId}/payment`}>
        <button className={`btn`}>Continue Payment</button>
      </Link>
    );
  }

  return (
    <Link href={`/events/${router.query.eventId}/payment`}>
      <button className={`btn`} onClick={handleButtonClick}>
        {loading ? <Spinner /> : "Book Now!"}
      </button>
    </Link>
  );
};

export default EventDetailButton;
