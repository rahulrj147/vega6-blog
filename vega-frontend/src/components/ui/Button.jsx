"use client";
import React from "react";

const Button = ({ children, className, variant = "primary", loading, disabled, ...props }) => {
  const base = "px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 flex items-center justify-center transition active:scale-95 shadow-sm border border-transparent";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100",
    outline: "border-gray-100 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading || disabled} {...props}>

      {loading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> : null}
      {children}
    </button>
  );
};

export default Button;
