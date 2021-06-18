import React, { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import classnames from 'classnames';

import { CSSTransition } from 'react-transition-group';

import './autocomplete.scss';

import Input from 'components/UI/Input';

const Autocomplete = ({
  placeholder,
  minLengthInput = 1,
  classNameWrap = null,
  className,
  children,
  onInput,
  onSelect,
  value,
  inputElement = null,
  ...props
}) => {
  const [ isSearching, setSearching ] = useState(false);
  const [ inputValue, setInput ] = useState(value || '');
  const [ isOpen, setOpen ] = useState(false);

  const popup = useRef();

  const handlerSelect = (e) => {
    setOpen(false);
    setSearching(false);

    onSelect(e);
  };

  const delayedQuery = useCallback(debounce(({target}) => {
    if (target.value.length >= minLengthInput) {
      onInput(target.value);
      setSearching(true);
    } else {
      setSearching(false);
      setOpen(false);
    }
  }, 250), []);

  const handlerInput = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearching(false);

    if (value) {
      delayedQuery({target: e.target});
    } else {
      onSelect('');
    }
  };

  const childElems = React.Children.toArray(children).map((i, index) => 
    <li
      key={i.key}
      onClick={() => i.props.value && handlerSelect(i.props.value)}
      className='esq-autocomplete__item'
    >{
        React.cloneElement(i, {
          searchValue: inputValue
        })
      }
    </li>);

  useEffect(() => {
    const handlerClickOut = (event) => {
        if (popup.current && !popup.current.contains(event.target)) {
          setOpen(false);
        }
    }

    document.addEventListener("mousedown", handlerClickOut);
    return () => {
        document.removeEventListener("mousedown", handlerClickOut);
    };
  }, [popup]);

  useEffect(() => {
    setSearching(false);
    setInput(value);
    setOpen(false);
  }, [value]);

  useEffect(() => {
    isSearching && setOpen(true);
  }, [children]);

  return (
    <div className={classnames('esq-autocomplete__container', classNameWrap)}>
      {
        inputElement ?
        React.cloneElement(inputElement, {
          value: inputValue,
          placeholder,
          onChange: handlerInput,
          className,
          ...props
        })
        :
        <Input
          value={inputValue}
          placeholder = {placeholder}
          onChange = {handlerInput}
          className={className}
          autoComplete="off"
          { ...props }
        />
      }

      <CSSTransition
        in={isOpen && childElems.length > 0}
        classNames="slide-down"
        timeout={{
          enter: 400,
          exit: 200
        }}
        unmountOnExit
      >
        <div
          className='esq-autocomplete__list'
          ref={popup}
        >
          <ul>
            { childElems }
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Autocomplete;