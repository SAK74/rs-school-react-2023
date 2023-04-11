import { FC, ReactNode } from "react";

export const Modal: FC<{
  show: boolean;
  children?: ReactNode;
  onClose: () => void;
}> = ({ show, children, onClose }) => {
  return (
    <div
      className="modal"
      style={{ display: show ? "flex" : "none" }}
      onClick={onClose}
      data-testid="modal"
    >
      <div
        className="modal__content"
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <span
          onClick={onClose}
          className="modal__close-button"
          title="close"
          data-testid="close-modal-btn"
        >
          x
        </span>
        {children}
      </div>
    </div>
  );
};
