import React from 'react';
import classnames from 'classnames';
import st from './listEvents.module.scss';

const HeaderList = ({columns, currentDate, onChange, className }) => {
  const getDates = () => {
    return [...Array(columns).keys()]
      .map((_, index) => {
        const date = new Date(currentDate);
        return new Date(date.setDate(date.getDate() + index));
      })
  };

  const nextDateInScheduller = () => {
    const current = new Date(currentDate);
    current.setDate(current.getDate() + 1);

    onChange({ current, direct: 'next' });
  };

  const prevDateInScheduller = () => {
    const current = new Date(currentDate);
    current.setDate(current.getDate() - 1);

    onChange({ current, direct: 'prev' });
  };

  return (
    <div className={classnames(st.date_selected, className)}>
      <button
        type="button"
        className={st.date_button}
        onClick={prevDateInScheduller}
        disabled={new Date(currentDate) <= new Date()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" fill="none" viewBox="0 0 6 15"><path stroke="#20C2D2" strokeWidth="2" d="M5 1L2 7.719l3 6.718" /></svg>
      </button>

      <div className={st.date_area}>
        {getDates()
          .map(date => (<div className={st.date_item} key={Math.random()}>{
            date.toLocaleDateString('en-US',
              {
                month: 'short',
                day: 'numeric',
                weekday: 'short',
                timezone: 'UTC',
              })
          }</div>))
        }
      </div>

      <button
        type="button"
        className={st.date_button}
        onClick={nextDateInScheduller}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" fill="none" viewBox="0 0 6 15"><path stroke="#20C2D2" strokeWidth="2" d="M1 1l3 6.719-3 6.718" /></svg>
      </button>
    </div>
  );
};

export default HeaderList;