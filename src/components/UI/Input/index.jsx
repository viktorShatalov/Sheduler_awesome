import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Icon from 'components/UI/Icon';
import st from './styles.module.scss';

const Input = (props, ref) => {
  const {
    type = 'text',
    value = '',
    name,
    placeholder = '',
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    className,
    errors = null,
    disabled,
    ...propses
  } = props;

  const check = (val) => !!val;

  const [fill, setFill] = useState(check(value));
  const [isFocus, setFocus] = useState(false);
  const [isShowPass, setShowPass] = useState(false);

  useEffect(() => {
    setFill(check(value));
  }, [value]);

  const handlerInput = (e) => {
    if (disabled) return;

    if (props.maxLength && props.type === 'number' && e.target.value.length > Number(props.maxLength)) {
      e.target.value = e.target.value.slice(0, -1);
    }

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

  const handlerKeyDown = (e) => {
    if(type === 'number') {
      e.target.value = e.target.value.replace(/[^0-9]/g,'');
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    }

    if (onKeyDown && typeof onKeyDown === 'function') onKeyDown(e);
  };

  const handlerShowPass = () => {
    setShowPass(true);

    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  }

  const statePassword = () => (isShowPass ? 'text' : 'password');

  const resutType = type === 'password' ? statePassword() : type;

  return (
    <div className={classnames(st.container, className.wrapper, { [st.notValid]: errors, [st.disabled]: disabled })}>
      <label className={classnames(st.label, { [st.fill]: fill })}>
        <input
          type={ resutType }
          name={name}
          value={value || ''}
          ref={ref}
          className={classnames(st.input, className.input, {[st.hidenPass]: resutType === 'password'})}
          onKeyDown={handlerKeyDown}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          onChange={handlerInput}
          title={value}
          disabled={disabled}
          {...propses}
        />
        {
          type === 'password'
          && <button
            type="button"
            className={st.inputButton}
            onClick={handlerShowPass}
          >
            <Icon
              name={ isShowPass ? 'close-eye' : 'close-eye' }
            />
          </button>
        }
        { placeholder && <span className={st.placeholder}>{placeholder}</span> }
      </label>
      { errors && <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span> }
    </div>
  );
};

export default React.forwardRef(Input);
