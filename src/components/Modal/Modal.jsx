import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({children, onClick}){
  useEffect(() =>{
    const keyDownPress = evt =>{
      if (evt.code === 'Escape'){
        onClick();
      }
    };
    window.addEventListener('keydown', keyDownPress);
    return()=>{
      window.removeEventListener('keydown', keyDownPress);
    };
  }, [onClick]);
  const backdropClick = evt =>{
    if(evt && evt.target === evt.currentTarget){
      onClick();
    }
  }
    return createPortal(
      <div className={css.Overlay} onClick={backdropClick}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }