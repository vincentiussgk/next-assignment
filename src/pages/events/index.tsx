// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import EventCard from "@/components/EventCard";
import { fetcher } from "@/lib/fetcher";
import { IBookmarksDB, IEvent } from "@/types/dataTypes";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import useBalance from "@/hooks/useBalance";
import SearchInput from "../admin/components/SearchInput";
import SelectInputClient from "../admin/components/SelectInputClient";
import { useDebounce } from "@/hooks/useDebounce";
import { handleSelectClientChange } from "@/utils/admin/formHandlers";
import PaginationButton from "../admin/components/PaginationButton";
import useSWRAdmin from "@/hooks/useSWRAdmin";

const searchColumns = ["name", "category", "location", "price"];
const sortColumns = ["desc", "asc"];

const Events = () => {
  const { currentUser } = useBalance();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce<string>(searchQuery, 300);

  const [columnToSort, setColumnToSort] = useState("");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [requestParams, setRequestParams] = useState([
    `_sort=name&_order=${sortDir}`,
    `name_like=${searchQuery}`,
  ]);

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[0] = `_sort=${columnToSort}&_order=desc`;
      return [...prevParams];
    });
  }, [columnToSort]);

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[0] = `_sort=${columnToSort}&_order=${sortDir}`;
      return [...prevParams];
    });
  }, [sortDir]);

  useEffect(() => {
    setRequestParams((prevParams) => {
      prevParams[1] = `name_like=${debouncedValue}`;
      return [...prevParams];
    });
  }, [debouncedValue]);

  const {
    data: bookmarkData,
    mutate: bookmarkMutate,
    error: bookmarkError,
    isLoading: isBookmarkLoading,
  } = useSWR<IBookmarksDB>(
    `bookmarks?usersId=${currentUser?.id}&_expand=events`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const { slicedData, mutate, pageLimit } = useSWRAdmin(
    `events`,
    `?${requestParams.join("&")}`,
    page
  );

  const findEvent = (eventId: number) => {
    return bookmarkData?.find((bookmark) => bookmark.eventsId === eventId);
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
  return (
    <div className={`flex flex-col min-h-screen px-48 mt-10`}>
      <div className={`text-center`}>
        <h1 className={`text-[24px]`}>
          <strong>Events</strong>
        </h1>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col justify-end">
          <SearchInput
            value={searchQuery}
            placeholder={`Search events...`}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-1/4 gap-x-[10px]">
          <SelectInputClient
            handleSelectChange={handleSelectClientChange}
            stateHandler={setColumnToSort}
            label="Sort by"
            options={searchColumns}
            value={columnToSort}
          />
          <SelectInputClient
            handleSelectChange={handleSelectClientChange}
            stateHandler={setSortDir}
            label="Sort Direction"
            options={sortColumns}
            value={columnToSort}
          />
        </div>
      </div>
      <div
        className={`flex justify-between w-full justify-items-between gap-5 my-10`}
      >
        {slicedData?.map((event, idx) => (
          <EventCard
            key={idx}
            eventData={event}
            handleBookmarkChange={handleBookmarkChange}
            bookmarkDetails={findEvent(idx + 1)?.id}
          />
        ))}
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
};

export default Events;
