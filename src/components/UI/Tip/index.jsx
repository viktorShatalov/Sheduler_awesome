import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import st from './tip.module.scss';

const Tip = ({children, text}) => {
  const [ isShow, setShow ] = useState(false);
  // const [ isShow, setShow ] = useState(true);

  const handlerEnter = (e) => {
    setShow(true);
  };
  
  const handlerLeave = (e) => {
    setShow(false);
  };

  const calcPosition = (el) => {
    const span = el.children[0];
    const pos = span.getBoundingClientRect();

    if (pos.right > window.innerWidth + 20) {
      span.style.transform = `translate3d(-${pos.right - window.innerWidth + 20}px,0,0)`;
    }
    if (pos.left < 20) {
      span.style.transform = `translate3d(${-pos.left + 20}px,0,0)`;
    }
  };

  return (
    <div
      onMouseEnter={handlerEnter}
      onMouseLeave={handlerLeave}
      className={st.container}
    >
      <CSSTransition
        in={isShow}
        classNames="show-tip"
        timeout={{
          enter: 300,
          end: 200
        }}
        onEnter={calcPosition}
        unmountOnExit
      >
        <span className={st.text}>
          <span>{text}</span>
        </span>
      </CSSTransition>
      {children}
    </div>
  );
};

export default Tip;