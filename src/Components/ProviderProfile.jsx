import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  UserRound,
  Building2,
  BriefcaseBusiness,
  MapPin,
  Navigation,
  FileBadge,
  Upload,
  ImagePlus,
  Lightbulb,
  CheckCircle2,
  X,
  Plus,
  Minus,
  ChevronDown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SERVICE_CATEGORIES = [
  "AC Repair",
  "Plumbing",
  "Electrical Services",
  "Cleaning",
  "Painting",
  "Carpentry",
  "Automobile Repair",
  "Catering",
  "Laundry",
  "Beauty Services",
  "Photography",
  "Other Services",
];

function ProviderProfile() {
  const navigate = useNavigate();
  const routeLocation = useLocation();

  const profilePhotoRef = useRef(null);
  const certificateRef = useRef(null);
  const portfolioRef = useRef(null);

const [businessName, setBusinessName] = useState("");
const [selectedCategories, setSelectedCategories] = useState([]);
const [signupServiceCategory, setSignupServiceCategory] = useState("");
const [occupation, setOccupation] = useState("");
  const [businessLocation, setBusinessLocation] = useState(
    routeLocation.state?.location?.displayName || ""
  );
  const [businessDescription, setBusinessDescription] = useState("");
  const [yearsExperience, setYearsExperience] = useState(0);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [portfolioPhotos, setPortfolioPhotos] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showCategories, setShowCategories] = useState(false);

  const [gpsLoading, setGpsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const [categorySearch, setCategorySearch] = useState("");

  const availableCategories = [
  ...new Set([
    ...SERVICE_CATEGORIES,
    ...(signupServiceCategory ? [signupServiceCategory] : []),
    ...selectedCategories,
  ]),
];

const filteredCategories = availableCategories.filter((category) =>
  category.toLowerCase().includes(categorySearch.toLowerCase())
);

useEffect(() => {
  let cancelled = false;

  const loadProviderProfile = async () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const savedDraft = JSON.parse(
        localStorage.getItem("providerProfileDraft") || "{}"
      );

      // Load the saved profile draft first so the form can
      // retain locally saved edits if the request fails.
      if (!cancelled) {
        setBusinessName(
          savedDraft.businessName ||
            savedUser.businessName ||
            ""
        );

        setBusinessLocation(
          savedDraft.businessLocation ||
            routeLocation.state?.location?.displayName ||
            savedUser.realAddress ||
            ""
        );

        setBusinessDescription(
          savedDraft.businessDescription || ""
        );

        setYearsExperience(
          Number(savedDraft.yearsExperience || 0)
        );

        if (
          savedDraft.latitude != null &&
          savedDraft.longitude != null
        ) {
          setCoordinates({
            latitude: savedDraft.latitude,
            longitude: savedDraft.longitude,
          });
        }
      }

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to load your provider profile.");
      }

      const response = await fetch(
        "http://localhost:5000/api/users/provider-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load your provider profile."
        );
      }

      if (cancelled) return;

      const user = data.user || {};
      const profile = data.profile || {};

      // Keep the latest account details in localStorage.
      localStorage.setItem("user", JSON.stringify({
        ...savedUser,
        ...user,
      }));

      // These values come from SignUpPro and the users table.
      setSignupServiceCategory(user.serviceCategory || "");
      setOccupation(user.occupation || "");

      // Prefer saved profile categories, then the local draft,
      // then the category selected during signup.
      let savedCategories = [];

      if (Array.isArray(profile.services)) {
        savedCategories = profile.services;
      } else if (Array.isArray(savedDraft.selectedCategories)) {
        savedCategories = savedDraft.selectedCategories;
      }

      setSelectedCategories(
        savedCategories.length > 0
          ? savedCategories
          : user.serviceCategory
            ? [user.serviceCategory]
            : []
      );

      setBusinessName(
        profile.businessName ||
          savedDraft.businessName ||
          user.businessName ||
          ""
      );

      setBusinessLocation(
        profile.serviceArea ||
          savedDraft.businessLocation ||
          routeLocation.state?.location?.displayName ||
          user.realAddress ||
          ""
      );

      setBusinessDescription(
        profile.about ||
          savedDraft.businessDescription ||
          ""
      );

      setYearsExperience(
        Number(
          profile.yearsOfExperience ??
            savedDraft.yearsExperience ??
            0
        )
      );

      if (user.latitude != null && user.longitude != null) {
        setCoordinates({
          latitude: Number(user.latitude),
          longitude: Number(user.longitude),
        });
      }
    } catch (err) {
      if (!cancelled) {
        console.error("Unable to load provider profile:", err);
        setError(err.message || "Unable to load your profile.");
      }
    }
  };

  loadProviderProfile();

  return () => {
    cancelled = true;
  };
}, [routeLocation.state]);

  const toggleCategory = (category) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );

    setError("");
  };

  const handleProfilePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image for your profile photo.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your profile photo must be 5 MB or smaller.");
      return;
    }

    setProfilePhoto({
      file,
      preview: URL.createObjectURL(file),
    });

    setError("");
  };

  const handleCertificate = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Upload a PDF, JPG, PNG, or WebP certificate.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Your certificate must be 10 MB or smaller.");
      return;
    }

    setCertificate(file);
    setError("");
  };

  const handlePortfolioPhotos = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    if (portfolioPhotos.length + files.length > 6) {
      setError("You can upload a maximum of 6 portfolio photos.");
      return;
    }

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      setError(
        "Portfolio photos must be images of 5 MB or smaller each."
      );
    } else {
      setError("");
    }

    setPortfolioPhotos((previous) => [
      ...previous,
      ...validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);

    event.target.value = "";
  };

  const removePortfolioPhoto = (index) => {
    setPortfolioPhotos((previous) => {
      const photo = previous[index];

      if (photo?.preview) {
        URL.revokeObjectURL(photo.preview);
      }

      return previous.filter((_, photoIndex) => photoIndex !== index);
    });
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setError("GPS is not supported by this browser.");
      return;
    }

    setGpsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCoordinates({ latitude, longitude });

        // Coordinates are saved as part of the profile draft.
        // The address remains editable.
        if (!businessLocation.trim()) {
          setBusinessLocation(
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
          );
        }

        setGpsLoading(false);
      },
      (geoError) => {
        console.error("GPS error:", geoError);

        setError(
          geoError.code === 1
            ? "Please allow location access in your browser settings."
            : "Unable to get your location. Enter your business address manually."
        );

        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!businessName.trim()) {
    setError("Please enter your business name.");
    return;
  }

  if (selectedCategories.length === 0) {
    setError("Please select at least one service category.");
    return;
  }

  if (!businessLocation.trim()) {
    setError("Please enter your business location.");
    return;
  }

  if (
    businessDescription.trim().length < 20 ||
    businessDescription.trim().length > 500
  ) {
    setError(
      "Your business description must be between 20 and 500 characters."
    );
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setError("Your session has expired. Please log in again.");
    return;
  }

  try {
    setSaving(true);

    const formData = new FormData();

    formData.append("businessName", businessName.trim());
    formData.append(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    formData.append("businessLocation", businessLocation.trim());
    formData.append(
      "businessDescription",
      businessDescription.trim()
    );
    formData.append("yearsExperience", yearsExperience || "");

    formData.append(
      "latitude",
      coordinates?.latitude ?? ""
    );

formData.append(
  "longitude",
  coordinates?.longitude ?? ""
);

// Include the selected profile photo.
if (profilePhoto?.file) {
  formData.append("profileImage", profilePhoto.file);
}

// Include the certificate.
if (certificate) {
  formData.append("certificate", certificate);
}

    portfolioPhotos.forEach((photo) => {
      formData.append("portfolioPhotos", photo.file);
    });

    const response = await fetch(
      "http://localhost:5000/api/users/provider-profile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save your provider profile."
      );
    }

    setSuccess("Your provider profile has been saved successfully.");

console.log("Saved provider profile:", data.profile);

// Keep the saved account and profile details available locally.
if (data.user) {
  const savedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...savedUser,
      ...data.user,
    })
  );
}

