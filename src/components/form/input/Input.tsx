import { ChangeEvent, forwardRef, InputHTMLAttributes, createRef } from "react";
import { resourceFile } from "services/resourceFile";
import "./style.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const imageRef = createRef<HTMLImageElement>();
const inputRef = createRef<HTMLInputElement>();

export const Input = forwardRef<HTMLSpanElement, InputProps>(
  ({ label, ...inputProps }, ref) => {
    if (!inputRef.current?.value && imageRef.current) {
      imageRef.current.src = "";
    }
    const handleInputChange = async (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.type === "file" && ev.target.files && imageRef.current) {
        imageRef.current.src = await resourceFile(ev.target.files[0]);
      }
      if (inputProps.onChange) {
        inputProps.onChange(ev);
      }
    };

    return (
      <label
        className={
          inputProps.type !== "file"
            ? "input__label-container"
            : "input__file-container"
        }
      >
        <span>{label}</span>
        <input {...inputProps} ref={inputRef} onChange={handleInputChange} />
        <span ref={ref} data-testid="error"></span>
        {inputProps.type === "file" && <img ref={imageRef} width="100" />}
      </label>
    );
  }
);
