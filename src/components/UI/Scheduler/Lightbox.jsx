import React, { useState, useEffect } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import classnames from 'classnames';

import lb from './lightbox.module.scss';

import timePeriod from 'helpers/timePeriod';

import Icon from 'components/UI/Icon';
import Select from 'components/UI/SelectCustom';
import Button from 'components/UI/Button';
import Switcher from 'components/UI/Switcher';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImgPlaceholder from 'assets/img/image-placeholder.svg';
import TimeZone from 'components/Elements/TimeZone';

import Rating from 'components/UI/Rating';

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

const prepareDays = () => [ ...Array(31).keys() ]
  .map(i => ({value: String(i+1), label: String(i+1)}));

const prepareMonths = () => ["January","February","March","April","May","June","July","August","September","October","November","December"].map((i, index) => ({
  value: String(index),
  label: i
}));

const prepareYears = () => {
  const time = new Date().getFullYear();

  return [ ...Array(10).keys() ]
    .map((i, index) => ({
      value: String(time + index),
      label: String(time + index)
    }));
};

const parseTime = (date) => {
  const addZero = (time) => {
    let split = time.split(':');

    if (time[0] !== '0' && Number(split[0]) < 10)
      time = `0${time}`;

    return time;
  }

  let t = new Date(date)
    .toLocaleTimeString('en-US',
      {
        hour: '2-digit',
        minute: 'numeric',
        timezone: 'UTC',
      }).toLocaleLowerCase();

  return addZero(t);
};

const parseDay = (date) => {
  const time = new Date(date);

  return String(time.getDate());
};

const parseMonth = (date) => {
  const time = new Date(date);

  return String(time.getMonth());
};

const parseYear = (date) => {
  const time = new Date(date);

  return String(time.getFullYear());
};

const handleToTime = (timeArr, start) => {
  let curTime = new Array(...timeArr);
  let index = curTime.findIndex(item => item.value === start);

  return curTime.splice(index + 1);
}

