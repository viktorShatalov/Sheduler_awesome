import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import classnames from 'classnames';

import st from './listEvents.module.scss';
import prepareDate from 'helpers/prepareDate';

// import eventsType from 'moks/eventsTypes'

const BodyList = ({events, columns = 1, eventsType, toSlice, onOpenBook, onShowMore=null }, ref) => {
  const maxLength = Math.max(...Object.values(events).map(el => el.length), 0);

  const [ isFullState, setFullState ] = useState(false);

  const handlerShowMore = () => {
    // console.log(onShowMore);

    if (!onShowMore) {
      setFullState(true);
      return;
    }

    if (onShowMore.preventDef) {
      onShowMore.func && onShowMore.func();
      return;
    }

    onShowMore.func && onShowMore.func();
    setFullState(true);
  };

  const outEventBtn = (event) => {
    const evTypes = eventsType
      .filter(ev => event.types.map(i => i.id).includes(ev.id))
      .map(ev => (<span key={ev.id} className={st.events_icon}>{ev.icon}</span>));

    const current = new Date(prepareDate(event.date_start))
      .toLocaleTimeString('en-US',
        {
          hour: 'numeric',
          minute: 'numeric',
          timezone: 'UTC',
        }).toLocaleLowerCase();

    return (
      <button
        type="button"
        className={st.events_item}
        onClick={(e) => {
          e.stopPropagation();
          onOpenBook(event)
        }}
      >
        <span className={st.events_iconWrap}>{evTypes}</span>
        {current}</button>
    );
  };

  const shortList = () => {
    return Object.values(events).map(day => (
      <ul key={Math.random()}>
        {
          day.filter((_, index) => index < toSlice).map(i => (
            <li key={i.id}>
              { outEventBtn(i) }
            </li>
          ))
        }
        {
          toSlice > day.length && [...Array(toSlice - day.length).keys()]
            .map(() => (
              <li key={Math.random()} className={st.events_empty}>&minus;</li>
            ))
        }

        {maxLength > toSlice &&
          <li className='esq-body--more'>
            <button
              className={classnames(st.events_item, st.events_more)}
              type="button"
              onClick={handlerShowMore}
            >more</button>
          </li>
        }
      </ul>
    ));
  };

  const fullList = () => {
    return Object.values(events).map(day => (
      <ul key={Math.random()}>
        {
          day.map(i => (
            <li key={i.id}>
              {outEventBtn(i)}
            </li>
          ))
        }
        {
          [...Array(maxLength - day.length).keys()]
            .map(() => (
              <li key={Math.random()} className={st.events_empty}>&minus;</li>
            ))
        }
      </ul>
    ));
  };

  return (
    <div className={classnames(st.events, {
        [st.fullState]: isFullState,
        'esq-events-list__columns': columns > 1
      })} ref={ref}>
      { isFullState ? fullList() : shortList() }
    </div>
  );
};

const mapStateToProps = ({ ref, user }) => ({
  // profile: user.profile,
  eventsType: ref.type
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getStatus: actions.getStatus,
}, dispatch)

// const mapToProps = connect(mapStateToProps,mapDispatchToProps);

const connectAndForwardRef = (
  mapStateToProps = null,
  mapDispatchToProps = null,
  mergeProps = null,
  options = {},
) => component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    ...options,
    forwardRef: true,
  },
)(React.forwardRef(component));

export default connectAndForwardRef(mapStateToProps,mapDispatchToProps)(BodyList);