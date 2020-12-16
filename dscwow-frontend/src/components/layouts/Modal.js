import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const { open } = props;

  return ReactDOM.createPortal(
    <Fragment>
      <div
        className="modal"
        style={{
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? '1' : '0',
        }}
      >
        <div
          className="modal__box"
          style={{
            transform: open
              ? 'translate(-50%, -50%)'
              : 'translate(-50%, -250%)',
            transitionDelay: open ? '0.2s' : 'initial',
          }}
        >
          {props.children}
        </div>
      </div>
    </Fragment>,
    document.getElementById('portal')
  );
};

export default Modal;
