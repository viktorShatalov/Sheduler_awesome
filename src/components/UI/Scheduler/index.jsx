import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_container_autoresize';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_collision';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_limit';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_minical';

import st from './scheduler.module.scss';

import './overwrite.scss';
import './overwrite-calendar.scss';
import Icon from 'components/UI/Icon';

import Lightbox from './Lightbox';

import ClassEvent from './classEvent';
import RenderEvent from './renderEvent';

import addZero from 'helpers/addZero';
// import { config } from 'react-transition-group';

const scheduler = window.scheduler;

const HoursSchedule = {
  start: 6,
  // start: 6,
  // end: 18
  end: 24
}

const STEP_MINUTES = 15;

const prepareHours = () => {
  const time = [];
  const date = new Date((new Date()).setHours(HoursSchedule.start,0,0,0));

  for (var i = 0; i <= (HoursSchedule.end - HoursSchedule.start) * (60/STEP_MINUTES); i++) {
    const formTime = addZero(date.getHours()) + ':' + (addZero(date.getMinutes()));
    time.push({value: formTime, label: formTime});
    date.setMinutes ( date.getMinutes() + STEP_MINUTES);
  };

  const tConvert = (time) => {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];
  
    if (time.length > 1) {
      time = time.slice(1);

      time[5] = Number(time[0]) < 12 ? ' am' : ' pm';
      time[0] = addZero(Number(time[0] % 12 || 12));
    }
    return time.join('');
  }

  return time.map(({value, label}) => ({value: tConvert(value), label: tConvert(label)}));
};

class ScheduleLawyer extends Component {
  constructor(props) {
    super();

    this.state = {
      lightbox: {},
      isNew: false,
      openLightbox: false,
      // didMount: false,
      period: {
        start: null,
        end: null
      },
      calendarOpen: false
    };

    this.schedulerLightbox = React.createRef(null);

    this.createEvent = this.createEvent.bind(this);
    this.cloneEvent = this.cloneEvent.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.handlerAddEvent = this.handlerAddEvent.bind(this);
    this.closeLigtbox = this.closeLigtbox.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);

