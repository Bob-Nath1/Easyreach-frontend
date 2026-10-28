import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, Camera, Check, ChevronDown, } from "lucide-react";
import { useNavigate } from "react-router-dom";

const occupationCatalogue = {
  "Home Cleaning & Domestic Services": [
    "House Cleaner",
    "Deep Cleaning Specialist",
    "Laundry Attendant",
    "Ironing Service Provider",
    "Housekeeper",
    "Other",
  ],
  "Plumbing & Water Services": [
    "Plumber",
    "Plumbing Technician",
    "Pipe Fitter",
    "Water Pump Technician",
    "Drainage Technician",
    "Other",
  ],
  "Electrical & Power Services": [
    "Electrician",
    "Electrical Technician",
    "Generator Technician",
    "Inverter Technician",
    "Solar Installation Technician",
    "Other",
  ],
  "Construction & Building Services": [
    "Builder",
    "Mason",
    "Bricklayer",
    "Construction Worker",
    "Site Supervisor",
    "Other",
  ],
  "Painting & Wall Decoration": [
    "House Painter",
    "Spray Painter",
    "Wall Decorator",
    "Wallpaper Installer",
    "Other",
  ],
  "Carpentry, Furniture & Interior Design": [
    "Carpenter",
    "Furniture Maker",
    "Furniture Repairer",
    "Interior Designer",
    "Cabinet Maker",
    "Other",
  ],
  "Automobile & Vehicle Repair": [
    "Auto Mechanic",
    "Auto Electrician",
    "Motorcycle Mechanic",
    "Car Diagnostic Technician",
    "Other",
  ],
  "Transport, Delivery & Moving": [
    "Driver",
    "Delivery Rider",
    "Courier",
    "Moving Service Provider",
    "Other",
  ],
  "Beauty, Hair & Grooming": [
    "Hairdresser",
    "Barber",
    "Makeup Artist",
    "Nail Technician",
    "Lash Technician",
    "Other",
  ],
  "Fashion, Tailoring & Clothing": [
    "Tailor",
    "Fashion Designer",
    "Clothing Alteration Specialist",
    "Shoe Maker",
    "Other",
  ],
  "Healthcare & Medical Services": [
    "Nurse",
    "Physiotherapist",
    "Care Assistant",
    "Medical Laboratory Technician",
    "Other",
  ],
  "Education, Tutoring & Training": [
    "Private Tutor",
    "Language Teacher",
    "Music Teacher",
    "Computer Instructor",
    "Other",
  ],
  "Information Technology & Software": [
    "Web Developer",
    "Mobile App Developer",
    "Software Engineer",
    "IT Support Technician",
    "Computer Repair Technician",
    "Network Technician",
    "Other",
  ],
  "Graphic Design & Creative Services": [
    "Graphic Designer",
    "UI/UX Designer",
    "Photographer",
    "Video Editor",
    "Illustrator",
    "Other",
  ],
  "Catering, Cooking & Food Services": [
    "Chef",
    "Caterer",
    "Baker",
    "Pastry Chef",
    "Food Vendor",
    "Other",
  ],
  "Agriculture, Farming & Gardening": [
    "Farmer",
    "Gardener",
    "Landscaper",
    "Irrigation Technician",
    "Other",
  ],
  "Security & Safety Services": [
    "Security Guard",
    "Security Systems Installer",
    "CCTV Technician",
    "Safety Officer",
    "Other",
  ],
  "Property & Real Estate": [
    "Real Estate Agent",
    "Property Manager",
    "Property Inspector",
    "Other",
  ],
  "Repairs, Installation & Equipment Rental": [
    "Appliance Repair Technician",
    "Washing Machine Repairer",
    "Refrigerator Repairer",
    "Equipment Installer",
    "Equipment Rental Provider",
    "Other",
  ],
};


function Edit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "/assets/profile.jpg"
  );
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  username: "",
  location: "Lagos",
  serviceCategory: "",
  occupation: "",
});

const [occupationSearch, setOccupationSearch] = useState("");
const [selectedOccupation, setSelectedOccupation] = useState("");
const [customOccupation, setCustomOccupation] = useState("");
const [showOccupationOptions, setShowOccupationOptions] = useState(false);

const occupations = formData.serviceCategory
  ? occupationCatalogue[formData.serviceCategory] || []
  : [];

