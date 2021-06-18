import React, { useState, useEffect, Fragment } from 'react';
import classnames from 'classnames';
// import DatePicker from 'react-date-picker';
import DatePicker from 'react-datetime';

import Icon from 'components/UI/Icon';
import Input from 'components/UI/Input';

import st from './datePicker.module.scss';

const InputRender = ({className, ...props}, openCalendar, closeCalendar) => {
  const clear = () => {
    props.onChange({target: {value: ''}});
  };

  return (
    <Fragment>
      <Input
        className={{
          wrapper: st.input
        }}
        {...props}
      />

      <div
        className={classnames(st.controlls, {
          [st.fill]: !!props.value,
          [st.fill]: !!props.value,
        })}
      >
        <button type="button"
          onClick={openCalendar}
          className={st.openCalendar}
        >
          <i className={st.calendar}>
            <Icon
              name="calendar"
            />
          </i>
        </button>
        {/* <button type="button" onClick={closeCalendar}>close calendar</button> */}
        {/* <button type="button" onClick={clear}>clear</button> */}
      </div>
    </Fragment>
  );
};

const DatePick = ({ className, placeholder, errors, value, name, onChange, onBlur, ...props }) => {
  const [_value, changeValue] = useState((value && new Date(value)) || '');

  const defSetts = {
    dateFormat: "MM/DD/yyyy",
    timeFormat: false,
    closeOnSelect: true
  };

  const setts = {...defSetts, ...props};

  useEffect(() => {
    value && changeValue(new Date(value));
  }, [value]);

  const handlerInput = (value) => {
    const result = value.format();

    changeValue(value);
    if (onChange && typeof onChange === 'function') onChange({target:{ name, value: result }});
  };

  const handlerBlur = (value) => {
    console.log(value && value.format());
    if (onBlur && typeof onBlur === 'function') onBlur({target: {name, value: value && value.format() } });
  };

  return (
    <div className={classnames(className, st.container)}>
      <DatePicker
        className={st.wrapp}

        renderInput={InputRender}

        onChange={handlerInput}
        onBlur={handlerBlur}

        value={_value}

        inputProps={{
          placeholder,
          errors
        }}

        {...setts}
      />
    </div>
  );
};

export default DatePick;