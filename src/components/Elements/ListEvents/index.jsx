import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import st from './listEvents.module.scss';

import { useParams } from 'react-router-dom';

import HeaderList from './HeaderList';
import BodyList from './BodyList';

import unique from 'helpers/unique';

import { getLawyerSchedules } from 'api/web';
import Spinner from 'components/Elements/Spinner';

const ListEvents = ({ lawyer, onShowMore=null, onOpenBook, options, fullState = false }) => {
  const defaultSetts = {
    columns: 3,
    toSlice: 10
  };

  const params =  useParams();
  const {slug} = lawyer.slug ? lawyer : params;

  const setts = { ...defaultSetts, ...options };

  const [ events, addEvents ] = useState([]);
  const [ currentDateInScheduller, setDateInScheduller ] = useState(new Date());
  const [ columns, setColumns ] = useState([]);
  const [ currIndex, setCurrIndex ] = useState(0);
  const [ isFullState, setFullState ] = useState(false);
  const [ maxDate, setMaxDate ] = useState(setts.columns * 2);
  const [ showSpinner, setShowSpinner ] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    
    const colDays = [...Array(setts.columns).keys()].map((_, index) => {
      const date = new Date();
      return new Date(date.setDate(date.getDate() + index)).toISOString().split('T')[0];
    });

    setColumns(colDays);

    getLawyerSchedules({
      slug,
      date_start: new Date(new Date().setDate(new Date().getDate())),
      date_end: new Date(new Date().setDate(new Date().getDate() + setts.columns * 3))
    })
      .then(({data}) => {
        addEvents(unique([...events, ...data.data]));
        setShowSpinner(false);
      });
  }, [slug]);

  const adaptEvents = events.reduce((obj, event) => {
    const key = new Date(event.date_start).toISOString().split('T')[0];

    return {...obj, [key]: obj[key] ? obj[key].concat(event) : [event]};
  }, {});

  const resultEvents = columns.reduce((acc, key) => {
    if (key in adaptEvents) {
      return { ...acc, [key]: adaptEvents[key] };
    } else {
      return { ...acc, [key]: [] };
    }
  }, {});

  const handlerShowMore = () => {
    console.log(onShowMore);
    
    if (onShowMore && onShowMore.func) onShowMore.func();

    setFullState(true);
  };

  const handlerChangeDate = ({ current, direct }) => {
    setDateInScheduller(current);
    const index = direct === 'prev' ? currIndex - 1 : currIndex + 1;

    setCurrIndex(index);

    const colDays = [...Array(setts.columns).keys()].map((_, index) => {
      const date = new Date(current);
      return new Date(date.setDate(date.getDate() + index)).toISOString().split('T')[0];
    });

    setColumns(colDays);

    if( maxDate === index + setts.columns) {
      setMaxDate(maxDate + setts.columns * 2);

      getLawyerSchedules({
        slug,
        date_start: new Date(current),
        date_end: new Date(new Date().setDate(new Date(current).getDate() + setts.columns * 3))
      })
        .then(({data}) => {
          addEvents(unique([...events, ...data.data]));
        });
    }
  };

  return (
    <div className={classnames(st.list_events, {[st.fullState]: isFullState})}>
      <HeaderList
        columns={setts.columns}
        currentDate={currentDateInScheduller}
        onChange={handlerChangeDate}
        className={st.header}
      />

      <BodyList
        columns={setts.columns}
        toSlice={setts.toSlice}
        events={resultEvents}
        fullState={fullState}
        onOpenBook={(event) => onOpenBook({lawyer, event})}
        onShowMore={{func: handlerShowMore, preventDef: onShowMore && onShowMore.preventDef}}
      />

      <Spinner isVisible={showSpinner} />
    </div>
  );
};

export default ListEvents;