const filteredOccupations = occupations.filter((occupation) =>
  occupation.toLowerCase().includes(
    occupationSearch.trim().toLowerCase()
  )
);

const isCustomOccupation = selectedOccupation === "Other";

const [loadingUser, setLoadingUser] = useState(true);
const [saving, setSaving] = useState(false);
const [userRole, setUserRole] = useState("");

const [providerProfile, setProviderProfile] = useState({
  businessName: "",
  businessDescription: "",
  yearsExperience: "",
  selectedCategories: [],
  businessLocation: "",
  latitude: "",
  longitude: "",
});

const [loadingProviderProfile, setLoadingProviderProfile] =
  useState(true);

const [showChangePassword, setShowChangePassword] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");
const [changingPassword, setChangingPassword] = useState(false);

useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Unable to load profile."
        );
        return;
      }

     setFormData((prev) => ({
  ...prev,
  fullName: data.user.fullName || "",
  email: data.user.email || "",
  phone: data.user.phone || "",
  username: data.user.username || "",
  location: data.user.city || "Lagos",
  serviceCategory: data.user.serviceCategory || "",
    occupation: data.user.occupation || "",
}));

setUserRole(data.user.role || "seeker");

const savedOccupation = data.user.occupation || "";

setOccupationSearch(savedOccupation);
setSelectedOccupation(
  occupationCatalogue[data.user.serviceCategory]?.includes(
    savedOccupation
  )
    ? savedOccupation
    : savedOccupation
      ? "Other"
      : ""
);
setCustomOccupation(
  occupationCatalogue[data.user.serviceCategory]?.includes(
    savedOccupation
  )
    ? ""
    : savedOccupation
);

if (data.user.profileImage) {
  setProfileImage(data.user.profileImage);
}

