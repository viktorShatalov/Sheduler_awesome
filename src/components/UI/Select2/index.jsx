import React from 'react';
import classnames from 'classnames';

import { useSelect } from 'react-select-search';
import { CSSTransition } from 'react-transition-group';

import st from './select.module.scss';
import Icon from 'components/UI/Icon';

const CustomSelect = ({ options, value, multiple, search, placeholder, className, errors, disabled }) => {

  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value,
    search,
    multiple,
    disabled,
    // closeOnSelect: false
  });

  const getOptions = () => {
    if (snapshot.search) {
      return snapshot.options
        .filter(i => i.name.toLowerCase().trim().includes(snapshot.search.toLowerCase().trim()))
    } else {
      return snapshot.options;
    }
  };

  return (
    <div
      className={classnames(st.container, className.wrapper, { [st.notValid]: errors })}>
      <div className={classnames(st.label, { [st.fill]: snapshot.displayValue || snapshot.focus, [st.open]: snapshot.focus })}>
        <button
          type="button"
          {...valueProps}
          className={classnames(st.control, { [st.open]: snapshot.focus })}
        >
          <span title={snapshot.displayValue}>{snapshot.displayValue}</span>
          <Icon name="arrow-down" />
        </button>

        <CSSTransition
          in={snapshot.focus}
          classNames="toggle"
          timeout={{
            enter: 500,
            exit: 200
          }}
          unmountOnExit
        >
          <div className={st.content}>
            {
              search &&
              <div className={st.search}>
                <input
                  type="text"
                  {...valueProps}
                  placeholder="Start entering"
                />

                <span
                  className={st.count}
                >
                  {snapshot.value && snapshot.value.length > 0 && snapshot.value.length}
                </span>
              </div>
            }
            <ul
              className={st.list}
            >
              {
                getOptions().map(i => (
                  <li
                    className={classnames(st.item, { [st.selected]: multiple ? (snapshot.value && snapshot.value.find(val => val.value === i.value)) : (snapshot.value && snapshot.value.value === i.value) })}
                    key={i.value}
                  >
                    <button
                      type="button"
                      {...optionProps}
                      value={i.value}
                    >
                      {i.name}

                      {
                        multiple && snapshot.value && snapshot.value.find(val => val.value === i.value) &&
                        <Icon name="close" />
                      }
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </CSSTransition>

        {placeholder && <span className={st.placeholder}>{placeholder}</span>}
      </div>
      <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span>
    </div>
  );
};

export default CustomSelect;