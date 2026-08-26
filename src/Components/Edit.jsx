import React, { useRef, useState } from "react";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "/assets/profile.jpg"
  );

  const [formData, setFormData] = useState({
    fullName: "Timilehin Israel Abidoye",
    email: "timilehin@gmail.com",
    phone: "705 085 2180",
    password: "********",
    username: "Timilehin",
    location: "Lagos",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSave = () => {
    console.log("Updated profile:", formData);

    // Change this route to whatever your Home/Dashboard route is
    navigate("/home");
  };

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB]">
      
      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="absolute left-6 top-[70px] h-[816px] w-[380px] overflow-y-auto pb-10 scrollbar-hide">

        <div className="flex w-full flex-col gap-6">

          {/* ================= HEADER ================= */}
          <div className="flex h-6 w-full items-center justify-between">

            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="flex h-6 w-6 items-center justify-center text-[#1F2937]"
              >
                <ArrowLeft size={24} strokeWidth={2} />
              </button>

              <h1 className="font-['Inter'] text-[20px] font-bold leading-6 text-[#1F2937]">
                Edit Profile
              </h1>
            </div>

            <button
              onClick={handleSave}
              className="font-['Arial'] text-[14px] font-bold leading-4 text-[#008000]"
            >
              Save
            </button>
          </div>

          {/* ================= PROFILE PHOTO ================= */}
          <div className="flex w-full flex-col items-center gap-4">

            <div className="relative h-[100px] w-[100px]">

              <img
                src={profileImage}
                alt="Profile"
                className="h-[100px] w-[100px] rounded-full border-[2.4px] border-dashed border-white object-cover"
              />

              {/* Camera button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-[-1px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#008000]"
              >
                <Camera
                  size={14}
                  strokeWidth={2}
                  className="text-white"
                />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            {/* Change photo button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-8 w-[149.67px] items-center justify-center gap-2 rounded-[15px] border-[0.8px] border-[#008000] px-4 py-2"
            >
              <Camera
                size={15}
                strokeWidth={2}
                className="text-[#008000]"
              />

              <span className="font-['Arial'] text-[14px] font-bold leading-4 text-[#008000]">
                Change Photo
              </span>
            </button>
          </div>

          {/* ================= BASIC INFORMATION ================= */}
          <h2 className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#6B7280]">
            BASIC INFORMATION
          </h2>

          {/* ================= FULL NAME ================= */}
          <InputField
            label="Full Name"
            required
            value={formData.fullName}
            name="fullName"
            onChange={handleChange}
            maxLength={50}
            showCheck
          />

          {/* ================= EMAIL ================= */}
          <div className="flex w-full flex-col gap-1">
            <InputField
              label="Email"
              required
              value={formData.email}
              name="email"
              onChange={handleChange}
              maxLength={50}
              showCheck
            />

            <div className="flex w-full items-center justify-between">
              <span className="font-['Inter'] text-[10px] leading-3 text-[#008000]">
                ✓ Verified
              </span>

              <button className="font-['Inter'] text-[12px] leading-[15px] text-[#008000]">
                Change Email
              </button>
            </div>

            <p className="font-['Inter'] text-[12px] leading-[15px] text-[#6B7280]">
              Changing email requires verification
            </p>
          </div>

          {/* ================= PHONE NUMBER ================= */}
          <div className="flex w-full flex-col items-end gap-2">

            <div className="flex w-full flex-col gap-2">

              <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
                Phone Number <span className="text-[#EF4444]">*</span>
              </label>

              <div className="flex h-[49px] w-full items-center gap-3">

                {/* Country code */}
                <div className="flex h-[49px] w-20 items-center justify-center rounded-[15px] border border-[#D1D5DB] bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px]">🇳🇬</span>

                    <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#1F2937]">
                      +234
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="relative flex h-[49px] w-[288px] items-center rounded-[15px] border border-[#D1D5DB] bg-white px-4">

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent font-['Inter'] text-[14px] leading-[17px] text-black outline-none"
                  />

                  <Check
                    size={17}
                    className="absolute right-4 text-[#008000]"
                  />
                </div>
              </div>
            </div>

            <button className="font-['Inter'] text-[12px] leading-[15px] text-[#008000]">
              Change Phone
            </button>
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="flex w-full flex-col items-end gap-2">

            <div className="flex w-full flex-col gap-2">

              <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
                Password <span className="text-[#EF4444]">*</span>
              </label>

              <div className="relative flex h-[49px] w-full items-center rounded-[15px] border border-[#008000] bg-white px-4">

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
                />

                <Check
                  size={17}
                  className="absolute right-4 text-[#008000]"
                />
              </div>
            </div>

            <button className="font-['Inter'] text-[12px] leading-[15px] text-[#008000]">
              Change Password
            </button>
          </div>

          {/* ================= USERNAME ================= */}
          <InputField
            label="Name"
            required
            value={formData.username}
            name="username"
            onChange={handleChange}
            maxLength={50}
            showCheck
          />

          {/* ================= LOCATION ================= */}
          <InputField
            label="City"
            required
            value={formData.location}
            name="location"
            onChange={handleChange}
            maxLength={50}
            showCheck
          />

        </div>
      </div>

      {/* ================= IPHONE HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-1/2 flex h-6 w-[412px] -translate-x-1/2 items-center justify-center">
        <div className="h-1 w-[108px] rounded-xl bg-black" />
      </div>
    </div>
  );
}


/* =========================================================
   REUSABLE INPUT COMPONENT
========================================================= */

function InputField({
  label,
  required,
  value,
  name,
  onChange,
  maxLength = 50,
  showCheck = false,
}) {
  return (
    <div className="flex w-full flex-col gap-2">

      {/* Label + character count */}
      <div className="flex w-full items-center justify-between">

        <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
          {label}

          {required && (
            <span className="ml-1 text-[#EF4444]">*</span>
          )}
        </label>

        <span className="font-['Inter'] text-[11px] font-normal leading-[13px] text-[#6B7280]">
          {value.length}/{maxLength}
        </span>
      </div>

      {/* Input */}
      <div className="relative flex h-[49px] w-full items-center rounded-[15px] border border-[#008000] bg-white px-4">

        <input
          type="text"
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
        />

        {showCheck && (
          <Check
            size={17}
            className="absolute right-4 text-[#008000]"
          />
        )}
      </div>
    </div>
  );
}

export default Edit;