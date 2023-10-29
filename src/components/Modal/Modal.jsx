import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  keyDown = evt => {
    if (evt.target === evt.currentTarget) {
      this.toggleModal();
    }
  };
  render() {
    const { children, onClick } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={onClick}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
