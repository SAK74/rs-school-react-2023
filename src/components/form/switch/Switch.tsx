import React, { FC, InputHTMLAttributes } from "react";
import "./style.scss";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  label2?: string;
}
export const Switch: FC<SwitchProps> = ({ label, label2, ...inputProps }) => {
  return (
    <div className="switch__container">
      <span className="switcher__label">{label}</span>
      <label className="switch__switcher">
        <input {...inputProps} type="checkbox" />
        <span className="switch__slider" />
      </label>
      <span className="switch__label2">{label2}</span>
    </div>
  );
};
