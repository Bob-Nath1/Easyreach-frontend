import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  PhoneCall,
  MessageSquare,
} from "lucide-react";

const ContactSupport = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our team",
      extra: null,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@easyreach.com",
      extra: "We reply within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+234 705 085 2180",
      extra: "Mon-Fri, 9am-9pm WAT",
    },
    {
      icon: PhoneCall,
      title: "Request a Callback",
      description: "We’ll call you back",
      extra: "Usually within 2 hours",
    },
  ];

  const socialLinks = [
    {
      name: "X",
      type: "x",
      bg: "#D5D5D5",
      iconColor: "#000000",
    },
    {
      name: "Facebook",
      type: "facebook",
      bg: "#DBEAFE",
      iconColor: "#1D4ED8",
    },
    {
      name: "Instagram",
      type: "instagram",
      bg: "#FCE7F3",
      iconColor: "#BE185D",
    },
    {
      name: "WhatsApp",
      type: "whatsapp",
      bg: "#F0FDF4",
      iconColor: "#008000",
    },
  ];

  const renderSocialIcon = (type, color) => {
  switch (type) {
    case "facebook":
      return (
        <span
          className="text-[22px] font-bold"
          style={{ color }}
        >
          f
        </span>
      );

    case "instagram":
      return (
        <span
          className="flex h-5 w-5 items-center justify-center rounded-[6px] border-[2px]"
          style={{ borderColor: color }}
        >
          <span
            className="h-[6px] w-[6px] rounded-full border"
            style={{ borderColor: color }}
          />
        </span>
      );

    case "whatsapp":
      return (
        <MessageSquare
          size={20}
          strokeWidth={2}
          style={{ color }}
        />
      );

    case "x":
      return (
        <span
          className="text-[17px] font-bold"
          style={{ color }}
        >
          𝕏
        </span>
      );

    default:
      return null;
  }
};

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB]">
      
      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-[21px] pb-[19px]">
        
        {/* Time */}
        <div className="flex h-[22px] items-center">
          <span className="w-[37px] text-center font-sans text-[17px] font-semibold leading-[22px] text-black">
            9:41
          </span>
        </div>

        {/* Network / Battery */}
        <div className="flex h-[22px] items-center justify-end gap-[7px]">
          
          {/* Cellular */}
          <div className="flex h-[13px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[8px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[12px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* WiFi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-1/2 top-0 h-[13px] w-[13px] -translate-x-1/2 rotate-[-45deg] rounded-full border-[2px] border-black border-b-transparent border-l-transparent" />

            <div className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-black" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px]">
            <div className="absolute left-0 top-0 h-[13px] w-[25px] rounded-[4px] border border-black opacity-35" />

            <div className="absolute right-0 top-[4px] h-[5px] w-[2px] rounded-r bg-black opacity-40" />

            <div className="absolute left-[2px] top-[3px] h-[7px] w-[21px] rounded-[2px] bg-black" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-6 top-[70px] flex h-6 items-start gap-6">
        
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex h-6 w-6 items-center justify-center"
        >
          <ArrowLeft
            size={24}
            strokeWidth={2}
            className="text-[#1F2937]"
          />
        </button>

        {/* Title */}
        <h1 className="font-sans text-[20px] font-bold leading-6 text-[#1F2937]">
          Contact Support
        </h1>
      </div>

      {/* ================= SUPPORT OPTIONS ================= */}
      <div className="absolute left-1/2 top-[118px] flex w-[380px] -translate-x-1/2 flex-col gap-[18px]">
        
        {supportOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <button
              key={option.title}
              className={`flex w-[380px] items-center rounded-2xl bg-white p-4 text-left transition hover:bg-gray-50 ${
                index === 0 ? "h-[72px]" : "h-[95px]"
              }`}
            >
              {/* Icon container */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0FDF4]">
                <Icon
                  size={index === 0 ? 22 : 20}
                  strokeWidth={2}
                  className="text-[#008000]"
                />
              </div>

              {/* Text */}
              <div className="ml-3 flex min-w-0 flex-col gap-2">
                <span className="font-sans text-[14px] font-bold leading-[17px] text-[#1F2937]">
                  {option.title}
                </span>

                <span className="font-sans text-[12px] font-normal leading-[15px] text-black">
                  {option.description}
                </span>

                {option.extra && (
                  <div className="flex items-center gap-1">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#008000]" />

                    <span className="font-sans text-[12px] font-normal leading-[15px] text-[#008000]">
                      {option.extra}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= SECTION DIVIDER ================= */}
      <div className="absolute left-0 top-[553px] h-5 w-full px-0">
        <div className="h-2 w-full bg-[#F3F4F6]" />
      </div>

      {/* ================= CONNECT WITH US ================= */}
      <div className="absolute left-6 top-[589px]">
        <h2 className="font-sans text-[12px] font-bold italic leading-[15px] text-[#6B7280]">
          CONNECT WITH US
        </h2>
      </div>

      {/* ================= SOCIAL MEDIA ================= */}
      <div className="absolute left-6 top-[620px] flex h-[99px] w-[381px] gap-[15px]">
        
        {socialLinks.map((social) => (
          <button
            key={social.name}
            className="flex h-[99px] w-[84px] items-center justify-center rounded-[24px] bg-white px-[22px] py-4"
          >
            <div className="flex h-[67px] w-10 flex-col items-center gap-3">
              
              {/* Social icon circle */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: social.bg }}
              >
                {renderSocialIcon(
                  social.type,
                  social.iconColor
                )}
              </div>

              {/* Name */}
              <span className="w-full text-center font-sans text-[12px] font-normal leading-[15px] text-black">
                {social.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactSupport;