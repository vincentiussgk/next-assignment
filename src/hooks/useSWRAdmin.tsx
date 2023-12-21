import { fetcher } from "@/lib/fetcher";
import ParticipantsModalIcon from "@/pages/admin/components/ParticipantsModalIcon";
import { datePickerToString } from "@/utils/datePickerToString";
import { timeToString } from "@/utils/timeToString";
import useSWR from "swr";

const ROW_LIMIT_PER_PAGE = 10;

function useSWRAdmin(url: string, params: string, page: number) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${url}${params}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );

  let dataToDisplay = data;

  let columns;

  switch (url) {
    case "users":
      columns = [
        {
          name: "id",
          isSortable: false,
        },
        { name: "email", isSortable: false },
        { name: "name", isSortable: true },
        { name: "role", isSortable: true },
        { name: "membership", isSortable: true },
        { name: "balance", isSortable: false },
      ];
      break;
    case "events":
      columns = [
        { name: "id", isSortable: false },
        { name: "name", isSortable: true },
        { name: "date", isSortable: true },
        { name: "location", isSortable: true },
        { name: "duration", isSortable: true },
        { name: "category", isSortable: true },
        { name: "price", isSortable: true },
        { name: "participants", isSortable: false },
      ];

      dataToDisplay = dataToDisplay?.map((dataRow) => {
        const { duration, date, ...rest } = dataRow;
        return {
          duration: timeToString(duration),
          date: datePickerToString(date),
          participants: <ParticipantsModalIcon event={dataRow} />,
          ...rest,
        };
      });

      break;
    case "merch":
      columns = [
        { name: "id", isSortable: false },
        { name: "name", isSortable: true },
        { name: "price", isSortable: true },
        { name: "stock", isSortable: true },
        { name: "eventId", isSortable: true },
      ];
      break;
  }

  const slicedData = dataToDisplay?.slice(
    (page - 1) * ROW_LIMIT_PER_PAGE,
    page * ROW_LIMIT_PER_PAGE - 1
  );

  const pageLimit = dataToDisplay?.length
    ? Math.ceil(dataToDisplay?.length / ROW_LIMIT_PER_PAGE)
    : 1;

  return {
    data: dataToDisplay,
    slicedData,
    pageLimit,
    columns,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}

export default useSWRAdmin;
