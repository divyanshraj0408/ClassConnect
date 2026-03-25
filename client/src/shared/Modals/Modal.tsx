import React, { CSSProperties, FormEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./Modal.css";

interface ModalProps {
  className?:    string;
  style?:        CSSProperties;
  headerClass?:  string;
  header?:       string;
  onSubmit?:     (event: FormEvent<HTMLFormElement>) => void;
  contentClass?: string;
  footerClass?:  string;
  footer?:       ReactNode;
  show?:         boolean;
  onCancel?:     () => void;
  children?:     ReactNode;
}

// ── Overlay (portalled into #modal-hook) ─────────────────────────────────────
const ModalOverlay: React.FC<ModalProps> = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  footerClass,
  footer,
  children,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    if (onSubmit) {
      onSubmit(event);
    } else {
      event.preventDefault();
    }
  };

  const content = (
    <div className={`modal ${className ?? ""}`} style={style} role="dialog" aria-modal="true" aria-label={header}>
      <header className={`modal__header ${headerClass ?? ""}`}>
        <h2 className="modal__title">{header}</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={`modal__content ${contentClass ?? ""}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass ?? ""}`}>
          {footer}
        </footer>
      </form>
    </div>
  );

  const portalTarget = document.getElementById("modal-hook");
  if (!portalTarget) return null;
  return ReactDOM.createPortal(content, portalTarget);
};

// ── Modal (with transition + backdrop) ───────────────────────────────────────
const Modal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={250}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;