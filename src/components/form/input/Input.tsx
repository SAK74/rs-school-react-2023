import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useEffect,
} from "react";
import { FieldError } from "react-hook-form/dist/types";
import { resourceFile } from "services/resourceFile";
import "./style.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  isSubmittedSuccessfull?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isSubmittedSuccessfull, ...inputProps }, ref) => {
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleInputChange = async (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.type === "file" && ev.target.files && imageRef.current) {
        imageRef.current.src = await resourceFile(ev.target.files[0]);
      }
      if (inputProps.onChange) {
        inputProps.onChange(ev);
      }
    };
    useEffect(() => {
      if (
        inputProps.type === "file" &&
        isSubmittedSuccessfull &&
        imageRef.current
      ) {
        imageRef.current.src = "";
      }
    }, [isSubmittedSuccessfull, inputProps.type]);

    return (
      <label
        className={
          inputProps.type !== "file"
            ? "input__label-container"
            : "input__file-container"
        }
      >
        <span>{label}</span>
        <input {...inputProps} ref={ref} onChange={handleInputChange} />
        {error && <span data-testid="error">{error.message}</span>}

        {inputProps.type === "file" && <img ref={imageRef} width="100" />}
      </label>
    );
  }
);
