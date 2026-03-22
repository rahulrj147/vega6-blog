"use client";
import React from "react";
import Button from "./Button";

// Reusable pagination component for Vega6
export default function Pagination({
  pagination,
  onPageChange,
  className = "",
  small = false
}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { totalPages, currentPage } = pagination;
  const btnClass = small ? "!px-2.5 !py-1 !text-[10px] !rounded-lg" : "!rounded-xl !px-4 !py-2 text-sm";
  const numClass = small ? "w-7 h-7 !text-[10px] !rounded-lg" : "w-9 h-9 !rounded-xl text-sm";

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${btnClass} font-semibold border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm`}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1.5 mx-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${numClass} font-bold transition-all duration-300 transform active:scale-90 ${isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 ring-2 ring-indigo-50"
                  : "text-gray-400 hover:bg-gray-50 hover:text-indigo-600 border border-transparent hover:border-gray-100"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${btnClass} font-semibold border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm`}
      >
        Next
      </Button>
    </div>
  );
}
