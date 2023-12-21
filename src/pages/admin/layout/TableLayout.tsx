// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import ActionCell from "@/pages/admin/components/ActionCell";
import { trimString } from "@/utils/trimString";
import React, { isValidElement, useEffect, useState } from "react";
import { fetchBaseUrl } from "@/lib/fetch";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminModal from "../components/AdminModal";
import PaginationButton from "../components/PaginationButton";
import useSWRAdmin from "@/hooks/useSWRAdmin";

interface ITableLayoutProps {
  searchQuery: string;
}

const TableLayout = ({ searchQuery }: ITableLayoutProps) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  const [columnToSort, setColumnToSort] = useState("");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [requestParams, setRequestParams] = useState([
    `_sort=name&_order=${sortDir}`,
    `name_like=${searchQuery}`,
  ]);

  const { data, slicedData, pageLimit, columns, mutate, error, isLoading } =
    useSWRAdmin(
      router?.query?.tableName ?? "",
      router?.query?.tableName ? `?${requestParams.join("&")}` : "",
      page
    );

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
      prevParams[1] = `name_like=${searchQuery}`;
      return [...prevParams];
    });
  }, [searchQuery]);

  const handleDeleteRow = async (id: string) => {
    try {
      await fetchBaseUrl(`${router.query.tableName}/${id}`, {
        method: "DELETE",
      });

      toast.success(`Successfully deleted.`, {
        position: "top-center",
        autoClose: 3000,
      });

      mutate();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className=" overflow-auto  sm:rounded-sm">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns?.map((column, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 group
                ${column.isSortable && "cursor-pointer"}`}
                onClick={() => {
                  if (column.isSortable) {
                    if (column.name === columnToSort) {
                      setSortDir((prevDir) =>
                        prevDir === "asc" ? "desc" : "asc"
                      );
                    } else {
                      setColumnToSort(column.name);
                    }
                  }
                }}
              >
                <div className={`flex justify-between items-center`}>
                  {column.name}
                  {column.isSortable &&
                    (column.name === columnToSort && sortDir === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-3 h-3 invisible group-hover:visible"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 invisible group-hover:visible"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                        />
                      </svg>
                    ))}
                </div>
              </th>
            ))}
            <th className="px-6 py-3">Action</th>
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
              <td
                className={`flex justify-between items-center h-[100%] px-6 py-4`}
              >
                {/* Actions */}
                <ActionCell
                  handleOpenModal={() => {
                    setIsModalOpen(true);
                    setItemToDelete(dataRow);
                  }}
                  itemId={dataRow?.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {isModalOpen && (
        <AdminModal
          handleDeleteRow={() => handleDeleteRow(itemToDelete.id)}
          closeModal={() => setIsModalOpen(false)}
          itemName={itemToDelete.name}
        />
      )}
    </div>
  );
};

export default TableLayout;
