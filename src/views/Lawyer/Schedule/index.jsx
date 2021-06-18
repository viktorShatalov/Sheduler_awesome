import React, {Component} from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import Spinner from 'components/Elements/Spinner';

import Scheduler from 'components/UI/Scheduler';

import st from './schedule.module.scss';

class ScheduleLawyerController extends Component {
  constructor(props) {
    super();

    this.state = {
      data: [],
      showSpinner: true,
      itemCreating: false
    }

    this.getScheduleList = this.getScheduleList.bind(this);
    this.createItem = this.createItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.acceptBooking = this.acceptBooking.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.onDataUpdated = this.onDataUpdated.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
  }

  showSpinner(showSpinner) {
    this.setState(prevState => ({
      ...prevState,
      showSpinner
    }));
  };

  getScheduleList(start_date, end_date) {
    this.showSpinner(true);
    this.props.getSchedule({
      start_date,
      end_date
    })
      .then(res => {
        this.showSpinner(false);
        this.setState({
          ...this.state,
          data: res,
        });
      });
  }

  onDataUpdated(event, item, id) {
    const { data } = this.state;
    let savedEvent = data.find(event => event.id === Number(id));

    switch(event) {
      case 'update': 
        if (savedEvent) { // update
          this.updateItem(id, item);
        } else { // create
          this.createItem(item);
        }
        break;
      case 'delete':
        if (savedEvent)
          this.removeItem(id);
        break;
      case 'accept':
        this.acceptBooking(item);
        break;
      case 'cancel': 
        this.cancelBooking(item);
        break;
      default:
        break;
    }
  }

  createItem(params) {
    if (this.state.itemCreating)
      return;

    this.setState({
      ...this.state,
      itemCreating: true
    });

    this.props.createScheduleItem(params)
      .then(res => {
        this.setState({
          ...this.state,
          data: [
            ...this.state.data,
            {
              ...res,
              eventType: params.eventType
            }
          ],
          itemCreating: false
        }, () => {
          window.ActionNotifs.addNotif('Event created');
          this.scrollToElement(res.id);
        })
      })
  }

  updateItem(id, params) {
    this.props.updateScheduleItem(id, params)
      .then(res => {
        let arr = this.state.data.filter(item => item.id !== id);

        // TEMP
        res.eventType = params.eventType;

        this.setState({
          ...this.state,
          data: [...arr, res]
        }, () => {
          // window.ActionNotifs.addNotif('Event updated');
        });
      });
  }

  removeItem(id) {
    this.props.removeScheduleItem(id)
      .then(res => {
        this.setState({
          ...this.state,
          data: this.state.data.filter(item => Number(item.id) !== Number(id))
        }, () => {
          window.ActionNotifs.addNotif('Event removed', 'error');
        });
      })
  }

  acceptBooking(item) {
    this.props.acceptBookingItem(item.bookingId)
      .then(res => {
        item.state = 'confirmed';
        let arr = this.state.data.filter(event => event.id !== item.id);

        this.setState({
          ...this.state,
          data: [...arr, item]
        });
      })
  }

  cancelBooking(item) {
    this.props.cancelBookingItem(item.bookingId)
      .then(res => {
        item.state = 'new';

        let arr = this.state.data.filter(event => event.id !== item.id);

        this.setState({
          ...this.state,
          data: [...arr, item]
        });
      })
  }

  formatDate(dateStr) {
    let date = new Date(dateStr);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  scrollToElement(id) {
    let elem = document.querySelector(`[event_id="${id}"]`);

    if (elem)
      elem.scrollIntoView({
        block: 'nearest'
      });
  }

  render() {
    const { data, showSpinner} = this.state;

    return (
      <div className={st.container}>
        <Spinner isVisible={showSpinner} />
        <div className={classnames(st.inner, 'esq-wrap')}>
          <Scheduler 
            events={data}
            onDataUpdated={this.onDataUpdated}
            updateList={this.getScheduleList}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getSchedule: actions.getSchedule,
  createScheduleItem: actions.createScheduleItem,
  updateScheduleItem: actions.updateScheduleItem,
  removeScheduleItem: actions.removeScheduleItem,
  acceptBookingItem: actions.acceptBookingItem,
  cancelBookingItem: actions.cancelBookingItem
}, dispatch)

const mapToProps = connect(null,mapDispatchToProps);

export default mapToProps(ScheduleLawyerController);