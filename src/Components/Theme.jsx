import React, { useState } from "react";
import { ArrowLeft, Sun, Moon, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Theme = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");

  const themes = [
    {
      id: "light",
      label: "Light",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Default",
      icon: Monitor,
    },
  ];

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB]">
      
      {/* Status Bar */}
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
            <div className="absolute left-1/2 top-0 h-[13px] w-[13px] -translate-x-1/2 rounded-full border-[2px] border-black border-b-transparent border-l-transparent rotate-[-45deg]" />
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

      {/* Header */}
      <div className="absolute left-6 top-[70px] flex h-6 items-start gap-6">
        
        {/* Back Button */}
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
          Theme
        </h1>
      </div>

      {/* Theme Options */}
      <div className="absolute left-1/2 top-[110px] flex w-[380px] -translate-x-1/2 flex-col gap-[4px]">
        {themes.map((item) => {
          const Icon = item.icon;
          const isSelected = theme === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`box-border flex h-[52px] w-[380px] items-center gap-3 rounded-lg px-4 transition-all ${
                isSelected
                  ? "border-[1.5px] border-[#008000] bg-[#F0FDF4]"
                  : "border-[1.5px] border-[#E5E7EB] bg-white"
              }`}
            >
              {/* Radio / Icon */}
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${
                  isSelected
                    ? "border-[#008000]"
                    : "border-[#E5E7EB]"
                }`}
              >
                {isSelected && (
                  <div className="h-[9px] w-[9px] rounded-full bg-[#008000]" />
                )}
              </div>

              {/* Icon */}
              <Icon
                size={18}
                strokeWidth={1.8}
                className={
                  isSelected
                    ? "text-[#008000]"
                    : "text-[#6B7280]"
                }
              />

              {/* Label */}
              <span className="font-sans text-[14px] font-normal leading-[17px] text-[#111827]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Theme;