"use client";
import React, { useRef, useState } from "react";
import { Upload, X, FileCheck } from "lucide-react";

const FileInput = ({ label, onChange, value, maxSizeMB = 5, accept = "image/*", className, initialPreview }) => {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Limit ${maxSizeMB}MB`);
        if (onChange) onChange(null);
        setPreview(null);
        e.target.value = "";
      } else {
        setError("");
        if (onChange) onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setError("");
    setPreview(null);
    if (onChange) onChange(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const showImage = preview || initialPreview;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[13px] font-bold text-gray-700 ml-0.5">{label}</label>}
      
      <div 
        onClick={() => fileRef.current?.click()}
        className={`relative cursor-pointer border border-gray-100 rounded-xl p-3 transition-all flex items-center gap-3
          ${value || initialPreview ? "bg-indigo-50/50 border-indigo-100" : "bg-white hover:bg-gray-50 hover:border-gray-200 shadow-sm"}`}
      >
        <input type="file" ref={fileRef} onChange={handleFileChange} accept={accept} className="hidden" />

        {value || (initialPreview && !preview) ? (
          <>
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white shadow-sm flex-shrink-0 bg-white">
              <img src={showImage} className="w-full h-full object-cover" alt="preview" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-gray-900 truncate">{value ? value.name : "Current Image"}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{value ? (value.size / (1024 * 1024)).toFixed(1) + " MB" : "Existing"}</p>
            </div>
            {value && (
              <button onClick={handleClear} className="p-1.5 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-lg transition-colors">
                <X size={14} />
              </button>
            )}
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Upload size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700">Choose file</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Max {maxSizeMB}MB</p>
            </div>
          </>
        )}
      </div>

      {error && <span className="text-[10px] text-red-500 ml-1 font-bold">{error}</span>}
    </div>
  );
};


export default FileInput;
