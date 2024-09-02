"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/src/components/ui/pagination";
import { Button } from "@/src/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  options: {
    offset: number;
    limit: number;
    total: number;
  };
}

const PaginationControl = ({ currentPage, options }: PaginationProps) => {
  const totalPages = Math.ceil(options.total / options.limit);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage > 1) {
      params.set("page", (currentPage - 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage < totalPages) {
      params.set("page", (currentPage + 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationControl;
