import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

type Props = {
  previous: () => void;
  next: () => void;
  currentPage: number;
  totalPages: number;
};

const PageSelector = ({ previous, next, currentPage, totalPages }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        disabled={currentPage === 0}
        onClick={previous}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="text-slate-700">
        {currentPage + 1} of {totalPages}
      </span>
      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        disabled={currentPage === totalPages - 1}
        onClick={next}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default PageSelector;
