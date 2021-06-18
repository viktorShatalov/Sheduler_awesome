import React, { Fragment } from 'react';
import InputMask from 'react-input-mask';

import Input from 'components/UI/Input';

const PhoneInput = ({ value, name, className, onChange, ...propses }) => {
  const ref = React.useRef(null);

  const handlerInput = (e) => {
    // const { name, value } = target;

    onChange(e);
  };

  return (
    <Fragment>
      <InputMask
        mask="(999) 999-9999"
        permanents={[0,4,5,9]}
        onChange={ handlerInput }
        value={value}
        {...propses}
      >
        { 
          (inputProps) => <Input
            {...inputProps}
            ref={ref}
            type="tel"
            name={name}
            className={ className }
          />
        }
      </InputMask>
    </Fragment>
  );
};

export default PhoneInput;