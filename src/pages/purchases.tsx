// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import EventCard from "@/components/EventCard";
import useBalance from "@/hooks/useBalance";
import { useDebounce } from "@/hooks/useDebounce";
import useSWRAdmin from "@/hooks/useSWRAdmin";
import { fetcher } from "@/lib/fetcher";
import { IBookmarksDB, IEvent, IUser } from "@/types/dataTypes";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaginationButton from "./admin/components/PaginationButton";
import SelectInputClient from "./admin/components/SelectInputClient";
import { handleSelectClientChange } from "@/utils/admin/formHandlers";
import SearchInput from "./admin/components/SearchInput";
import useSWR from "swr";

const searchColumns = ["name", "category", "location", "price"];
const sortColumns = ["desc", "asc"];

const Purchases = () => {
  const { currentUser } = useBalance();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce<string>(searchQuery, 300);

  const [columnToSort, setColumnToSort] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [requestParams, setRequestParams] = useState([
    `userId=${currentUser?.id}&_expand=event`,
    `_sort=id&_order=${sortDir}`,
  ]);

  const { slicedData, mutate, isLoading, error, pageLimit } = useSWRAdmin(
    `purchases`,
    `?${requestParams.join("&")}`,
    page
  );

  const { data: bookmarkData, mutate: bookmarkMutate } = useSWR(
    `bookmarks?usersId=${currentUser?.id}`,
    fetcher
  );

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[1] = `_sort=${columnToSort}&_order=desc`;
      return [...prevParams];
    });
  }, [columnToSort]);

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[1] = `_sort=${columnToSort}&_order=${sortDir}`;
      return [...prevParams];
    });
  }, [sortDir]);

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[0] = `userId=${currentUser?.id}&_expand=event`;
      return [...prevParams];
    });
  }, [currentUser]);

  const findEvent = (eventId: number) => {
    return bookmarkData?.find(
      (bookmarkItem) => bookmarkItem.eventsId === eventId
    );
  };

  const handleBookmarkChange = async ({
    bookmarkId,
    eventId,
  }: {
    bookmarkId: number;
    eventId: number;
  }) => {
    try {
      if (eventId) {
        await handleAddBookmark(eventId);
        toast.success(`Bookmark saved!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        await handleRemoveBookmark(bookmarkId);
        toast.success(`Bookmark removed!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleAddBookmark = async (eventId: number) => {
    await fetch(`https://next-be-samuel.vercel.app/bookmarks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersId: currentUser?.id,
        eventsId: eventId,
      }),
    });

    bookmarkMutate();
  };

  const handleRemoveBookmark = async (bookmarkId: number) => {
    await fetch(`https://next-be-samuel.vercel.app/bookmarks/${bookmarkId}`, {
      method: "DELETE",
    });

    bookmarkMutate();
  };

  if (!slicedData || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (slicedData && !error) {
    return (
      <div className={`flex flex-col min-h-screen px-48 mt-10`}>
        <div className={`text-center`}>
          <h1 className={`text-[24px]`}>
            <strong>Purchases</strong>
          </h1>
        </div>

        <div
          className={`flex justify-between w-full justify-items-between gap-5 my-10`}
        >
          {slicedData?.length > 0 ? (
            slicedData?.map((purchaseItem, idx) => (
              <EventCard
                key={idx}
                eventData={purchaseItem.event}
                handleBookmarkChange={handleBookmarkChange}
                bookmarkDetails={findEvent(purchaseItem?.event?.id)?.id}
              />
            ))
          ) : (
            <div>No Data</div>
          )}
        </div>
        <div
          className={`flex justify-end mt-[6px] gap-x-[6px] bg-transparent py-5`}
        >
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
    );
  }
};

export default Purchases;
