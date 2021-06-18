import React from 'react';
import classnames from 'classnames';
import st from './switcher.module.scss';

const CustomSwitcher = ({ onChange, name, value, className, errors, children, checked, modific = null, ...props }) => {
  const handlerChange = (e) => {
    onChange(e)
  };

  return (
    <div className={classnames(st.container, className, modific, { [st.notValid]: errors })}>
      <label className={st.label}>
        <input
          {...props}
          type="checkbox"
          name={name}
          className={st.input}
          value={value}
          checked={ checked || false }
          onChange={handlerChange}
        />
        <span className={st.placeholder}>
          <span className={st.placeholder_inner}>{children}</span>
        </span>
      </label>
      { errors && <span className={st.errors}>{errors}</span> }
    </div>
  );
};

export default CustomSwitcher;