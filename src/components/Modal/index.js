import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
  }
  componentDidMount() {
    modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    return createPortal(
      <div className={styles.modal_wrapper}>{this.props.children}</div>,
      this.element
    );
  }
}
export default Modal;
