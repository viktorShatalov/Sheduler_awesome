import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Validator } from 'ree-validate';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import AuthLayout from 'components/Layout/Auth';
import AuthLayoutStyles from 'components/Layout/Auth/authWrap.module.scss';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

import getRoleByURL from 'helpers/getRoleByURL';

import { lawyer } from 'setts/defaultRoutes';

class SignInLawyer extends React.Component {
  constructor() {
    super();

    this.validator = new Validator({
      email: 'required|email',
      password: 'required|min:6',
    });

    this.state = {
      enableSubmit: true,

      errors: this.validator.errors,

      toSend: {
        email: 'test@mail.com',
        // email: '',
        // password: '',
        password: 'Lo2oV34i',
      },
    };

    this.handlerInput = this.handlerInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

    this.validator.validate(name, value)
      .then(() => {
        this.setState({errors});
      });
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.state.enableSubmit) return;

    const {toSend} = this.state;
    const {errors} = this.validator;

    this.setState({enableSubmit: false});

    this.validator.validateAll(toSend)
      .then(valid => {
        if (!valid) {
          this.setState({errors});
          this.setState({enableSubmit: true});
          return;
        }

        this.props.loginLawyer(toSend)
          .then(res => {
            localStorage.setItem('mode', getRoleByURL(this.props.location.pathname));

            this.setState({isFormState: false})
            this.props.history.push({pathname: localStorage.getItem('lawyer-path') || lawyer});
          })
          .catch(e => {
            if (e && e.response && e.response.data && e.response.data.errors) {

              Object.entries(e.response.data.errors).forEach(([name, errors]) => {
                this.validator.errors.add({
                  field: name,
                  msg: errors.join(', ')
                });
              });

              this.setState({errors});
              this.setState({enableSubmit: true});
            }
          });
    });
  };

  render() {
    const { toSend, enableSubmit, errors } = this.state;

    return (
      <AuthLayout>
        <h2 className={classnames(AuthLayoutStyles.title, 'esq-h2')}>Login to your account</h2>

        <form
          onSubmit={this.submitForm}
          className={classnames(AuthLayoutStyles.form)}>
          <Input
            value={toSend.email}
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={this.handlerInput}
            onBlur={this.handlerInput}
            className={{
              wrapper: AuthLayoutStyles.input,
            }}
            errors={errors.first('email')}
          />
          <Input
            value={toSend.password}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={this.handlerInput}
            onBlur={this.handlerInput}
            className={{
              wrapper: AuthLayoutStyles.input,
            }}
            errors={errors.first('password')}
          />

          <p className={classnames('esq-center', AuthLayoutStyles.submit)}>
            <Button
              type="submit"
              disabled={!enableSubmit}
            >
              <span>Log in</span>
            </Button>
          </p>

          <div className={classnames('esq-info', AuthLayoutStyles.bottom)}>
            <p className="esq-center esq-small">
              If you don’t have an account yet, please
              <NavLink
                to="/lawyer/sign-up"
                className={classnames('esq-text esq-semi')}
              >
                Sign up
              </NavLink>
            </p>

            <p className="esq-center esq-small">
              Forgot your password?
              <NavLink
                to="/lawyer/recall"
                className={classnames('esq-text esq-semi')}
              >
                Recall
              </NavLink>
            </p>
          </div>

        </form>
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginLawyer: actions.loginLawyer,
}, dispatch)

const mapToProps = connect(null,mapDispatchToProps);

export default mapToProps(SignInLawyer);
