/* eslint-disable react-hooks/exhaustive-deps */
import EventCard from "@/components/EventCard";
import useBalance from "@/hooks/useBalance";
import { useDebounce } from "@/hooks/useDebounce";
import useSWRAdmin from "@/hooks/useSWRAdmin";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaginationButton from "./admin/components/PaginationButton";

const searchColumns = ["name", "category", "location", "price"];
const sortColumns = ["desc", "asc"];

const Saved = () => {
  const { currentUser } = useBalance();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce<string>(searchQuery, 300);

  const [columnToSort, setColumnToSort] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [requestParams, setRequestParams] = useState([
    `usersId=${currentUser?.id}&_expand=events`,
    `_sort=id&_order=${sortDir}`,
  ]);

  const { slicedData, mutate, isLoading, error, pageLimit } = useSWRAdmin(
    `bookmarks`,
    `?${requestParams.join("&")}`,
    page
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
      prevParams[0] = `usersId=${currentUser?.id}&_expand=events`;
      return [...prevParams];
    });
  }, [currentUser]);

  const findEvent = (eventId: number) => {
    return slicedData?.find((bookmark) => bookmark.eventsId === eventId);
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
    await fetch(`http://localhost:8080/bookmarks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersId: currentUser?.id,
        eventsId: eventId,
      }),
    });

    mutate();
  };

  console.log("data", slicedData);

  const handleRemoveBookmark = async (bookmarkId: number) => {
    await fetch(`http://localhost:8080/bookmarks/${bookmarkId}`, {
      method: "DELETE",
    });

    mutate();
  };

  if (!slicedData || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (slicedData && !error) {
    return (
      <div className={`flex flex-col min-h-screen px-48 mt-10`}>
        <div className={`text-center`}>
          <h1 className={`text-[24px]`}>
            <strong>Saved Events</strong>
          </h1>
        </div>

        <div
          className={`flex justify-between w-full justify-items-between gap-5 my-10`}
        >
          {slicedData?.length > 0 ? (
            slicedData?.map((bookmark, idx) => (
              <EventCard
                key={idx}
                eventData={bookmark.events}
                handleBookmarkChange={handleBookmarkChange}
                bookmarkDetails={findEvent(bookmark.events.id)?.id}
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

export default Saved;
