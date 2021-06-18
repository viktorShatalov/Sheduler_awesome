import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import "./flatpicker.scss";

import st from './styles.module.scss';

import Icon from 'components/UI/Icon';

const DatePickWrap = ({ value, name, onChange, options, onBlur, onFocus, placeholder, className, errors, ...props }) => {
  const ref = React.useRef(null);
  const container = React.useRef(null);
  const [fill, setFill] = useState(!!value);
  const [isFocus, setFocus] = useState(false);
  const [prevValue, setPrevValue] = useState('');
  const [ flatpickr, setFlatpickr ] = useState(null);

  useEffect(() => {
    setFill(!!value);
  }, [value]);

  const handlerInputFocus = (e) => {
    setPrevValue(e.target.value);

    if (onFocus && typeof onFocus === 'function') onFocus(flatpickr.altInput);
    setFocus(true);
    setFill(true);
  };

  const handlerCreate = (flatpickr) => {
    setFlatpickr(flatpickr);
    flatpickr.altInput.addEventListener('focus', handlerInputFocus, false);
  };

  const handlerDestroy = () => {
    flatpickr && flatpickr.altInput.removeEventListener('focus', handlerInputFocus);
  };

  const handlerInput = ([value]) => {
    // if (!value) {
    //   value = prevValue;
    //   flatpickr.setDate(prevValue, true, 'F d, Y');
    // }

    !isFocus && setFill(!!value);

    if (onChange && typeof onChange === 'function') onChange({target:{ name, value }});
  };

  const handlerBlur = (e) => {
    const input = flatpickr.altInput;

    // if(!input.value) {
    //   input.value = prevValue;

    //   if (!prevValue) setFill(false);
    //   return;
    // }

    // flatpickr.setDate(input.value, true, 'F d, Y');

    if (onBlur && typeof onBlur === 'function') onBlur({target: {name, value: input.value } });

    setFocus(!!value);
    setFill(true);
  };

  return (
    <div
      className={classnames(st.container, className.wrapper, { [st.notValid]: errors })}
    >
      <label
        ref={container}
        className={classnames(st.label, { [st.fill]: fill })}
      >
        <Flatpickr
          {...props}
          ref={ref}
          value={value}
          name={name}
          placeholder=" "
          options={{
            ...options,
            static: true,
            disableMobile: true
          }}
          className={classnames(st.input, className)}
          onChange={handlerInput}
          onCreate={handlerCreate}
          onDestroy={handlerDestroy}
          onClose={handlerBlur}
        />
        {(value && options.clear) && 
          <i
            className={st.clear}
            onClick={(e) => { e.preventDefault(); flatpickr.clear(); }}>
            <Icon
              name="close"
            />
          </i>
        }
        <i className={st.calendar}>
          <Icon
            name="calendar"
          />
        </i>
      { placeholder && <span className={st.placeholder}>{placeholder}</span> }
      </label>
      { errors && <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span> }
    </div>
  );
};

export default DatePickWrap;