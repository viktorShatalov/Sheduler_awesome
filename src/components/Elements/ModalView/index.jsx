import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'components/UI/Modal';
import st from './modalView.module.scss';
import { Link } from 'react-router-dom';
import LazyLoadImg from 'components/UI/LazyLoadImg';
import mergeSelected from 'helpers/prepareFromSelect';
import FreeTime from 'components/Elements/FreeTime';
import Rating from 'components/UI/Rating';
import {getLawyerSchedules} from 'api/web';
import moment from 'moment';
import classnames from 'classnames';
import Spinner from 'components/Elements/Spinner';

const RATING = 4.5;

const createViewDates = (start) => {
  let arr = [];

  for (let i = 0; i < 7; i++) {
    arr.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
  }

  return arr;
}

const ModalView = ({ toOpen = false, onClose, lawyer, isMobileState, onOpenBook, eventsType }) => {
  const name = `${lawyer.first_name} ${lawyer.last_name}`;
  const [schedules, setSchedules] = useState({});
  const [showSpinner, setSpinner] = useState(false);
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(new Date()).add(6, 'days').format('YYYY-MM-DD'));
  const [viewDates, setViewDates] = useState(createViewDates(new Date()));
  
  useEffect(() => {
    setSpinner(true);
    setEndDate(moment(startDate).add(6, 'days').format('YYYY-MM-DD'));
    setViewDates(createViewDates(startDate));

    getLawyerSchedules({
      slug: lawyer.slug,
      date_start: startDate,
      date_end: moment(startDate).add(6, 'days').format('YYYY-MM-DD')
    })
      .then(res => {
        formatSchedules(res.data.data);
        setSpinner(false);
      })
      .catch(err => {
        setSpinner(false);
      })
  }, [startDate]);

  const formatSchedules = (events) => {
    let res = events.reduce((obj, event) => {
      const key = new Date(event.date_start).toISOString().split('T')[0];
  
      return {...obj, [key]: obj[key] ? obj[key].concat(event) : [event]};
    }, {});

    setSchedules(res);
  }

  const outEventBtn = (event) => {
    const evTypes = eventsType
      .filter(ev => event.types.map(i => i.id).includes(ev.id))
      .map(ev => (<span key={ev.id} className={st.view_list_item_icon}>{ev.icon}</span>));

    return (
      <button
        type="button"
        className={st.view_list_item_btn}
        onClick={() => onOpenBook(event)}
      >
        <span>{evTypes}</span>
        <span className={st.view_list_item_text}>{moment(event.date_start).format('hh:mm A')}</span>
      </button>
    );
  };

  const handlePrev = () => {
    setStartDate(moment(startDate).subtract(7, 'days').format('YYYY-MM-DD'));
  }

  const handleNext = () => {
    setStartDate(moment(startDate).add(7, 'days').format('YYYY-MM-DD'));
  }

  return (
    <Modal
      isOpen={!!toOpen}
      onClose={onClose}
    >
      <div className={st.container}>
        <div className={st.lawyer_info}>
          <div className={st.lawyer_avatar}>
            <Link to={`/view-profile/${lawyer.slug}`}>
              <LazyLoadImg
                alt={name}
                src={lawyer.avatar}
                effect="blur"
              />
            </Link>
          </div>
          <div className={st.lawyer_note}>
            <Rating
              className={st.lawyer_rating}
              rating={RATING}
            />
            <div className={st.lawyer_name}>
              <Link to={`/view-profile/${lawyer.slug}`}>{name}</Link>
              <FreeTime 
                time={`${lawyer.service.free} min`}
                className={st.lawyer_free} 
              />
            </div>
            <p className={st.lawyer_ocupation}>{mergeSelected(lawyer.service.occupations)}</p>
          </div>
        </div>
        <div className={st.view}>
          <Spinner isVisible={showSpinner} />
          <div className={st.view_top}>
            <p className={st.view_top_period}>{moment(startDate).format('MMM DD')} - {moment(endDate).format('MMM DD')}</p>
            <button
              className={st.view_top_prev}
              onClick={handlePrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" fill="none" viewBox="0 0 6 15"><path stroke="#20C2D2" strokeWidth="2" d="M5 1L2 7.719l3 6.718" /></svg>
            </button>
            <button
              className={st.view_top_next}
              onClick={handleNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" fill="none" viewBox="0 0 6 15"><path stroke="#20C2D2" strokeWidth="2" d="M1 1l3 6.719-3 6.718" /></svg>
            </button>
          </div>
          <ul className={st.view_list}>
            {viewDates.map(date => (
              <li
                key={date}
                className={st.view_list_item}
              >
                <p>{moment(date).format('ddd, MMM D')}</p>
                {schedules[date] && schedules[date].length ? (
                  <ul>
                    {schedules[date].map(event => (
                      <li
                        key={event.id}
                        className={classnames({
                          [st.disabled]: !moment(event.date_start).isAfter(new Date())
                        })}
                      >
                        {outEventBtn(event)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No availability</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ ref, user }) => ({
  eventsType: ref.type
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch);

const mapToProps = connect(mapStateToProps,mapDispatchToProps);

export default mapToProps(ModalView);