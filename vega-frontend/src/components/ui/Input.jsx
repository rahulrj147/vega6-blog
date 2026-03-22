"use client";
import React from "react";

const Input = ({ label, error, multiline, className, ...props }) => {
  const base = "w-full px-4 py-3 border border-gray-100 rounded-xl text-sm bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm";
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-bold text-gray-700 ml-0.5">{label}</label>}
      <Tag className={`${base} ${multiline ? "resize-none h-32" : ""} ${className}`} {...props} />
      {error && <span className="text-xs text-red-500 ml-0.5 font-medium">{error}</span>}
    </div>
  );
};

export default Input;
