import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import st from './textarea.module.scss';

const TextArea = ({ className, name, value, placeholder, onChange, onBlur, onFocus, errors = null, ...propses }) => {
  const check = (val) => !!(val && val.trim() !== '');

  const textAreaRef = useRef(null);

  const [fill, setFill] = useState(check(value));
  const [isFocus, setFocus] = useState(false);

  const setHeigth = (target) => {
    target.style.height = '';

    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    setHeigth(textAreaRef.current);
    setFill(check(value));
  }, [textAreaRef, value]);

  const handlerInput = (e) => {
    setHeigth(e.target);

    const { value } = e.target;

    !isFocus && setFill(check(value));

    if (onChange && typeof onChange === 'function') onChange(e);
  };

  const handlerFocus = (e) => {
    if (onFocus && typeof onFocus === 'function') onFocus(e);
    setFocus(true);
    setFill(true);
  };

  const handlerBlur = (e) => {
    if (onBlur && typeof onBlur === 'function') onBlur(e);

    const { value } = e.target;

    setFocus(false);
    setFill(check(value));
  };

  return (
    <div className={classnames(st.container, className.wrapper, { [st.notValid]: errors })}>
      <label className={classnames(st.label, { [st.fill]: fill })}>
        <textarea 
          name={name}
          value={value}
          ref={textAreaRef}
          className={classnames(st.input, className.input)}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          onChange={handlerInput}
          {...propses}
        ></textarea>
      { placeholder && <span className={st.placeholder}>{placeholder}</span> }
      </label>
      { errors && <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span> }
    </div>
  );
};

export default TextArea;