import React from 'react';
import classnames from 'classnames';
import st from './checkbox.module.scss';

const CustomCheckbox = ({ onChange, name, className, errors, checked=false, children, ...props }) => {
  // const [check, setChecked] = React.useState(checked);

  const handlerChange = (e) => {
    // setChecked(!check);
    onChange(e)
  };

  return (
    <div className={classnames(st.container, className, { [st.notValid]: errors })}>
      <label className={st.label}>
        <input
          {...props}
          type="radio"
          name={name}
          className={st.input}
          checked={checked}
          onChange={handlerChange}
        />
        <span className={st.placeholder}>
          <i></i>
          <span>
            {children}
          </span>
        </span>
      </label>
      { errors && <span className={st.errors}>{errors}</span> }
    </div>
  );
};

export default CustomCheckbox;