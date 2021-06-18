import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({
  type = 'button', className, children, ...props
}) => (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      {...props}
      className={classnames(className, 'esq-btn')}
    >
      { children }
    </button>
);

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
}

Button.defaultProps = {
  type: 'button',
  className: null,
  children: null,
};

export default Button;
