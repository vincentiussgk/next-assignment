import { fetcher } from "@/lib/fetcher";
import { IUser } from "@/types/dataTypes";
import { getUserId } from "@/utils/cookieHandler";
import { useEffect, useState } from "react";
import useSWR from "swr";

function useBalance() {
  const cookieUserId = getUserId();

  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (cookieUserId) {
      setUserId(cookieUserId);
    }
  }, [cookieUserId]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser>(
    `users/${userId}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );
  return {
    currentUser: data,
    isLoading,
    error,
    isValidating,
    refetchBalance: mutate,
  };
}
export default useBalance;
