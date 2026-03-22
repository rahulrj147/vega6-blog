"use client";
import React from "react";
import Button from "./Button";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading, title = "Delete Blog", message = "Are you sure you want to delete this blog? This action cannot be undone." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto">
          <AlertTriangle size={28} />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h2>
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={onConfirm} 
            loading={loading}
            className="w-full !bg-red-500 hover:!bg-red-600 !text-white !py-3 !rounded-2xl font-bold shadow-lg shadow-red-100 flex items-center justify-center gap-2"
          >
            <Trash2 size={18} /> Delete Permanently
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={loading}
            className="w-full !py-3 !rounded-2xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-gray-100"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