    this.resetConfig = this.resetConfig.bind(this);
    this.initSchedulerEvents = this.initSchedulerEvents.bind(this);
    this.updateEventsList = this.updateEventsList.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);

    props.getStatus();
  };

  componentDidMount() {
    this.configScheduler();
    this.initSchedulerEvents();
    this.initLightbox();

    scheduler.init(this.schedulerContainer, Date.now(), localStorage.getItem('defaultView') || 'day');

    scheduler.clearAll();
// scheduler.parse(events);

    const { events } = this.props;
    
    if (!events.length) {
      let schedulerState = scheduler.getState();

      this.updateEventsList(schedulerState.min_date, schedulerState.max_date);
    }
  };

  componentWillUnmount() {
    this.closeLigtbox();
  };

  resetConfig() {
    if (window.innerWidth <= 600) {
      scheduler.xy.nav_height = 90;
      scheduler.xy.scale_height = 32;
      scheduler.xy.scale_width = 40;
      scheduler.xy.margin_left = 0;
      scheduler.xy.scroll_width = 0;
      scheduler.xy.menu_width = 40;
      scheduler.config.hour_size_px = 74;

      // scheduler.config.day_date = "%F %j";
      scheduler.config.week_date="%D";

      scheduler.xy.min_event_height = 60;
      scheduler.xy.bar_height = 30;

      scheduler.config.header = {
        rows: [
          { 
              cols: [
                  "prev",
                  "date",
                  "next",
              ]
          },
          { 
              cols: [
                  "day",
                  "week",
                  "month",
                  // "spacer",
              ]
          }
        ]
      };
    } else {
      scheduler.xy.nav_height = 80;
      scheduler.xy.scale_height = 36;
      scheduler.xy.scale_width = 74;
      scheduler.xy.margin_left = 0;
      scheduler.xy.scroll_width = 0;
      scheduler.xy.menu_width = 40;
      scheduler.config.hour_size_px = 132;

      // scheduler.config.day_date = "%F %j";

      scheduler.config.header = [
        'day',
        'week',
        'month',
        // 'date',
        'spacer',
        'prev',
        // 'today',
        'date',
        'next'
      ];
    }
    
    scheduler.config.default_date = "%D, %M %j";
    scheduler.config.day_date = "%D, %M %j";
    scheduler.config.hour_date="%h:%i %A";

    scheduler.config.mark_now = true;

    scheduler.config.details_on_dblclick = true;
    scheduler.config.edit_on_create = false;

    scheduler.config.max_month_events = 5;
    // scheduler.config.collision_limit = 1;

    scheduler.config.separate_short_events = true;
    scheduler.config.time_step = STEP_MINUTES;

    scheduler.xy.min_event_height = 16;

    return true;
  };

  configScheduler() {
    scheduler.config.first_hour = HoursSchedule.start;
    scheduler.config.last_hour = HoursSchedule.end;

    scheduler.config.now_date = Date.now();
    scheduler.config.start_date = Date.now();

    this.resetConfig();
    scheduler.attachEvent("onBeforeViewChange", this.resetConfig);
    scheduler.attachEvent("onSchedulerResize", this.resetConfig);

    scheduler.skin = 'material';

    scheduler.templates.event_bar_text = () => '';

    scheduler.templates.event_class = ClassEvent;
    scheduler.renderEvent = RenderEvent;
  }

  initSchedulerEvents() {
    if (scheduler._$initialized) {
        return;
    }

    const onDataUpdated = this.props.onDataUpdated;

    scheduler.locale.labels.icon_clone = 'Clone event';
    scheduler._click.buttons.clone = (id) => {
      let event = scheduler.getEvent(id);
      
      if (event)
        this.cloneEvent(event);
    }

    // scheduler.attachEvent('onClick', (id) => {
    //   let event = scheduler.getEvent(id);

    //   if (event.state === 'new') 
    //     scheduler.config.icons_select = ['icon_details', /*'icon_edit', */'icon_delete'];
    //   else
    //     scheduler.config.icons_select = ['icon_details'];

    //   return true;
    // });

    scheduler.attachEvent('onBeforeDrag', (id) => {
      if (!id)
        return true;

      let event = scheduler.getEvent(id);

      if (event && event.state === 'new')
        return true;
    });

    scheduler.attachEvent('onBeforeEventChanged', (ev) => {
      if (new Date(ev.start_date) > new Date())
        return true;
      else {
        if (this.props.events.find(item => item.id === ev.id)) {
          window.ActionNotifs.addNotif('Can\'t move the event, the period you selected is expired', 'error');
        } else {
          window.ActionNotifs.addNotif('Can\'t create event, the period you selected is expired', 'error');
        }
      }
    });

    scheduler.attachEvent('onMouseMove', (id, ev) => {
      if (id) {
        let re = scheduler.getRenderedEvent(id);
        
        if (!re.classList.contains('dhx_cal_event_selected')) {
          let event = scheduler.getEvent(id);

          if (event.state === 'new') 
            scheduler.config.icons_select = ['icon_details', 'icon_clone', 'icon_delete'];
          else
            scheduler.config.icons_select = ['icon_details'];

          scheduler.select(id);
        }
      } else {
        // let events = scheduler.getEvents();

        // events.forEach(event => {
        //   let re = scheduler.getRenderedEvent(event.id);

        //   if (re.classList.contains('dhx_cal_event_selected'))
        //     scheduler.unselect(event.id);
        // });
      }
    });    

    scheduler.attachEvent('onEventAdded', (id, ev) => {

      scheduler.showLightbox(id);

        if (onDataUpdated) {
            onDataUpdated('create', ev, id);
        }
    });

    scheduler.attachEvent('onEventChanged', (id, ev) => {
      if (ev.collision) {
        const collision = !scheduler.checkCollision(ev);
        scheduler.setEvent(id, {...ev, collision });
        scheduler.setCurrentView();
      }

      if (ev && onDataUpdated) {
        let event = ev.state === 'not-confirmed' ? 'accept' : 'update';

        onDataUpdated(event, ev, id);
      }


    });

    scheduler.attachEvent('onEventDeleted', (id, ev) => {
      if (ev && onDataUpdated) {
        let event = ev.state === 'not-confirmed' ? 'cancel' : 'delete';

          onDataUpdated(event, ev, id);
      }
    });

    scheduler.attachEvent('onViewChange', (period) => {
      let schedulerState = scheduler.getState();

      if (
        (new Date(schedulerState.min_date).getTime() !== this.state.period.start ||
        new Date(schedulerState.max_date).getTime() !== this.state.period.end)
      ) {
        this.updateEventsList(schedulerState.min_date, schedulerState.max_date);
      }

      localStorage.setItem('defaultView', period);

      let calendarContainer = document.querySelector('#cal_container');

      if (calendarContainer) {
        calendarContainer.setAttribute('data-period', period);

        if (!calendarContainer.innerHTML)
          scheduler.renderCalendar({
            container: 'cal_container',
            date: new Date(),
            navigation: true,
            handler: (date, calendar) => {
              scheduler.setCurrentView(date);
            }
          });
      }
      
      return true;
    });

    scheduler.attachEvent('onTemplatesReady', () => {
      scheduler.templates.event_bar_date = (start, end, ev) => {
        let formatStart = new Date(start).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: 'numeric',
          timezone: 'UTC',
        })
          .toLocaleLowerCase()
          .replace(' pm', ' ')
          .replace(' am', ' ');
        let formatEnd = new Date(end).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: 'numeric',
          timezone: 'UTC',
        })
          .toLocaleLowerCase();

        return `<div class="dhx_event_move dhx_title month-view">&#8226; ${formatStart} - ${formatEnd}</div>`;
      }

      scheduler.templates.month_events_link = (date, count) => {
        return `<a>${count - 5} more</a></div>`
      }
    });

  //   scheduler.attachEvent("onEventCollision", function (ev, evs){
  //     //any custom logic here
  //     console.log(ev, evs);
      
  //     return true;
  // });

    scheduler._$initialized = true;
  };

  initLightbox() {
    scheduler.showLightbox = (id) => {
      const ev = scheduler.getEvent(id);

      this.setState({
        lightbox: ev,
        openLightbox: true
      });

      scheduler.startLightbox(id, this.schedulerLightbox.current);
    };
  };

  closeLigtbox() {
    const { events } = this.props;
    const { lightbox } = this.state;

    if (!events.find(item => item.id === lightbox.id))
      scheduler.deleteEvent(lightbox.id);
    
    scheduler.endLightbox(false, this.schedulerLightbox.current);

    this.setState({
      lightbox: {},
      openLightbox: false,
      isNew: false
    });
  };

  saveEvent(event) {
    if (!event.eventType.length) {
      // show Error
      console.log('no type selected');
      return;
    }

    const collision = scheduler.getEvents(event.start_date, event.end_date).length > 1;

    scheduler.setEvent(this.state.lightbox.id, {...event, collision });
    scheduler.setCurrentView();

    scheduler.endLightbox(true, this.schedulerLightbox.current);

    this.setState({
      lightbox: {},
      openLightbox: false,
      isNew: false
    });
  };

  removeEvent() {
    scheduler.endLightbox(false, this.schedulerLightbox.current);
    scheduler.deleteEvent(this.state.lightbox.id);

    this.setState({
      lightbox: {},
      openLightbox: false
    });
  };

  componentDidUpdate() {
    const { events } = this.props;

    scheduler.clearAll();
    scheduler.parse(events);
    scheduler.render();
  };

  handlerAddEvent(e) {
    console.log('add event', e);
  };

  findNextTime(date) {
    const nowStart = date;
    const end = new Date(date);
    const nowEnd = new Date(end.setMinutes(end.getMinutes() + STEP_MINUTES));

    var event = {
      text : '',//"New Event",
      start_date : nowStart,
      end_date : nowEnd
    };

    const isOccupied = scheduler.checkCollision(event);

    if (isOccupied) {
      return {
        start_date : nowStart,
        end_date : nowEnd
      }
    } else {
      return this.findNextTime(nowEnd);
    }
  };

  createEvent() {
    this.setState({...this.state, isNew: true});

    const roundDownTo = roundTo => x => Math.floor(x / roundTo) * roundTo;
    const roundDownTo5Minutes = roundDownTo(1000*60*STEP_MINUTES);

    const ms = roundDownTo5Minutes(new Date())

    const date = this.findNextTime(new Date(ms));

    const res = scheduler.addEvent(date.start_date, date.end_date);

    scheduler.showLightbox(res);
  };

  cloneEvent(event) {
    let eventDate = new Date(event.start_date).getDate();
    let startTime = new Date(event.start_date).getTime();
    let endTime = new Date(event.end_date).getTime();
    let duration = endTime - startTime;
    let newEventParams = {
      start_date: event.end_date,
      end_date: new Date(endTime + duration),
      eventType: event.eventType,
    };

    newEventParams = {
      ...newEventParams,
      ...this.handleCollision(newEventParams, duration)
    }

    let newEventStart = new Date(newEventParams.start_date);
    let newEventEnd = new Date(newEventParams.end_date);
    
    if (
      eventDate != newEventStart.getDate() || 
      (eventDate != newEventEnd.getDate() && 
      (newEventEnd.getHours() > 0 || 
      newEventEnd.getMinutes() > 0))
    ) {
      window.ActionNotifs.addNotif('Can\'t clone the event, no available time for current day', 'error');
      return;
    }

    try {
      this.props.onDataUpdated('update', newEventParams, null);
    } catch (e) {
      console.log('can\'t clone event', e);
      scheduler.addEvent(newEventParams);
    }
  }

  handleCollision({start_date, end_date}, duration) {
    let collisionEvents = scheduler.getEvents(start_date, end_date);

    if (collisionEvents.length) {
      let last = collisionEvents[collisionEvents.length - 1];

      return this.handleCollision({
        start_date: last.end_date,
        end_date: new Date(new Date(last.end_date).getTime() + duration)
      }, duration);
    } else {
      return {
        start_date,
        end_date
      }
    }
  }

  updateEventsList(start, end) {
    this.setState({
      ...this.state,
      period: {
        start: new Date(start).getTime(),
        end: new Date(end).getTime()
      }
    }, this.props.updateList(start, end));
  }

  toggleCalendar() {
    this.setState({
      calendarOpen: !this.state.calendarOpen
    });
  }

  render() {
    const { isNew, lightbox, openLightbox, calendarOpen } = this.state;

    return (
      <Fragment>
        <div
          className={st.lightbox}
          ref={this.schedulerLightbox}
        >
          {openLightbox &&
            <Lightbox
              isNew={isNew}
              lightbox={lightbox}
              eventsType={this.props.type}
              time={prepareHours()}
              saveEvent={this.saveEvent}
              removeEvent={this.removeEvent}
              onClose={this.closeLigtbox}
              handlerAddEvent={this.handlerAddEvent}
              scheduler={scheduler}
            />
          }
        </div>

        <div className={st.container_wrapper}>
          { scheduler.$container && (
            <div className={classnames({
              [st.externalCalendar]: true,
              'open': calendarOpen
            })}>
              <button
                type="button"
                className={st.btn}
                onClick={this.toggleCalendar}
              >
                <Icon name="open-btn" />
              </button>
              <span className={st.text}>Calendar</span>
              <div className={st.inner}>
                <div 
                  className={classnames({
                    [st.calendarContainer]: true
                  })}
                  id="cal_container"
                ></div>
              </div>

              <div className={st.calendarLegend}>
                <ul className={st.legendList}>
                  <li className={st.legendItem}>
                    <p className={st.legendColor} style={{ backgroundColor: '#EBEEEE' }}></p>
                    <p className={st.legendLabel}>Active session</p>
                  </li>
                  <li className={st.legendItem}>
                    <p className={st.legendColor} style={{ backgroundColor: '#20C2D1' }}></p>
                    <p className={st.legendLabel}>Booked, Confirmed</p>
                  </li>
                  <li className={st.legendItem}>
                    <p className={st.legendColor} style={{ backgroundColor: '#A4E650' }}></p>
                    <p className={st.legendLabel}>Booked, not confirmed by lawyer</p>
                  </li>
                  <li className={st.legendItem}>
                    <p className={st.legendColor} style={{ background: 'repeating-linear-gradient(-45deg, #989FA3, #989FA3 5px, #F8F9FA 5px, #F8F9FA 15px)', opacity: '0.3' }}></p>
                    <p className={st.legendLabel}>Past sessions</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className={classnames(st.container, 'esq-scheduler_container')}>
            <div
              ref={ (input) => { this.schedulerContainer = input } }
              style={ { width: '100%', height: '400px' } }
            ></div>

            <button
              type="button"
              className={classnames(st.newEvent, 'add_event_button')}
              data-tooltip="Create new event"
              onClick={this.createEvent}
            >
              <Icon name="plus" />
            </button>
          </div>
        </div>

        <div className={st.legend}>
          <ul className={st.legendList}>
            <li className={st.legendItem}>
              <p className={st.legendColor} style={{ backgroundColor: '#EBEEEE' }}></p>
              <p className={st.legendLabel}>Active session</p>
            </li>
            <li className={st.legendItem}>
              <p className={st.legendColor} style={{ backgroundColor: '#20C2D1' }}></p>
              <p className={st.legendLabel}>Booked, Confirmed</p>
            </li>
            <li className={st.legendItem}>
              <p className={st.legendColor} style={{ backgroundColor: '#A4E650' }}></p>
              <p className={st.legendLabel}>Booked, not confirmed by lawyer</p>
            </li>
            <li className={st.legendItem}>
              <p className={st.legendColor} style={{ background: 'repeating-linear-gradient(-45deg, #989FA3, #989FA3 5px, #F8F9FA 5px, #F8F9FA 15px)', opacity: '0.3' }}></p>
              <p className={st.legendLabel}>Past sessions</p>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = ({ ref, user }) => ({
  // profile: user.profile,
  // gender: ref.gender
  status: ref.status,
  type: ref.type
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getStatus: actions.getStatus,
}, dispatch)

const mapToProps = connect(mapStateToProps,mapDispatchToProps);

export default mapToProps(ScheduleLawyer);