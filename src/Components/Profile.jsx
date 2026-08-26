import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDone = () => {
  const profileData = {
    about,
    photo,
  };

  localStorage.setItem("profile", JSON.stringify(profileData));

  // Get the role selected in Path.jsx
  const userRole = localStorage.getItem("userRole");

  console.log("Profile saved:", profileData);
  console.log("User role:", userRole);

  if (userRole === "provider") {
    navigate("/dashboardprov");
  } else {
    // Seeker is the default
    navigate("/dashboard");
  }
};

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">

      {/* =====================================================
          DEVICE FRAME
          Figma size: 428 × 926
      ====================================================== */}
      <div
        className="
          relative
          h-[926px]
          w-[428px]
          max-w-full
          overflow-hidden
          rounded-[35px]
          bg-white
        "
      >

        {/* =====================================================
            STATUS BAR
        ====================================================== */}
        <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4">

          {/* Time */}
          <div className="flex h-[22px] w-[121px] items-center justify-center pt-[2px]">
            <span className="text-[17px] font-semibold leading-[22px] text-black">
              9:41
            </span>
          </div>

          {/* Network / WiFi / Battery */}
          <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

            {/* Cellular */}
            <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
              <span className="h-[5px] w-[2px] rounded-sm bg-black" />
              <span className="h-[7px] w-[2px] rounded-sm bg-black" />
              <span className="h-[10px] w-[2px] rounded-sm bg-black" />
              <span className="h-[13px] w-[2px] rounded-sm bg-black" />
            </div>

            {/* WiFi */}
            <div className="relative h-[13px] w-[18px]">
              <div className="absolute left-0 top-0 h-[8px] w-[18px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
            </div>

            {/* Battery */}
            <div className="relative h-[13px] w-[27px]">
              <div className="h-[13px] w-[25px] rounded-[4px] border border-black opacity-40" />

              <div className="absolute left-[3px] top-[3px] h-[7px] w-[20px] rounded-[2px] bg-black" />

              <div className="absolute right-[-2px] top-[4px] h-[5px] w-[2px] rounded-r bg-black opacity-40" />
            </div>

          </div>
        </div>


        {/* =====================================================
            HEADER
        ====================================================== */}
        <div
          className="
            absolute
            left-[24px]
            top-[70px]
            flex
            h-[24px]
            w-[257px]
            items-start
            gap-[24px]
          "
        >

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-[24px] w-[24px] shrink-0 items-center justify-center"
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-[#1F2937]"
            />
          </button>

          {/* Title */}
          <div className="flex h-[24px] w-[209px] flex-col gap-2">

            <h1 className="text-[20px] font-bold leading-[24px] text-[#1F2937]">
              Complete Profile
            </h1>

          </div>
        </div>


        {/* =====================================================
            PROFILE PHOTO
        ====================================================== */}
        <div
          className="
            absolute
            left-1/2
            top-[147px]
            h-[120px]
            w-[120px]
            -translate-x-1/2
          "
        >

          {/* Dashed Circle */}
          <div
            className="
              absolute
              inset-0
              overflow-hidden
              rounded-full
              border-[2.4px]
              border-dashed
              border-[#008000]
              bg-[#F0FDF4]
            "
          >

            {/* Uploaded Photo */}
            {photo && (
              <img
                src={photo}
                alt="Profile"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

          </div>


          {/* Add Photo Content */}
          {!photo && (
            <label
              htmlFor="profile-photo"
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-[73px]
                w-[72px]
                -translate-x-1/2
                -translate-y-1/2
                cursor-pointer
                flex-col
                items-center
                gap-[8px]
              "
            >

              {/* Camera Icon */}
              <div className="flex h-[48px] w-[48px] items-center justify-center">
                <Camera
                  size={48}
                  strokeWidth={1.8}
                  className="text-[#008000]"
                />
              </div>

              <span
                className="
                  w-[72px]
                  text-center
                  text-[14px]
                  font-bold
                  italic
                  leading-[17px]
                  text-[#008000]
                "
              >
                Add Photo
              </span>

            </label>
          )}

          {/* Hidden File Input */}
          <input
            id="profile-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

        </div>


        {/* =====================================================
            PHOTO DESCRIPTION
        ====================================================== */}
        <p
          className="
            absolute
            left-1/2
            top-[283px]
            w-[232px]
            -translate-x-1/2
            text-center
            text-[12px]
            font-normal
            leading-[15px]
            text-[#6B7280]
          "
        >
          Optional - Helps providers recognize you
        </p>


        {/* =====================================================
            ABOUT YOU LABEL
        ====================================================== */}
        <div
          className="
            absolute
            left-[24px]
            top-[357px]
            flex
            h-[17px]
            w-[133px]
            items-center
            gap-[4px]
          "
        >

          <span
            className="
              text-[14px]
              font-bold
              italic
              leading-[17px]
              text-[#374151]
            "
          >
            About You
          </span>

          <span
            className="
              text-[12px]
              font-normal
              leading-[15px]
              text-[#9CA3AF]
            "
          >
            (Optional)
          </span>

        </div>


        {/* =====================================================
            ABOUT YOU INPUT
        ====================================================== */}
        <div
          className="
            absolute
            left-1/2
            top-[378px]
            h-[160px]
            w-[380px]
            -translate-x-1/2
          "
        >

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value.slice(0, 200))}
            placeholder="Tell providers a little about yourself..."
            maxLength={200}
            className="
              box-border
              h-full
              w-full
              resize-none
              rounded-[15px]
              border-[1.6px]
              border-[#E5E7EB]
              bg-white
              px-4
              py-4
              text-[14px]
              font-normal
              leading-[20px]
              text-[#1F2937]
              outline-none
              placeholder:text-[#9CA3AF]
              focus:border-[#008000]
            "
          />

          {/* Character Counter */}
          <span
            className="
              absolute
              bottom-[12px]
              right-[16px]
              text-[12px]
              font-normal
              leading-[15px]
              text-[#9CA3AF]
            "
          >
            {about.length} / 200
          </span>

        </div>


        {/* =====================================================
            DONE BUTTON
        ====================================================== */}
        <div
          className="
            absolute
            bottom-[65px]
            left-[24px]
            h-[52px]
            w-[380px]
          "
        >

          <button
            type="button"
            onClick={handleDone}
            className="
              box-border
              flex
              h-[52px]
              w-[380px]
              items-center
              justify-center
              rounded-[99px]
              border-2
              border-[#008000]
              bg-[#008000]
              px-[10px]
              py-[12px]
              text-[14px]
              font-semibold
              leading-[28px]
              text-white
              transition
              hover:bg-[#006B00]
              active:scale-[0.98]
            "
          >
            Done
          </button>

        </div>


        {/* =====================================================
            HOME INDICATOR
        ====================================================== */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-[24px]
            w-[412px]
            -translate-x-1/2
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[4px]
              w-[108px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[12px]
              bg-[#1F2937]
            "
          />
        </div>

      </div>
    </div>
  );
}

export default Profile;