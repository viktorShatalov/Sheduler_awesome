import React, { Fragment } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Validator } from 'ree-validate';
import qs from 'query-string';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from 'redux-store/actions';

import AuthLayout from 'components/Layout/Auth';
import AuthLayoutStyles from 'components/Layout/Auth/authWrap.module.scss';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

// import getRoleByURL from 'helpers/getRoleByURL';

class NewPassword extends React.Component {
  constructor(props) {
    super();

    this.validator = new Validator({
      password: 'required|min:6',
      password_confirmation: 'required'
    });

    this.confRef = React.createRef();
    const search = qs.parse(props.location.search);

    this.state = {
      enableSubmit: true,
      isFormState: true,
      errors: this.validator.errors,
      model: search.model,

      toSend: {
        email: search.email,
        token: search.token,
        password: '',
        password_confirmation: '',
      },
    };

    this.handlerInput = this.handlerInput.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);

    this.resetPassword = search.model === 'user' ? props.resetUserPassword : props.resetLawyerPassword;
  }

  successfullyState() {
    return (
      <Fragment>
        <div className={AuthLayoutStyles.successfully}>
          <h2 className={classnames(AuthLayoutStyles.title, 'esq-h2')}>Successfully</h2>
          <p className={classnames(AuthLayoutStyles.subTitle, 'esq-reg')}>Password was changed</p>
          <p className={classnames('esq-center', AuthLayoutStyles.submit)}>
            <NavLink
              to={`/${this.state.model}/sign-in`}
              className={classnames('esq-btn esq-btn--outline')}><span>Sign in</span></NavLink>
          </p>
        </div>
      </Fragment>
    );
  }

  handlerInput({target}) {
    const { name, value } = target;
    const {errors} = this.validator;
    errors.remove(name);

    this.setState((prevState) => ({
      toSend: {
        ...prevState.toSend,
        [name]: value,
      },
    }));

    if (name === 'password_confirmation' && value.trim() !== '') {
      if (this.state.toSend.password !== value) {
        errors.add({
          field: 'password_confirmation',
          msg: 'The password confirmation does not match.'
        });

        this.setState({errors});
      }
    } else {
      this.validator.validate(name, value)
        .then(() => {
          this.setState({errors});
        });
    }
  }

  handlerSubmit(e) {
    e.preventDefault();
    if (!this.state.enableSubmit) return;

    this.setState({enableSubmit: false});

    const { toSend } = this.state;
    const {errors} = this.validator;

    this.validator.validateAll(toSend)
      .then(valid => {
        if (!valid) {
          this.setState({errors});
          return;
        }

        this.setState({isFormState: false});

        this.resetPassword(toSend)
          .then(res => this.setState({isFormState: false}))
          .catch(e => {
            if (e && e.response && e.response.data && e.response.data.errors) {
              Object.entries(e.response.data.errors).forEach(([name, errors]) => {
                this.validator.errors.add({
                  field: name,
                  msg: errors.join(', ')
                });
              });

              this.setState({errors});
            }
          })
          .finally(() => {
            // hide spinner
            this.setState({enableSubmit: true});
          });
      })
  }

  formOut() {
    const { toSend, errors, enableSubmit } = this.state;

    return (
      <Fragment>
        <h2 className={classnames(AuthLayoutStyles.title, 'esq-h2')}>Enter a new password</h2>

        <form
          onSubmit={this.handlerSubmit}
          className={classnames(AuthLayoutStyles.form)}
        >
          <Input
            value={toSend.password}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={this.handlerInput}
            className={{
              wrapper: AuthLayoutStyles.input,
            }}
            onBlur={this.handlerInput}
            errors={errors.first('password')}
          />
          <Input
            value={toSend.password_confirmation}
            name="password_confirmation"
            type="password"
            ref={this.confRef}
            placeholder="Confirm the password"
            autoComplete="new-password"
            onChange={this.handlerInput}
            className={{
              wrapper: AuthLayoutStyles.input,
            }}
            onBlur={this.handlerInput}
            errors={errors.first('password_confirmation')}
          />

          <p className={classnames('esq-center', AuthLayoutStyles.submit)}>
            <Button
              type="submit"
              disabled={!enableSubmit}
            >
              <span>Save password</span>
            </Button>
          </p>

        </form>
      </Fragment>
    )
  }

  render() {
    const { isFormState } = this.state;

    return (
      <AuthLayout>
        {
          isFormState ? this.formOut() : this.successfullyState()
        }

      </AuthLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetUserPassword: actions.resetUserPassword,
  resetLawyerPassword: actions.resetLawyerPassword,
}, dispatch)

const mapToProps = connect(null,mapDispatchToProps);

export default mapToProps(NewPassword);
