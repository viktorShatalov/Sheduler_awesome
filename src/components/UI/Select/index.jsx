import React, { Fragment } from 'react';
import classnames from 'classnames';

import Select from 'react-dropdown-select';

import st from './select.module.scss';

import Icon from 'components/UI/Icon';

import './overwrite.scss';

const CustomSelect = ({ options, name, values = [], onBlur, onFocus, multi, searchable, placeholder, className, errors, onChange, disabled, schema = { label: 'label', value: 'value' } }) => {

  const handlerChange = (e) => {
    if (disabled) return;

    if (onChange) {
      if (multi) {
        onChange({target:{name, value: e}});
      } else {
        onChange({target:{name, value: e[0]}});
      }
    }
  };

  const handlerFocus = (e) => {
    if (onFocus && typeof onFocus === 'function') onFocus(e);
  };

  const handlerBlur = (e) => {
    setTimeout(() => { if (onBlur && typeof onBlur === 'function') onBlur(e) }, 0);
  };

  const customContentRenderer = ({ props, state, methods }) => {
    return (
      <button
        type="button"
        className={classnames(st.control, { [st.fill]: state.values.length > 0, [st.open]: state.dropdown, [st.disabled]: disabled })}
        onClick={() => methods.dropDown('toggle')}
        title={errors}
      >
        <span>
          <span title={state.values.map(i => i[schema.label]).join(', ')}>{state.values.map(i => i[schema.label]).join(', ')}</span>
        </span>
        <Icon name="arrow-down" />
      </button>
    );
  };

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");

    return (
      <div className={st.content}>
        { searchable &&
          <div className={st.search}>
            <input
              type="text"
              placeholder="Start entering"
              value={state.search}
              onChange={methods.setSearch}
            />

            {
              multi &&
              <Fragment>
                <span
                  className={st.count}
                >
                  {state.values && state.values.length > 0 && state.values.length}
                </span>

                <button
                  type="button"
                  className={st.clear}
                  onClick={methods.clearAll}
                ><Icon name="close" />
                </button>
              </Fragment>
            }
          </div>
        }

        <ul
          className={st.list}
        >
          {props.options
            .filter(item => regexp.test(item[props.searchBy] || item[schema.label]))
            .map(option => (
              <li
                key={option[schema.value]} 
                className={classnames(st.item, { [st.selected]: state.values.find(i => i[schema.value] === option[schema.value])})}
                onClick={() => methods.addItem(option)}
              >
                {option[schema.label]}
                {
                  (multi && state.values.find(i => i[schema.value] === option[schema.value])) &&
                  <Icon name="close" />
                }
              </li>
            ))
          }
        </ul>
      </div>
    );
  };

  const customDropdownHandleRenderer = ({state}) => {
    return <Fragment>
      { placeholder && <span className={classnames(st.placeholder, {[st.fill]: state.values.length > 0})}>{placeholder}</span>}

      {errors && <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span>}
    </Fragment>
  };

  return (
    <Select
      className={classnames(st.container, className.wrapper, { [st.notValid]: errors, [st.disabled] : disabled })}
      dropdownPosition="auto"
      contentRenderer={customContentRenderer}
      dropdownHandleRenderer={customDropdownHandleRenderer}
      dropdownRenderer={customDropdownRenderer}
      multi={multi}
      searchable={searchable}
      options={options}
      values={values.length > 0 ? options.filter(i => values.find(v => v[schema.value] === i[schema.value])) : []}
      onDropdownClose={handlerBlur}
      onDropdownOpen={handlerFocus}
      onChange={handlerChange}
      disabled={disabled}
      labelField={schema.label}
      valueField={schema.value}
    />
  );
};

export default CustomSelect;