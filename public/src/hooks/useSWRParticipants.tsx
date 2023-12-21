import { fetcher } from "@/lib/fetcher";
import PaymentStatus from "@/pages/admin/components/PaymentStatus";
import useSWR from "swr";

const ROW_LIMIT_PER_PAGE = 10;

function useSWRParticipants(eventId: number, page: number, params?: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `purchases?eventId=${eventId}&_expand=user&_expand=event&${params}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );

  console.log(data);

  let columns;

  columns = [
    { name: "id", isSortable: false },
    { name: "participant name", isSortable: true },
    { name: "payment total", isSortable: true },
    { name: "payment status", isSortable: true },
  ];

  let dataToDisplay = data?.map((dataRow) => {
    return {
      id: dataRow.id,
      "participant name": dataRow.user.name,
      "payment total": dataRow.paymentTotal,
      "payment status": <PaymentStatus paymentStatus={dataRow.paymentStatus} />,
    };
  });

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

export default useSWRParticipants;