if (data.user.role === "provider") {
  const providerResponse = await fetch(
    "http://localhost:5000/api/users/provider-profile",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const providerData = await providerResponse.json();

  if (!providerResponse.ok) {
    throw new Error(
      providerData.message ||
        "Failed to load provider profile."
    );
  }

  const profile = providerData.profile || {};
  const providerUser = providerData.user || {};
  const serviceArea = profile.serviceArea;

  setProviderProfile({
    businessName: profile.businessName || "",
    businessDescription: profile.about || "",
    yearsExperience:
      profile.yearsOfExperience ?? "",
    selectedCategories: Array.isArray(profile.services)
      ? profile.services
      : [],
    businessLocation:
      typeof serviceArea === "string"
        ? serviceArea
        : serviceArea?.address ||
          providerUser.realAddress ||
          "",
    latitude:
      serviceArea?.latitude ??
      providerUser.latitude ??
      "",
    longitude:
      serviceArea?.longitude ??
      providerUser.longitude ??
      "",
  });
}
    } catch (error) {
      console.error(
        "Profile fetch error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    } finally {
  setLoadingUser(false);
  setLoadingProviderProfile(false);
}
  };

  fetchUserProfile();
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProviderChange = (e) => {
  const { name, value } = e.target;

  setProviderProfile((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleProviderArrayChange = (field, value) => {
  setProviderProfile((prev) => ({
    ...prev,
    [field]: value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  }));
};

const handleWorkingHoursChange = (day, value) => {
  setProviderProfile((prev) => ({
    ...prev,
    workingHours: {
      ...prev.workingHours,
      [day]: value,
    },
  }));
};

 const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setProfileImage(imageUrl);

  handleProfileImageUpload(file);

  console.log("=== PROFILE IMAGE UPLOAD START ===");
console.log("Selected file:", file);
console.log("File name:", file?.name);
console.log("File type:", file?.type);
console.log("File size:", file?.size);
};

  const handleProfileImageUpload = async (file) => {
  if (!file) {
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin", { replace: true });
    return;
  }

  try {
    const formData = new FormData();

    formData.append("profileImage", file);

    console.log("Sending image to:", "http://localhost:5000/api/users/profile/image");

    const response = await fetch(
      "http://localhost:5000/api/users/profile/image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    
     console.log("Upload HTTP status:", response.status);
  console.log("Upload response:", data);
  console.log(
    "Returned profileImage:",
    data?.user?.profileImage
  );
  console.log("=== PROFILE IMAGE UPLOAD END ===");

    if (!response.ok) {
      alert(
        data.message ||
          "Unable to upload profile image."
      );
      return;
    }

    setProfileImage(data.user.profileImage);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert("Profile image updated successfully.");
  } catch (error) {
    console.error(
      "Profile image upload error:",
      error
    );

    alert(
      "Unable to upload profile image. Please try again."
    );
  }
};

  const handleSave = async () => {
  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone
  ) {
    alert(
      "Full name, email and phone are required."
    );

    
    return;
  }

  if (
  userRole === "provider" &&
  (!formData.serviceCategory || !formData.occupation.trim())
) {
  alert("Please select your service category and occupation.");
  return;
}

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin", { replace: true });
    return;
  }

  try {
    setSaving(true);

    const response = await fetch(
      "http://localhost:5000/api/users/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
   body: JSON.stringify({
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  username: formData.username,
  city: formData.location,
  serviceCategory: formData.serviceCategory,
  occupation: formData.occupation.trim(),
}),
      }
    );

    const data = await response.json();

    if (!response.ok) {
  alert(
    data.message ||
      "Unable to update profile."
  );
  return;
}

// Keep the latest user information locally
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

if (userRole === "provider") {
  const description = providerProfile.businessDescription.trim();

  if (description.length < 20 || description.length > 500) {
    alert(
      "Business description must be between 20 and 500 characters."
    );
    return;
  }

  const providerFormData = new FormData();

  providerFormData.append(
    "businessName",
    providerProfile.businessName.trim()
  );

  providerFormData.append(
    "selectedCategories",
    JSON.stringify(providerProfile.selectedCategories)
  );

  providerFormData.append(
    "businessLocation",
    providerProfile.businessLocation.trim()
  );

  providerFormData.append(
    "businessDescription",
    description
  );

  providerFormData.append(
    "yearsExperience",
    providerProfile.yearsExperience ?? ""
  );

  providerFormData.append(
    "latitude",
    providerProfile.latitude ?? ""
  );

  providerFormData.append(
    "longitude",
    providerProfile.longitude ?? ""
  );

  const providerResponse = await fetch(
    "http://localhost:5000/api/users/provider-profile",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: providerFormData,
    }
  );

  const providerData = await providerResponse.json();

  if (!providerResponse.ok) {
    alert(
      providerData.message ||
        "Your account was updated, but your business profile could not be saved."
    );
    return;
  }

  setProviderProfile((prev) => ({
    ...prev,
    businessName:
      providerData.profile?.businessName ??
      prev.businessName,
    businessDescription:
      providerData.profile?.about ??
      prev.businessDescription,
    yearsExperience:
      providerData.profile?.yearsOfExperience ??
      prev.yearsExperience,
    selectedCategories:
      providerData.profile?.services ??
      prev.selectedCategories,
  }));
}


alert("Profile updated successfully.");

navigate("/realprofile");
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    alert(
      "Unable to connect to the server. Please try again."
    );
  } finally {
    setSaving(false);
  }
};

const handleChangePassword = async () => {
  if (
    !currentPassword ||
    !newPassword ||
    !confirmNewPassword
  ) {
    alert("Please fill in all password fields.");
    return;
  }

  if (newPassword !== confirmNewPassword) {
    alert("New passwords do not match.");
    return;
  }

  if (newPassword.length < 6) {
    alert("New password must be at least 6 characters.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin", { replace: true });
    return;
  }

  try {
    setChangingPassword(true);

    const response = await fetch(
      "http://localhost:5000/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.message ||
          "Unable to change password."
      );
      return;
    }

    alert("Password changed successfully.");

    // Clear password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    // Hide password-change fields
    setShowChangePassword(false);
  } catch (error) {
    console.error(
      "Change password error:",
      error
    );

    alert(
      "Unable to connect to the server. Please try again."
    );
  } finally {
    setChangingPassword(false);
  }
};

const workingDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

  return (
    <div
  className="
    relative
    mx-auto
    h-[926px]
    w-full
    sm:w-[640px]
    md:w-[768px]
    lg:w-[1024px]
    xl:w-[1280px]
    2xl:w-[1536px]
    md:h-[1026px]
    lg:h-[1200px]
    xl:h-[1200px]
    2xl:h-[1200px]
    overflow-hidden
    rounded-[35px]
    bg-[#F9FAFB]
  "
>
      
      {/* ================= SCROLLABLE CONTENT ================= */}
    <div
  className="
    absolute
    left-6
    right-6
    top-[70px]
    bottom-[24px]
    overflow-y-auto
    overflow-x-hidden
    pb-10
    scrollbar-hide
  "
>

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
  disabled={saving || loadingUser}
  className="font-['Arial'] text-[14px] font-bold leading-4 text-[#008000] disabled:opacity-50"
>
  {saving ? "Saving..." : "Save"}
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


     

{/* ================= PROVIDER INFORMATION ================= */}
{userRole === "provider" && (
  <>
    <h2 className="mt-2 font-['Inter'] text-[14px] font-bold leading-[17px] text-[#6B7280]">
      BUSINESS INFORMATION
    </h2>

    {/* Business Name */}
    <InputField
      label="Business Name"
      required
      value={providerProfile.businessName}
      name="businessName"
      onChange={handleProviderChange}
      maxLength={100}
    />

    
    {/* Business Location */}
    <div className="flex w-full flex-col gap-2">
      <label className="font-['Inter'] text-[14px] font-bold text-[#1F2937]">
        Business Location
      </label>

      <input
        type="text"
        name="businessLocation"
        value={providerProfile.businessLocation}
        onChange={handleProviderChange}
        maxLength={200}
        className="h-[49px] w-full rounded-[15px] border border-[#D1D5DB] bg-white px-4 text-[14px] text-black outline-none focus:border-[#008000]"
        placeholder="Enter your business location"
      />
    </div>

    {/* Business Description */}
    <div className="flex w-full flex-col gap-2">
      <label className="font-['Inter'] text-[14px] font-bold text-[#1F2937]">
        Business Description
      </label>

      <textarea
        name="businessDescription"
        value={providerProfile.businessDescription}
        onChange={handleProviderChange}
        minLength={20}
        maxLength={500}
        rows={5}
        className="w-full resize-none rounded-[15px] border border-[#D1D5DB] bg-white p-4 text-[14px] text-black outline-none focus:border-[#008000]"
        placeholder="Describe your business and the services you offer."
      />

      <p className="text-[11px] text-[#6B7280]">
        Between 20 and 500 characters.
        {" "}
        {providerProfile.businessDescription.length}/500
      </p>
    </div>

    {/* Years of Experience */}
    <InputField
      label="Years of Experience"
      value={String(providerProfile.yearsExperience)}
      name="yearsExperience"
      onChange={handleProviderChange}
      maxLength={3}
    />

    
{/* Service Category */}
<div className="flex w-full flex-col gap-2">
  <label
    htmlFor="serviceCategory"
    className="font-['Inter'] text-[14px] font-bold text-[#1F2937]"
  >
    Service Category
  </label>

  <div className="relative">
    <select
      id="serviceCategory"
      value={formData.serviceCategory}
      onChange={(e) => {
        const category = e.target.value;

        setFormData((prev) => ({
          ...prev,
          serviceCategory: category,
          occupation: "",
        }));

        setOccupationSearch("");
        setSelectedOccupation("");
        setCustomOccupation("");
        setShowOccupationOptions(false);
      }}
      className="h-[49px] w-full appearance-none rounded-[15px] border border-[#D1D5DB] bg-white px-4 pr-10 text-[14px] text-gray-700 outline-none focus:border-[#008000]"
    >
      <option value="">Select your service category</option>

      {Object.keys(occupationCatalogue).map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
    />
  </div>
</div>

{/* Occupation */}
<div className="flex w-full flex-col gap-2">
  <label
    htmlFor="occupationSearch"
    className="font-['Inter'] text-[14px] font-bold text-[#1F2937]"
  >
    Occupation
  </label>

  <div className="relative">
    <input
      id="occupationSearch"
      type="text"
      value={occupationSearch}
      onChange={(e) => {
        setOccupationSearch(e.target.value);
        setSelectedOccupation("");
        setFormData((prev) => ({
          ...prev,
          occupation: "",
        }));
        setCustomOccupation("");
        setShowOccupationOptions(true);
      }}
      onFocus={() => setShowOccupationOptions(true)}
      onBlur={() => {
        setTimeout(() => setShowOccupationOptions(false), 150);
      }}
      disabled={!formData.serviceCategory}
      placeholder={
        formData.serviceCategory
          ? "Search your occupation"
          : "Select a category first"
      }
      autoComplete="off"
      className="h-[49px] w-full rounded-[15px] border border-[#D1D5DB] bg-white px-4 pr-10 text-[14px] text-gray-700 outline-none focus:border-[#008000] disabled:bg-gray-50"
    />

    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
    />

    {showOccupationOptions && formData.serviceCategory && (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[190px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
        {filteredOccupations
          .filter((occupation) => occupation !== "Other")
          .map((occupation) => (
            <button
              key={occupation}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSelectedOccupation(occupation);
                setOccupationSearch(occupation);
                setCustomOccupation("");

                setFormData((prev) => ({
                  ...prev,
                  occupation,
                }));

                setShowOccupationOptions(false);
              }}
              className="block w-full px-4 py-3 text-left text-[13px] text-gray-700 hover:bg-green-50"
            >
              {occupation}
            </button>
          ))}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setSelectedOccupation("Other");
            setFormData((prev) => ({
              ...prev,
              occupation: "",
            }));
            setCustomOccupation(
              occupationSearch.trim() === "Other"
                ? ""
                : occupationSearch.trim()
            );
            setOccupationSearch("");
            setShowOccupationOptions(false);
          }}
          className="block w-full border-t border-gray-100 px-4 py-3 text-left text-[13px] font-semibold text-[#008000] hover:bg-green-50"
        >
          + Enter my own occupation
        </button>
      </div>
    )}
  </div>

  {isCustomOccupation && (
    <input
      type="text"
      value={customOccupation}
      onChange={(e) => {
        const occupation = e.target.value;

        setCustomOccupation(occupation);
        setFormData((prev) => ({
          ...prev,
          occupation,
        }));
      }}
      maxLength={100}
      placeholder="Enter your occupation"
      className="h-[49px] w-full rounded-[15px] border border-[#D1D5DB] bg-white px-4 text-[14px] text-gray-700 outline-none focus:border-[#008000]"
    />
  )}
</div>
  </>
)}





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
                <div className="relative flex h-[49px] min-w-0 flex-1 items-center rounded-[15px] border border-[#D1D5DB] bg-white px-4">
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
        value="••••••••"
        readOnly
        className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
      />

      <Check
        size={17}
        className="absolute right-4 text-[#008000]"
      />

    </div>
  </div>

  {!showChangePassword && (
    <button
      type="button"
      onClick={() => setShowChangePassword(true)}
      className="font-['Inter'] text-[12px] leading-[15px] text-[#008000]"
    >
      Change Password
    </button>
  )}

