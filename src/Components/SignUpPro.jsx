import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronDown,
  UserRound,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import occupationCatalogue from "../data/occupationCatalogue";
import nearbyPlacesCatalogue from "../data/nearbyPlacesCatalogue";


const isValidPassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password)
  );
};

function SignUpPro() {

  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState("individual");

  const [businessData, setBusinessData] = useState({
  businessName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  category: "",
  establishmentType: "",
  description: "",
  address: "",
});

  const goToPath = () => {
    navigate("/path");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const [serviceCategory, setServiceCategory] = useState("");
const [occupationSearch, setOccupationSearch] = useState("");
const [selectedOccupation, setSelectedOccupation] = useState("");
const [customOccupation, setCustomOccupation] = useState("");
const [showOccupationOptions, setShowOccupationOptions] = useState(false);

const occupations = serviceCategory
  ? occupationCatalogue[serviceCategory] || []
  : [];

const filteredOccupations = occupations.filter((occupation) =>
  occupation.toLowerCase().includes(
    occupationSearch.trim().toLowerCase()
  )
);

const businessCategories = Object.keys(nearbyPlacesCatalogue);

const establishmentTypes = businessData.category
  ? nearbyPlacesCatalogue[businessData.category] || []
  : [];

const isCustomOccupation = selectedOccupation === "Other";

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleBusinessChange = (e) => {
  const { name, value } = e.target;

  setBusinessData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleBusinessSubmit = async (e) => {
  e.preventDefault();

  if (!accepted) {
    alert("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  if (businessData.password !== businessData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!isValidPassword(businessData.password)) {
    alert(
      "Password must contain at least 8 characters, " +
      "one uppercase letter, one number, and one special character."
    );
    return;
  }

  try {
  setLoading(true);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  role: "provider",
  accountType: "business",
  businessName: businessData.businessName,
  email: businessData.email,
  phone: businessData.phone,
  password: businessData.password,
  confirmPassword: businessData.confirmPassword,
  category: businessData.category,
  establishmentType: businessData.establishmentType,
  description: businessData.description,
  address: businessData.address,
}),    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Business registration failed.");
  }

  alert(data.message);

 navigate("/otp", {
  state: {
    email: businessData.email,
    role: "provider",
  },
});
} catch (error) {
  alert(error.message || "Unable to register business.");
} finally {
  setLoading(false);
}
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!accepted) {
    alert("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!serviceCategory) {
  alert("Please select your service category.");
  return;
}

const finalOccupation =
  selectedOccupation === "Other"
    ? customOccupation.trim()
    : selectedOccupation || occupationSearch.trim();

if (!finalOccupation) {
  alert("Please select or enter your occupation.");
  return;
}

if (finalOccupation.length > 100) {
  alert("Your occupation must not exceed 100 characters.");
  return;
}

  try {
    setLoading(true);

    if (!isValidPassword(formData.password)) {
  alert(
    "Password must contain at least 8 characters, " +
    "one uppercase letter, one number, and one special character."
  );
  return;
}

if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match.");
  return;
}

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          serviceCategory,
          accountType: "individual",
          occupation: finalOccupation,
          role: "provider",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Something went wrong during signup.");
      return;
    }

    console.log("Provider signup successful:", data);

    navigate("/otp", {
      state: {
        email: formData.email,
      },
    });
  } catch (error) {
    console.error("Provider signup error:", error);

    alert(
      "Unable to connect to the server. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  const goToOTP = () => {
  navigate("/otp");
};


  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
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
      bg-gradient-to-br
      from-[#00C48C]
      to-[#008000]
    "
  >
        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 w-full h-[70px] flex items-center justify-center">
          <button
  type="button"
  onClick={goToPath}
  className="absolute left-6 top-2 text-white"
>
  <ArrowLeft size={24} strokeWidth={2} />
</button>

          <h1 className="text-white text-[18px] font-bold">
            Sign Up
          </h1>
        </div>

        {/* ================= WHITE CONTENT ================= */}
        <div className="absolute left-0 bottom-0 w-full h-[812px] bg-white rounded-t-[45px]">

         {/* Registration Type Selection */}
<div className="absolute top-4 left-6 right-6 grid grid-cols-2 gap-3">

  {/* Individual Provider */}
  <button
    type="button"
    onClick={() => setRegistrationType("individual")}
    className={`h-[75px] rounded-lg border-2 p-3 flex flex-col items-center justify-center gap-1 transition ${
      registrationType === "individual"
        ? "border-[#059669] bg-[#F0FDF4]"
        : "border-gray-200 bg-white"
    }`}
  >
    <UserRound
      size={22}
      className={
        registrationType === "individual"
          ? "text-[#059669]"
          : "text-gray-400"
      }
    />

    <span className="text-[11px] font-bold text-gray-700">
      Individual Provider
    </span>
  </button>

  {/* Business / Organisation */}
  <button
    type="button"
    onClick={() => setRegistrationType("business")}
    className={`h-[75px] rounded-lg border-2 p-3 flex flex-col items-center justify-center gap-1 transition ${
      registrationType === "business"
        ? "border-[#059669] bg-[#F0FDF4]"
        : "border-gray-200 bg-white"
    }`}
  >
    <Building2
      size={22}
      className={
        registrationType === "business"
          ? "text-[#059669]"
          : "text-gray-400"
      }
    />

    <span className="text-[11px] font-bold text-gray-700">
      Business / Organisation
    </span>
  </button>

</div>
          {/* ================= FORM ================= */}
         <div
  className="
    absolute
    top-[91px]
    left-6
    right-6
    bottom-[24px]
    overflow-y-auto
    overflow-x-hidden
    pr-1
    pb-6
    scrollbar-hide
  "
>

 {registrationType === "individual" ? (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-6"
  >

              {/* Full Name */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Full Name
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">
                  <User
                    size={20}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                 <input
  type="text"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Enter your full name"
                    className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Email Address
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">
                  <Mail
                    size={20}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="your.email@gmail.com"
                    className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Phone Number
                </label>

                <div className="flex items-center gap-4">

                  {/* Country */}
                  <div className="flex items-center gap-2 w-[60px]">
                    <span className="text-[20px]">🇳🇬</span>

                    <span className="text-[#1F2937] text-[12px] font-bold">
                      +234
                    </span>
                  </div>

                  {/* Number */}
                  <div className="relative flex-1 border-b border-[#9CA3AF] h-[35px]">
                    <Phone
                      size={17}
                      className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />

                    <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="705 085 2180"
                      className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Service Category */}
<div>
  <label
    htmlFor="serviceCategory"
    className="mb-2 block text-[14px] font-bold text-[#008000]"
  >
    Service Category
  </label>

  <div className="relative border-b border-[#9CA3AF]">
    <select
      id="serviceCategory"
      value={serviceCategory}
      onChange={(e) => {
        setServiceCategory(e.target.value);
        setOccupationSearch("");
        setSelectedOccupation("");
        setCustomOccupation("");
        setShowOccupationOptions(false);
      }}
      required
      className="h-[40px] w-full appearance-none bg-white pr-8 text-[12px] font-semibold text-gray-700 outline-none"
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
      className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
    />
  </div>
</div>

{/* Occupation */}
<div>
  <label
    htmlFor="occupationSearch"
    className="mb-2 block text-[14px] font-bold text-[#008000]"
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
        setCustomOccupation("");
        setShowOccupationOptions(true);
      }}
      onFocus={() => setShowOccupationOptions(true)}
      onBlur={() => {
        setTimeout(() => setShowOccupationOptions(false), 150);
      }}
      disabled={!serviceCategory}
      placeholder={
        serviceCategory
          ? "Search your occupation"
          : "Select a category first"
      }
      autoComplete="off"
      required={!isCustomOccupation}
      className="h-[40px] w-full border-b border-[#9CA3AF] bg-white pr-8 text-[12px] font-semibold text-gray-700 outline-none placeholder:font-normal placeholder:text-[#9CA3AF] disabled:bg-gray-50"
    />

    <UserRound
      size={18}
      className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
    />

    {showOccupationOptions && serviceCategory && (
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
                setShowOccupationOptions(false);
              }}
              className="block w-full px-3 py-3 text-left text-[12px] text-gray-700 hover:bg-green-50"
            >
              {occupation}
            </button>
          ))}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setSelectedOccupation("Other");
            setCustomOccupation(
              occupationSearch.trim() === "Other"
                ? ""
                : occupationSearch.trim()
            );
            setOccupationSearch(
              occupationSearch.trim() === "Other"
                ? ""
                : occupationSearch.trim()
            );
            setShowOccupationOptions(false);
          }}
          className="block w-full border-t border-gray-100 px-3 py-3 text-left text-[12px] font-semibold text-[#008000] hover:bg-green-50"
        >
          + Enter my own occupation
        </button>
      </div>
    )}
  </div>

  {isCustomOccupation && (
    <div className="mt-3">
      <label
        htmlFor="customOccupation"
        className="mb-2 block text-[12px] font-semibold text-gray-600"
      >
        Enter your occupation
      </label>

      <input
        id="customOccupation"
        type="text"
        value={customOccupation}
        onChange={(e) => setCustomOccupation(e.target.value)}
        maxLength={100}
        required
        placeholder="Enter your job title"
        className="h-[40px] w-full border-b border-[#9CA3AF] text-[12px] font-semibold text-gray-700 outline-none placeholder:font-normal placeholder:text-[#9CA3AF]"
      />
    </div>
  )}
