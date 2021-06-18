import React, { Component } from 'react';
import classnames from 'classnames';
// import onClickOutside from 'react-onclickoutside';
import { CSSTransition } from 'react-transition-group';

import st from './select.module.scss';
import Icon from 'components/UI/Icon';

class Select extends Component {
  state = {
    current: this.getDefault(),
    isOpen: false,
    fill: this.props.defaultValue,
  };

  // setts = {...this.defaultOption, ...this.props.options};

  selected = React.createRef();
  list = React.createRef();
  wrapper = React.createRef();

  handlerClickOutside = this.handlerClickOutside.bind(this);

  componentDidUpdate() {
    if (this.state.current.value === this.props.defaultValue) return;
    this.setState({
      current: this.getDefault()
    });
  };

  setSelectedValue(option) {
    this.setState({
      current: option,
      // isOpen: false
    });
  };

  getDefault() {
    const {options, defaultValue} = this.props;
    // if (defaultValue) this.setState({fill: true});

    return (defaultValue && options.find(i => i.value === defaultValue)) || { label: '' };
  };

  getPosition(e) {
    const list = this.list.current;

    const pos = list.getBoundingClientRect();

    let action = 'remove';

    if (pos.bottom + 20 > window.innerHeight) {
      list.style.top = 'auto';
      list.style.bottom = 'calc(100% + 10px)';
      action = 'add';
    }

    list.classList[action]('select-list-position-bottom');

    this.selected.current && this.selected.current.scrollIntoView({
      // block: 'center'
      block: 'nearest'
    });
  };

  handlerClickOutside(e) {
    if (this.wrapper.current && this.wrapper.current.contains(e.target)) return;

    const { onBlur } = this.props;
    this.setState({
      ...this.state,
      isOpen: false
    });

    if (onBlur && typeof onBlur === 'function') onBlur();
  }

  componentWillMount() {
    const { onChange, name } = this.props;

    onChange({target:{name, value: this.state.current.value}});
  }

  handlerSelect(option, e) {
    e.stopPropagation();
    const { onChange, onBlur, name } = this.props;

    this.setState({
      current: option,
      isOpen: false
    });

    this.setState({fill: true});

    onChange({target:{name, value: option.value}});

    if (onBlur && typeof onBlur === 'function') onBlur();
  };

  handlerOpen() {
    const { onFocus } = this.props;

    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });

    if (onFocus && typeof onFocus === 'function') onFocus();
  };

  addClickOutside() {
    document.addEventListener('click', this.handlerClickOutside, false);
  };

  removeClickOutside(e) {
    document.removeEventListener('click', this.handlerClickOutside);
  };

  render() {
    const { options, className, errors, placeholder } = this.props;
    const { current, isOpen, fill } = this.state;

    return (
      <div
        ref={this.wrapper}
        className={classnames(st.container, className, { [st.notValid]: errors })}>
        <div className={classnames(st.label, { [st.fill]: fill, [st.open]: isOpen} )}>
          <button 
            type="button"
            className={classnames(st.control, {[st.open]: isOpen})}
            onClick={this.handlerOpen.bind(this)}
          >
            <span title={ current.label }>{current.icon && current.icon}{ current.label }</span>
            <Icon name="arrow-down" /></button>

          <CSSTransition
            in={isOpen}
            classNames="toggle"
            timeout={{
              enter: 500,
              exit: 200
            }}
            onEntered={this.addClickOutside.bind(this)}
            onExit={this.removeClickOutside.bind(this)}
            onEntering={(e) => this.getPosition(e)}
            unmountOnExit
          >
            <ul
              ref={this.list}
              className={st.list}
            >
              { options.map(i => (
                <li
                  className={classnames(st.item, {[st.selected]: i.value === current.value})}
                  key={i.label}
                  ref={i.value === current.value ? this.selected : null}
                  onClick={this.handlerSelect.bind(this, i)}>{i.icon && i.icon}{i.label}</li>
              )) }
            </ul>
          </CSSTransition>
          { placeholder && <span className={st.placeholder}>{placeholder}</span> }
        </div>
        <span className={classnames(st.errors, 'esq-error-msg')}>{errors}</span>
      </div>
    );
  };
};

// export default onClickOutside(Select);
export default Select;