</div>


{/* ================= CHANGE PASSWORD ================= */}

{showChangePassword && (
  <div className="flex w-full flex-col gap-4">

    {/* Current Password */}
    <div className="flex w-full flex-col gap-2">

      <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
        Current Password
      </label>

      <div className="flex h-[49px] w-full items-center rounded-[15px] border border-[#D1D5DB] bg-white px-4">

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
        />

      </div>
    </div>


    {/* New Password */}
    <div className="flex w-full flex-col gap-2">

      <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
        New Password
      </label>

      <div className="flex h-[49px] w-full items-center rounded-[15px] border border-[#D1D5DB] bg-white px-4">

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
        />

      </div>
    </div>


    {/* Confirm New Password */}
    <div className="flex w-full flex-col gap-2">

      <label className="font-['Inter'] text-[14px] font-bold leading-[17px] text-[#1F2937]">
        Confirm New Password
      </label>

      <div className="flex h-[49px] w-full items-center rounded-[15px] border border-[#D1D5DB] bg-white px-4">

        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) =>
            setConfirmNewPassword(e.target.value)
          }
          className="w-full bg-transparent font-['Inter'] text-[14px] font-medium leading-[17px] text-black outline-none"
        />

      </div>
    </div>


    {/* Update Password Button */}
    <button
      type="button"
      onClick={handleChangePassword}
      disabled={changingPassword}
      className="flex h-[49px] w-full items-center justify-center rounded-[15px] bg-[#008000] font-['Inter'] text-[14px] font-bold text-white disabled:opacity-50"
    >
      {changingPassword
        ? "Updating Password..."
        : "Update Password"}
    </button>

  </div>
)}


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
    <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-[#F9FAFB]">
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