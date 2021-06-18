import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import useOutsideClick from 'hooks/useOutsideClick';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import Icon from 'components/UI/Icon';
import st from './notifications.module.scss';
import Notification from 'components/Elements/ItemNotification';

const Notifications = ({
  isMobile, 
  isLawyer, 
  userNotifs, 
  lawyerNotifs, 
  getUserNotifs, 
  readUserNotif, 
  readAllUserNotifs, 
  getLawyerNotifs,
  readLawyerNotif,
  readAllLawyerNotifs
}) => {
  const [ notifications, setNotifications ] = useState([]);
  const [ isOpen, setOpen ] = useState(false);

  const wrap = React.useRef(null);

  const notifs = isLawyer ? lawyerNotifs : userNotifs;
  const getNotifications = isLawyer ? getLawyerNotifs : getUserNotifs;
  const readNotification = isLawyer ? readLawyerNotif : readUserNotif;
  const readAllNotifications = isLawyer ? readAllLawyerNotifs : readAllUserNotifs;

  useOutsideClick(wrap, () => setOpen(false));

  useEffect(() => {
    trackNotifications();
  }, []);

  useEffect(() => {
    setNotifications(notifs);
  }, [notifs])

  const cancelNotification = (id) => {
    readNotification(id);

    if (notifs.length <= 1)
      setOpen(false);
  };

  const cancelAllNotifications = () => {
    readAllNotifications();
    setOpen(false);
  }

  const trackNotifications = () => {
    const UPDATE_PERIOD = 5 * 60 * 1000;

    getNotifications();

    setInterval(() => {
      getNotifications();
    }, UPDATE_PERIOD)
  }

  return (
    <div className={classnames(st.container, {[st.empty]: notifications.length === 0})}>
      <React.Fragment>
        {
          isMobile ?
          <Link
            className={st.icon}
            to={`${isLawyer ? '/lawyer' : '/user'}/notifications`}
          >
            <Icon name={notifications.length !== 0 ? 'notification' : 'notification-empty'} />
          </Link>
          :
          <span
            className={st.icon}
            onClick={() => setOpen(true)}
          >
            <Icon name={notifications.length !== 0 ? 'notification' : 'notification-empty'} />
          </span>
        }
        

        <CSSTransition
            in={isOpen}
            classNames="show"
            timeout={{
              enter: 400,
              exit: 200
            }}
            unmountOnExit
          >
          <div className={st.popup} ref={wrap}>
            <a
              onClick={cancelAllNotifications}
            >Read all</a>
            {notifications.map(i => 
              <Notification
                key={i.id}
                notification={i}
                isLawyer={isLawyer}
                onCancel={cancelNotification}
              />
            )}
          </div>
        </CSSTransition>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = ({user, lawyer}) => ({
  userNotifs: user.notifications,
  lawyerNotifs: lawyer.notifications
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserNotifs: actions.getUserNotifs,
  readUserNotif: actions.readUserNotif,
  readAllUserNotifs: actions.readAllUserNotifs,
  getLawyerNotifs: actions.getLawyerNotifs,
  readLawyerNotif: actions.readLawyerNotif,
  readAllLawyerNotifs: actions.readAllLawyerNotifs
}, dispatch);

const mapToProps = connect(mapStateToProps, mapDispatchToProps);

export default mapToProps(Notifications);