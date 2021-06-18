import React, { useState } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import Modal from 'components/UI/Modal';

import prepareDate from 'helpers/prepareDate';
import timePeriod from 'helpers/timePeriod';

import CheckBox from 'components/UI/Switcher';
import Button from 'components/UI/Button';

import lb from 'components/UI/Scheduler/lightbox.module.scss';
import st from './modalBook.module.scss';

// import CheckBox from 'components/UI/Radio';
import TimeZone from 'components/Elements/TimeZone';

import {CheckUserAuth} from 'helpers/auth';

const addZero = (number) => {
  const m = number;
  return m < 10 ? '0'+m:m;
};

const parseTime = (date) => {
  // const time = new Date(prepareDate(date));
  // return `${addZero(time.getHours())}:${addZero(time.getMinutes())}`;
  return new Date(date)
      .toLocaleTimeString('en-US',
        {
          hour: '2-digit',
          minute: 'numeric',
          timezone: 'UTC',
        }).toLocaleLowerCase();
};

const BookModal = ({ toOpen=false, eventsType, onClose, data, handlerBookingEvent }) => {
  // const { lawyer, event } = data;

  const { event } = data;
  const [eventType, setTypeEvent] = useState(event.types[0].id);

  const handlerForm = (e) => {
    e.preventDefault();
    handlerBookingEvent({
      schedule_id: event.id,
      type_id: eventType
    });
  };

  return (
    <Modal
      isOpen={toOpen}
      onClose={onClose}
    >
      <div className={classnames(lb.inner, st.modalBook)}>
        <form
          className={lb.form}
          onSubmit={handlerForm}
        >
          <div className={lb.input_row}>
            <p className={lb.input_title}>Time period</p>
            <div className={lb.input_wrap}>
              <p className="esq-medium">{timePeriod(event)}</p>
              <TimeZone className={lb.timeZone} />
            </div>
          </div>

          <div className={lb.input_row}>
            <p className={lb.input_title}>Event type</p>
            <div className={lb.input_wrap}>
              {
                event.types.map(i => {
                  const typeEv = eventsType
                    .find(ev => ev.id === i.id);

                  return (
                    <CheckBox
                      key={typeEv.id}
                      name="eventType"
                      value={typeEv.id}
                      className={lb.checkbox}
                      checked={eventType && eventType === typeEv.id}
                      onChange={({target}) => setTypeEvent(Number(target.value))}
                    >{typeEv.icon} {typeEv.name}</CheckBox>
                )})
              }
            </div>
          </div>

          {localStorage.getItem('mode') !== 'lawyer' ?
            (
            <div className={lb.formFooter}>
              <button
                type="button"
                className={classnames('esq-bold esq-warning')}
                onClick={onClose}
              >Cancel</button>

              {
                CheckUserAuth('user') ?
                <Button
                  type="submit"
                  className="esq-btn--outline"
                >
                  <span>Submit</span>
                </Button>
                :
                <Button
                  type="submit"
                  className="esq-btn--outline"
                >
                  <span>Register</span>
                </Button>
              }
            </div>
            )
            :
            (
              <p className={'esq-warning esq-semi'}>You can't reserved seanse on another lawyer. Please login like an User</p>
            )
          }
        </form>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ ref, user }) => ({
  // profile: user.profile,
  eventsType: ref.type
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // getStatus: actions.getStatus,
}, dispatch)

const mapToProps = connect(mapStateToProps,mapDispatchToProps);

export default mapToProps(BookModal);