import React, { useEffect, useState } from "react";
import TableLayout from "../layout/TableLayout";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import Link from "next/link";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";

const Table = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce<string>(searchQuery, 300);

  useEffect(() => {
    setSearchQuery("");
  }, [router.query.tableName]);

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex justify-between mb-[10px]">
          <div>
            <SearchInput
              value={searchQuery}
              placeholder={`Search ${router.query.tableName ?? ""}...`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href={`${router.query.tableName}/add`}>
            <Button>Add New</Button>
          </Link>
        </div>

        <TableLayout searchQuery={debouncedValue} />
      </div>
    </AdminLayout>
  );
};

export default Table;
