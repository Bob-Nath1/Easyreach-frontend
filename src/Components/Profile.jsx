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
    w-full
    sm:w-[640px]
    md:w-[768px]
    lg:w-[1024px]
    xl:w-[1280px]
    2xl:w-[1536px]
    h-[926px]
    md:h-[1026px]
    lg:h-[1200px]
    xl:h-[1200px]
    2xl:h-[1200px]
    overflow-hidden
    rounded-[35px]
    bg-white
    mx-auto
  "
>

{/* =====================================================
    HEADER
===================================================== */}
<div
  className="
    absolute
    left-0
    top-[70px]
    h-[24px]
    w-full
  "
>
  {/* Back Button */}
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="
      absolute
      left-[24px]
      top-0
      flex
      h-[24px]
      w-[24px]
      items-center
      justify-center
    "
  >
    <ArrowLeft
      size={24}
      strokeWidth={2}
      className="text-[#1F2937]"
    />
  </button>

  {/* Centered Title */}
  <h1
    className="
      absolute
      left-1/2
      top-0
      -translate-x-1/2
      whitespace-nowrap
      text-[20px]
      font-bold
      leading-[24px]
      text-[#1F2937]
    "
  >
    Complete Profile
  </h1>
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
===================================================== */}
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
    w-[calc(100%-48px)]
    sm:w-[592px]
    md:w-[720px]
    lg:w-[976px]
    xl:w-[1232px]
    2xl:w-[1488px]
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
    left-1/2
    h-[52px]
    w-[calc(100%-48px)]
    sm:w-[592px]
    md:w-[720px]
    lg:w-[976px]
    xl:w-[1232px]
    2xl:w-[1488px]
    -translate-x-1/2
  "
>

          <button
  type="button"
  onClick={handleDone}
  className="
    box-border
    flex
    h-[52px]
    w-full
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