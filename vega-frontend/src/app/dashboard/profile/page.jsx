"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FileInput from "@/components/ui/FileInput";
import { Save, User } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", phoneNumber: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        updateUser(data);
      } catch (err) {}
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
      setPreview(user.profilePicture || null);
    }
  }, [user]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phoneNumber", form.phoneNumber);
    if (file) fd.append("profilePicture", file);

    try {
      const res = await authService.updateProfile(fd);
      updateUser(res.data);
      setSuccess("Profile updated successfully!");

    } catch (err) {
      setError(err?.response?.data?.message || "Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Profile Image Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 border mb-4">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={40} className="text-gray-300" />
                </div>
              )}
            </div>

            <p className="text-xs font-semibold text-gray-500 mb-3">
              Profile Picture
            </p>

            <FileInput
              value={file}
              onChange={(f) => {
                setFile(f);
                if (f) setPreview(URL.createObjectURL(f));
                else setPreview(user.profilePicture || null);
              }}
            />
          </div>

          {/* Form Card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-sm rounded-xl border border-emerald-200">
                {success}
              </div>
            )}

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <Input label="Email Address" value={form.email} disabled />

              <Input
                label="Phone Number"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />

              <div className="md:col-span-2 flex justify-end pt-4">
                <Button
                  type="submit"
                  loading={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}