const Lightbox = ({ isNew, lightbox, eventsType, time, onClose, saveEvent, removeEvent, scheduler}) => {
  const [text, setText] = useState(lightbox.text || '');
  const [eventType, setTypeEvent] = useState(lightbox.eventType || []);
  const [startHours, setStartHours] = useState(parseTime(lightbox.start_date));
  const [startDay, setStartDay] = useState(parseDay(lightbox.start_date));
  const [startMonth, setStartMonth] = useState(parseMonth(lightbox.start_date));
  const [startYear, setStartYear] = useState(parseYear(lightbox.start_date));

  const [endHours, setEndHours] = useState(parseTime(lightbox.end_date));
  const [endDay, setEndDay] = useState(parseDay(lightbox.end_date));
  const [endMonth, setEndMonth] = useState(parseMonth(lightbox.end_date));
  const [endYear, setEndYear] = useState(parseYear(lightbox.end_date));
  const [state, setState] = useState(lightbox.state || 'opened');
  const [bookingId] = useState(lightbox.bookingId || null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [fromTime, setFromTime] = useState(new Array(...time).slice(0, -1));
  const [toTime, setToTime] = useState(handleToTime(time, startHours))

  const scrollBlock = React.useRef(null);
  // const firstInput = React.useRef(null);

  useEffect(() => {
    if (!(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)))
    disableBodyScroll(scrollBlock.current, {reserveScrollBarGap: true});

    return () => {
      if (!(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)))
      clearAllBodyScrollLocks();
    }
  }, [lightbox]);

  useEffect(() => {
    if (!toTime.find(item => item.value === endHours)) {
      setEndHours(toTime[0].value);
    }
  }, [toTime]);

  useEffect(() => {
    scheduler.setCurrentView(new Date(startYear, startMonth ,startDay));
  }, [startDay, startMonth, startYear]);

  const handlerSaveEvent = (e) => {
    e.preventDefault();
    setSaved(true);

    if (!eventType.length)
      return;
    
    const start_date = new Date(startYear, startMonth ,startDay, ...convertTime12to24(startHours).split(':'), 0);
    const end_date = new Date(endYear, endMonth, endDay, ...convertTime12to24(endHours).split(':'), 0);

    if (endHours === '12:00 am')
      end_date.setDate(end_date.getDate() + 1);

    const event = {text,eventType,start_date,end_date,state,bookingId};

    if (!bookingId || !scheduler.getEvents().find(item => item.id === lightbox.id)) {
      if (new Date(event.start_date) < new Date()) {
        setError('Selected time is expired. Please select other time period');
        return;
      }

      if (!scheduler.checkCollision(event)) {
        setError('Selected time has collision with existing event(s). Please select other time period');
        return;
      }
    }
  
    saveEvent(event);
  };

  const handlerSwitchTypeEvent = ({target}) => {
    if  (target.checked) {
      setTypeEvent([...eventType, Number(target.value)]);
    } else {
      setTypeEvent(eventType.filter(ev => ev !== Number(target.value)))
    }
  };

  const handleSetStart = (e) => {
    setStartHours(e.target.value);
    setError('');
    setToTime(handleToTime(time, e.target.value));
  }

  const handleSetEnd = (e) => {
    setEndHours(e.target.value);
    setError('');
  }

  return (
    <div
      ref={scrollBlock}
      className={classnames(lb.container)}
    >
      <button
        type="button"
        className={lb.buttonClose}
        onClick={onClose}
      >
        <Icon name="close" />
      </button>

      <div className={lb.inner}>
          {lightbox.state === 'new' || !lightbox.state || isNew ? (
            <form
              className={lb.form}
              onSubmit={handlerSaveEvent}
            >
              <div className={lb.input_row}>
                <p className={lb.input_title}>Time period</p>
                <div className={lb.input_wrap}>
                  <div className={lb.input_selectGroup}>
                    <Select
                      name="startDay"
                      className={classnames(lb.selectDay, lb.input_selectItem)}
                      defaultValue={startDay}
                      options={prepareDays()}
                      onChange={(e) => {
                        setStartDay(e.target.value);
                        setEndDay(e.target.value);
                        setError('');
                      }}
                    />
                    <Select
                      name="startMonth"
                      className={classnames(lb.selectMonth, lb.input_selectItem)}
                      defaultValue={startMonth}
                      options={prepareMonths()}
                      onChange={(e) => {
                        setStartMonth(e.target.value);
                        setEndMonth(e.target.value);
                        setError('');
                      }}
                    />
                    <Select
                      name="startYear"
                      className={classnames(lb.selectYear, lb.input_selectItem)}
                      defaultValue={startYear}
                      options={prepareYears()}
                      onChange={(e) => {
                        setStartYear(e.target.value);
                        setEndYear(e.target.value);
                        setError('');
                      }}
                    />
                  </div>
                  <div className={lb.input_selectGroup}>
                    <span>from</span>
                    <Select
                      name="startHours"
                      className={classnames(lb.selectTime, lb.input_selectItem)}
                      defaultValue={startHours}
                      options={fromTime}
                      onChange={handleSetStart}
                    />
                    <span>to</span>
                    <Select
                      name="endHours"
                      className={classnames(lb.selectTime, lb.input_selectItem)}
                      defaultValue={endHours}
                      options={toTime}
                      onChange={handleSetEnd}
                    />
                  </div>
                  <TimeZone className={lb.timeZone} />
                </div>

                {saved && error && (
                  <p className={lb.input_error}>{error}</p>
                )}
              </div>

              <div className={lb.input_row}>
                <p className={lb.input_title}>Event type</p>
                <div className={lb.input_wrap}>
                  {saved && !eventType.length && (
                    <p className={lb.input_error}>Please choose Event type</p>
                  )}
                  
                  {
                    eventsType.map(i => (
                      <Switcher
                        key={i.id}
                        name="eventType"
                        value={i.id}
                        className={lb.checkbox}
                        checked={eventType.find(ev => ev === i.id) || false}
                        onChange={handlerSwitchTypeEvent}
                      >{i.icon} {i.name}</Switcher>
                    ))
                  }
                </div>
              </div>

              {
                lightbox.client &&
                <div className={lb.input_row}>
                  <p className={lb.input_title}>Client</p>
                  <div className={lb.input_wrap}>
                    <LazyLoadImage
                      src={lightbox.client.avatar}
                      alt={lightbox.client.name}
                      height="35"
                      width="35"
                      placeholderSrc={ImgPlaceholder}
                      className={lb.avatar}
                    />
                    <span>{lightbox.client.name}</span>

                    <div>
                      <Rating rating={3.25} />
                    </div>
                  </div>
                </div>
              }

              <div className={lb.formFooter}>
                <button
                  type="button"
                  className={classnames('esq-bold esq-warning')}
                  onClick={removeEvent}
                >Delete</button>

                <Button
                  type="submit"
                  className="esq-btn--outline"
                ><span>Save</span></Button>
              </div>
            </form>
          ) : (
            <div
              className={lb.form}
            >
              <div className={lb.input_row}>
                <p className={lb.input_title}>Time period</p>
                <div className={lb.input_wrap}>
                  <p className="esq-medium">{timePeriod(lightbox)}</p>
                  <TimeZone className={lb.timeZone} />
                </div>
              </div>

              <div className={lb.input_row}>
                <p className={lb.input_title}>Event type</p>
                <div className={lb.input_wrap}>
                  {
                    eventsType.map(i => eventType.find(ev => ev === i.id) && (
                      <p
                        key={i.id}
                      >{i.icon} {i.name}</p>
                    ))
                  }
                </div>
              </div>

              { lightbox.client && (
                <div className={lb.input_row}>
                  <p className={lb.input_title}>Client</p>
                  <div className={classnames(lb.input_wrap, lb.input_selectGroup)}>
                    <LazyLoadImage
                      src={lightbox.client.avatar}
                      alt={lightbox.client.name}
                      height="35"
                      width="35"
                      placeholderSrc={ImgPlaceholder}
                      className={lb.avatar}
                    />
                    <span>{lightbox.client.name}</span>

                    <Rating rating={3.25} className={lb.rating} />
                  </div>
                </div>
              )}

              {lightbox.state === 'not-confirmed' && (
                <div className={lb.formFooter}>
                  <button
                    type="button"
                    className={classnames('esq-bold esq-warning')}
                    onClick={removeEvent}
                  >Not to accept</button>

                  <Button
                    type="submit"
                    className="esq-btn--outline"
                    onClick={handlerSaveEvent}
                  ><span>To accept</span></Button>
                </div>
              )}
            </div>
          )}
         
      </div>
    </div>
  );
};

export default Lightbox;