import React, { useRef } from "react";
import { OtpInputProps } from "@/types/verify-otp";

export const OtpInput: React.FC<OtpInputProps> = ({ otp, setOtp }) => {
  const inputRefs = Array(4)
    .fill(0)
    .map(() => useRef<HTMLInputElement>(null));

  const handleChange = (index: number, value: string) => {
    const newValue = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = newValue.toUpperCase();
    setOtp(newOtp);

    if (newValue && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).toUpperCase();
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs[focusIndex].current?.focus();
  };

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl sm:text-3xl text-primary font-bold bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 uppercase"
        />
      ))}
    </div>
  );
};