</div>

              {/* Password */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">

                  <Lock
                    size={18}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter your password"
                    className="w-full h-full pl-8 pr-10 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-4 -mt-3">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#374151] text-[13px] font-bold">
                    Password must contain
                  </span>

                  <ChevronDown
                    size={16}
                    className="text-[#9CA3AF]"
                  />
                </div>

                <div className="space-y-1">

                  <PasswordRequirement text="At least 8 characters" />

                  <PasswordRequirement text="One uppercase letter" />

                  <PasswordRequirement text="One number" />

                  <PasswordRequirement text="One special character" />

                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">

                  <Lock
                    size={18}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

       <input
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Enter your password"
  className="w-full h-full pl-8 pr-10 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
/>

                  <Eye
                    size={18}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">

                <button
                  type="button"
                  onClick={() => setAccepted(!accepted)}
                  className={`w-[15px] h-[15px] flex-shrink-0 border border-[#1F2937] flex items-center justify-center ${
                    accepted ? "bg-[#008000]" : "bg-white"
                  }`}
                >
                  {accepted && (
                    <CheckCircle2
                      size={12}
                      className="text-white"
                    />
                  )}
                </button>

                <p className="text-[12px] leading-[15px] text-[#444444] font-medium">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-[#008000] font-semibold"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-[#008000] font-semibold"
                  >
                    Privacy Policy
                  </button>
                </p>

              </div>

              {/* Continue */}
             <button
  type="submit"
  disabled={loading}
  className="w-full h-[52px] bg-[#008000] hover:bg-[#006b00] transition-colors rounded-full flex items-center justify-center text-white text-[14px] font-semibold disabled:opacity-60"
>
  {loading ? "Creating account..." : "Continue"}
</button>

             
              {/* Already have account */}
              <div className="text-right pb-6">

                <p className="text-[12px] text-[#1F2937]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#008000]"
                  >
                    Sign in
                  </button>
                </p>

              </div>

             </form>
) : (


  <form
    onSubmit={handleBusinessSubmit}
    className="flex flex-col gap-5"
  >
    <h2 className="text-[16px] font-bold text-[#008000]">
      Business / Organisation Registration
    </h2>

    {/* Business Category */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business Category
      </label>

      <select
        name="category"
        value={businessData.category}
        onChange={(e) => {
          setBusinessData((prev) => ({
            ...prev,
            category: e.target.value,
            establishmentType: "",
          }));
        }}
        required
        className="h-[40px] w-full border-b border-[#9CA3AF] bg-white text-[12px] font-semibold text-gray-700 outline-none"
      >
        <option value="">Select business category</option>
        {businessCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Establishment Type */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Establishment Type
      </label>

      <select
        name="establishmentType"
        value={businessData.establishmentType}
        onChange={handleBusinessChange}
        disabled={!businessData.category}
        required
        className="h-[40px] w-full border-b border-[#9CA3AF] bg-white text-[12px] font-semibold text-gray-700 outline-none disabled:bg-gray-50"
      >
        <option value="">Select establishment type</option>
        {establishmentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    {/* Business Name */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business / Organisation Name
      </label>

      <div className="relative border-b border-[#9CA3AF] h-[40px]">
        <Building2
          size={19}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />
        <input
          type="text"
          name="businessName"
          value={businessData.businessName}
          onChange={handleBusinessChange}
          placeholder="Enter your business name"
          required
          className="w-full h-full pl-8 pr-2 text-[12px] font-semibold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
        />
      </div>
    </div>

    {/* Business Email */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business Email Address
      </label>

      <div className="relative border-b border-[#9CA3AF] h-[40px]">
        <Mail
          size={19}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />
        <input
          type="email"
          name="email"
          value={businessData.email}
          onChange={handleBusinessChange}
          placeholder="business@example.com"
          required
          className="w-full h-full pl-8 pr-2 text-[12px] font-semibold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
        />
      </div>
    </div>

    {/* Business Phone */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business Phone Number
      </label>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-[60px]">
          <span className="text-[20px]">🇳🇬</span>
          <span className="text-[#1F2937] text-[12px] font-bold">
            +234
          </span>
        </div>

        <div className="relative flex-1 border-b border-[#9CA3AF] h-[40px]">
          <Phone
            size={17}
            className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="tel"
            name="phone"
            value={businessData.phone}
            onChange={handleBusinessChange}
            placeholder="705 085 2180"
            required
            className="w-full h-full pl-8 pr-2 text-[12px] font-semibold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
          />
        </div>
      </div>
    </div>

    {/* Business Address */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business / Organisation Address
      </label>

      <input
        type="text"
        name="address"
        value={businessData.address}
        onChange={handleBusinessChange}
        placeholder="Enter your business physical address"
        required
        className="h-[40px] w-full border-b border-[#9CA3AF] px-2 text-[12px] font-semibold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
      />
    </div>

    {/* Business Description */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Business Description
      </label>

      <textarea
        name="description"
        value={businessData.description}
        onChange={handleBusinessChange}
        placeholder="Tell people about your business or organisation..."
        rows={4}
        maxLength={1000}
        required
        className="w-full rounded-md border border-[#D1D5DB] p-3 text-[12px] font-semibold text-gray-700 placeholder:text-[#9CA3AF] outline-none focus:border-[#059669] resize-none"
      />

      <p className="mt-1 text-right text-[10px] text-gray-400">
        {businessData.description.length}/1000 characters
      </p>
    </div>

    {/* Business Password */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Password
      </label>

      <div className="relative border-b border-[#9CA3AF] h-[40px]">
        <Lock
          size={18}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={businessData.password}
          onChange={handleBusinessChange}
          placeholder="Create a password"
          required
          className="w-full h-full pl-8 pr-10 text-[12px] font-semibold text-gray-700 outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    {/* Confirm Business Password */}
    <div>
      <label className="mb-2 block text-[14px] font-bold text-[#008000]">
        Confirm Password
      </label>

      <div className="relative border-b border-[#9CA3AF] h-[40px]">
        <Lock
          size={18}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />

        <input
          type="password"
          name="confirmPassword"
          value={businessData.confirmPassword}
          onChange={handleBusinessChange}
          placeholder="Confirm your password"
          required
          className="w-full h-full pl-8 pr-2 text-[12px] font-semibold text-gray-700 outline-none"
        />
      </div>
    </div>

    {/* Password Requirements */}
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#374151] text-[13px] font-bold">
          Password must contain
        </span>
        <ChevronDown size={16} className="text-[#9CA3AF]" />
      </div>

      <div className="space-y-1">
        <PasswordRequirement text="At least 8 characters" />
        <PasswordRequirement text="One uppercase letter" />
        <PasswordRequirement text="One number" />
        <PasswordRequirement text="One special character" />
      </div>
    </div>

    {/* Business Terms and Privacy Policy */}
    <div className="flex items-start gap-2 mb-17">
      <button
        type="button"
        onClick={() => setAccepted(!accepted)}
        className={`w-[15px] h-[15px] flex-shrink-0 border border-[#1F2937] flex items-center justify-center ${
          accepted ? "bg-[#008000]" : "bg-white"
        }`}
      >
        {accepted && (
          <CheckCircle2 size={12} className="text-white" />
        )}
      </button>

      <p className="text-[12px] leading-[15px] text-[#444444] font-medium">
        I agree to the{" "}
        <button
          type="button"
          className="text-[#008000] font-semibold"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          type="button"
          className="text-[#008000] font-semibold"
        >
          Privacy Policy
        </button>
      </p>
    </div>

    {/* Continue Registration */}
    <button
      type="submit"
      disabled={loading}
      className="w-full h-[52px] bg-[#008000] hover:bg-[#006b00] transition-colors rounded-full flex items-center justify-center text-white text-[14px] font-semibold disabled:opacity-60"
    >
      Continue Registration
    </button>

  </form>

)}
          </div>

       

        </div>
      </div>
    </div>
  );
}


/* Password requirement component */
function PasswordRequirement({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={14}
        className="text-[#6B7280]"
      />

      <span className="text-[12px] text-[#6B7280]">
        {text}
      </span>
    </div>

    
  );
}

export default SignUpPro;