if (data.profile) {
  localStorage.setItem(
    "providerProfile",
    JSON.stringify(data.profile)
  );
}

// Navigate only after the backend confirms the save.
navigate("/dashboardprov", { replace: true });
  } catch (err) {
    console.error("Save provider profile error:", err);

    setError(
      err.message || "Unable to save your provider profile."
    );
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="relative mx-auto min-h-screen w-full overflow-x-hidden rounded-[35px] bg-white font-['Inter',sans-serif] text-[#1F2937]">
      {/* ================= HEADER ================= */}
      <header className="flex items-center gap-6 px-6 pb-4 pt-[70px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>

        <h1 className="text-[20px] font-bold leading-6">
          Complete Profile
        </h1>
      </header>

      {/* ================= PROFILE FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full flex-col gap-[23px] px-6 pb-10 pt-10"
      >
        {/* Profile photo */}
        <section className="flex flex-col items-center gap-4 border-b border-[#E5E7EB] pb-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-[2.4px] border-dashed border-[#008000] bg-[#F0FDF4]">
              {profilePhoto ? (
                <img
                  src={profilePhoto.preview}
                  alt="Provider profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={54}
                  strokeWidth={1.4}
                  className="text-[#008000]"
                />
              )}
            </div>

            <input
              ref={profilePhotoRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhoto}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => profilePhotoRef.current?.click()}
              className="flex h-[34px] items-center justify-center rounded-full border-[1.5px] border-[#008000] px-5 text-[12px] font-bold text-[#008000]"
            >
              Change Photo
            </button>
          </div>

          <p className="text-center text-[12px] leading-[15px] text-[#6B7280]">
            Professional photo helps build trust with customers
          </p>
        </section>

        {/* Business name */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="businessName"
            className="flex items-center gap-2 text-[14px] font-bold text-[#374151]"
          >
            <Building2 size={15} className="text-[#008000]" />
            Business Name
            <span className="text-[#EF4444]">*</span>
          </label>

          <input
            id="businessName"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Enter your business name"
            maxLength={100}
            required
            className="h-11 w-full rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-white px-4 text-[14px] outline-none transition focus:border-[#008000]"
          />
        </section>

        {/* Service categories */}
        <section className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[14px] font-bold text-[#374151]">
            <BriefcaseBusiness size={15} className="text-[#008000]" />
            Service Categories
            <span className="text-[#EF4444]">*</span>
          </label>

          <button
            type="button"
            onClick={() => setShowCategories((previous) => !previous)}
            aria-expanded={showCategories}
            className="flex min-h-12 w-full items-center justify-between gap-3 rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-white px-4 py-3 text-left"
          >
            <span className="text-[14px] text-[#6B7280]">
              {selectedCategories.length
                ? `${selectedCategories.length} service${selectedCategories.length > 1 ? "s" : ""} selected`
                : "Select your services"}
            </span>

            <ChevronDown
              size={18}
              className={`shrink-0 text-[#9CA3AF] transition ${
                showCategories ? "rotate-180" : ""
              }`}
            />
          </button>

          {showCategories && (
            <div className="rounded-[15px] border border-[#E5E7EB] bg-white p-3">
              <input
                value={categorySearch}
                onChange={(event) =>
                  setCategorySearch(event.target.value)
                }
                placeholder="Search services..."
                className="mb-3 h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-[13px] outline-none focus:border-[#008000]"
              />

              <div className="flex flex-wrap gap-2">
                {filteredCategories.map((category) => {
                  const selected =
                    selectedCategories.includes(category);

                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => toggleCategory(category)}
                      aria-pressed={selected}
                      className={`rounded-full border px-3 py-[7px] text-[12px] font-bold italic transition ${
                        selected
                          ? "border-[#008000] bg-[#F0FDF4] text-[#008000]"
                          : "border-[#E5E7EB] bg-white text-[#6B7280]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className="flex items-center gap-1 rounded-full bg-[#F0FDF4] px-3 py-1.5 text-[12px] font-semibold text-[#008000]"
                >
                  {category}
                  <X size={12} />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1 text-[12px] text-[#6B7280]">
            <CheckCircle2 size={14} className="shrink-0 text-[#008000]" />
            Select all services you provide
          </div>
        </section>

        
{/* Occupation from signup */}
<section className="flex flex-col gap-2">
  <label
    htmlFor="occupation"
    className="flex items-center gap-2 text-[14px] font-bold text-[#374151]"
  >
    <BriefcaseBusiness size={15} className="text-[#008000]" />
    Occupation
  </label>

  <input
    id="occupation"
    value={occupation}
    readOnly
    placeholder="Occupation selected during signup"
    className="h-11 w-full rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[14px] text-[#374151] outline-none"
  />

  <p className="text-[12px] text-[#6B7280]">
    This is the occupation you selected when registering.
  </p>
</section>


        {/* Business location */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="businessLocation"
            className="flex items-center gap-2 text-[14px] font-bold text-[#374151]"
          >
            <MapPin size={16} className="text-[#008000]" />
            Business Location
            <span className="text-[#EF4444]">*</span>
          </label>

          <div className="flex min-h-12 items-center gap-2 rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-white p-2 pl-4">
            <MapPin size={16} className="shrink-0 text-[#9CA3AF]" />

            <input
              id="businessLocation"
              value={businessLocation}
              onChange={(event) =>
                setBusinessLocation(event.target.value)
              }
              placeholder="Enter business address"
              required
              className="min-w-0 flex-1 bg-transparent py-1 text-[14px] outline-none"
            />

            <button
              type="button"
              onClick={handleUseGPS}
              disabled={gpsLoading}
              className="flex shrink-0 items-center gap-1 rounded-lg bg-[#F0FDF4] px-3 py-2 text-[12px] font-bold italic text-[#008000] disabled:opacity-60"
            >
              <Navigation size={12} />
              {gpsLoading ? "Locating..." : "Use GPS"}
            </button>
          </div>

          {coordinates && (
            <p className="text-[11px] text-[#6B7280]">
              GPS coordinates captured successfully.
            </p>
          )}
        </section>

        {/* Business description */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="businessDescription"
            className="flex items-center gap-2 text-[14px] font-bold text-[#374151]"
          >
            <Building2 size={15} className="text-[#008000]" />
            About Your Business
            <span className="text-[#EF4444]">*</span>
          </label>

          <textarea
            id="businessDescription"
            value={businessDescription}
            onChange={(event) =>
              setBusinessDescription(
                event.target.value.slice(0, 500)
              )
            }
            placeholder="Describe your services, skills, and what makes your business unique..."
            rows={5}
            required
            minLength={20}
            maxLength={500}
            className="min-h-[120px] w-full resize-y rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-white p-3 text-[14px] leading-5 outline-none focus:border-[#008000]"
          />

          <p className="text-right text-[12px] text-[#9CA3AF]">
            {businessDescription.length} / 500
          </p>

          <div className="flex items-start gap-2 text-[13px] leading-4 text-[#6B7280]">
            <Lightbulb
              size={15}
              className="mt-0.5 shrink-0 text-[#008000]"
            />
            <p>
              A detailed description helps customers find and trust your
              services.
            </p>
          </div>
        </section>

        {/* Years of experience */}
        <section className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-[14px] font-bold text-[#374151]">
            <BriefcaseBusiness
              size={15}
              className="text-[#008000]"
            />
            Years of Experience
          </label>

          <div className="flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() =>
                setYearsExperience((previous) =>
                  Math.max(0, previous - 1)
                )
              }
              disabled={yearsExperience === 0}
              aria-label="Decrease years of experience"
              className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-[#F0FDF4] text-[#008000] disabled:opacity-40"
            >
              <Minus size={18} />
            </button>

            <div className="flex min-w-[70px] flex-col items-center">
              <span className="text-[24px] font-bold italic text-[#1F2937]">
                {yearsExperience}
              </span>
              <span className="text-[11px] text-[#6B7280]">
                {yearsExperience === 1 ? "year" : "years"}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setYearsExperience((previous) =>
                  Math.min(60, previous + 1)
                )
              }
              disabled={yearsExperience === 60}
              aria-label="Increase years of experience"
              className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-[#F0FDF4] text-[#008000] disabled:opacity-40"
            >
              <Plus size={18} />
            </button>
          </div>
        </section>

        {/* Professional licence / certification */}
        <section className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[14px] font-bold text-[#374151]">
            <FileBadge size={15} className="text-[#008000]" />
            Professional License/Certification
            <span className="text-[12px] font-normal italic text-[#9CA3AF]">
              (Optional)
            </span>
          </label>

          <input
            ref={certificateRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleCertificate}
            className="hidden"
          />

          {certificate ? (
            <div className="flex items-center gap-3 rounded-[15px] border-[1.5px] border-[#008000] bg-[#F0FDF4] p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#008000] text-white">
                <FileBadge size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="break-all text-[13px] font-bold text-[#008000]">
                  {certificate.name}
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  {(certificate.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCertificate(null)}
                aria-label="Remove certificate"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#EF4444]"
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => certificateRef.current?.click()}
              className="flex min-h-[66px] w-full items-center gap-3 rounded-[15px] border-[1.5px] border-[#008000] bg-[#F0FDF4] p-3 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#008000] text-white">
                <Upload size={19} />
              </div>

              <div>
                <p className="text-[13px] font-bold text-[#008000]">
                  Upload certificate
                </p>
                <p className="mt-1 text-[11px] text-[#6B7280]">
                  PDF or image · Max 10 MB
                </p>
              </div>
            </button>
          )}

          <p className="flex items-start gap-2 text-[12px] leading-[15px] text-[#6B7280]">
            <CheckCircle2
              size={14}
              className="mt-0.5 shrink-0 text-[#008000]"
            />
            Verified credentials build customer trust and can appear on
            your profile.
          </p>
        </section>

        {/* Work portfolio */}
        <section className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[14px] font-bold text-[#374151]">
            <ImagePlus size={15} className="text-[#008000]" />
            Work Portfolio
            <span className="text-[12px] font-normal text-[#9CA3AF]">
              (Optional)
            </span>
          </label>

          <input
            ref={portfolioRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePortfolioPhotos}
            className="hidden"
          />

          {portfolioPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {portfolioPhotos.map((photo, index) => (
                <div
                  key={`${photo.file.name}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-xl border border-[#E5E7EB]"
                >
                  <img
                    src={photo.preview}
                    alt={`Portfolio work ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removePortfolioPhoto(index)}
                    aria-label={`Remove portfolio photo ${index + 1}`}
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#EF4444] shadow-sm"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {portfolioPhotos.length < 6 && (
            <button
              type="button"
              onClick={() => portfolioRef.current?.click()}
              className="flex min-h-[155px] w-full flex-col items-center justify-center gap-2 border-[1.6px] border-dashed border-[#E5E7EB] bg-white px-4 py-5 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#F0FDF4]">
                <ImagePlus size={25} className="text-[#008000]" />
              </div>

              <p className="text-[14px] font-bold italic text-[#374151]">
                Add Photos of Your Work
              </p>

              <p className="text-[12px] text-[#9CA3AF]">
                Show customers examples of your work
              </p>

              <p className="text-[11px] text-[#9CA3AF]">
                {portfolioPhotos.length}/6 photos · Max 5 MB each
              </p>
            </button>
          )}

          <p className="flex items-start gap-2 text-[13px] leading-4 text-[#6B7280]">
            <Lightbulb
              size={15}
              className="mt-0.5 shrink-0 text-[#008000]"
            />
            Photos of completed projects help customers see your quality.
          </p>
        </section>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-xl border border-green-200 bg-green-50 p-3 text-[13px] text-green-800"
          >
            {success}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-5">
          <button
            type="submit"
            disabled={saving}
            className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#008000] px-5 text-[14px] font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

          <p className="text-center text-[11px] text-[#9CA3AF]">
            You can update your profile details later.
          </p>
        </div>
      </form>

      {/* iPhone-style handle */}
      <div className="flex h-6 w-full items-center justify-center bg-white">
        <div className="h-1 w-[108px] rounded-full bg-[#1F2937]" />
      </div>
    </div>
  );
}

export default ProviderProfile;
