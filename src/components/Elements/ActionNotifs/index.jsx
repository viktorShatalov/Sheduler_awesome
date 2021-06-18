import React from 'react';
import { CSSTransition } from 'react-transition-group';
import st from './actionNotifs.module.scss';
import classnames from 'classnames';
import Icon from 'components/UI/Icon';

const MAX_VISIBLE_NOTIFS = 3;
const SHOW_NOTIF_TIME = 5000;

class ActionNotifs extends React.Component {
  constructor() {
    super();
    this.state = {
      notifs: [],
      visibleNotifs: []
    }

    window.ActionNotifs = this;
    this.addNotif = this.addNotif.bind(this);
    this.showNotif = this.showNotif.bind(this);
    this.checkShowNotifs = this.checkShowNotifs.bind(this);
    this.waitHideNotif = this.waitHideNotif.bind(this);
    this.hideNotif = this.hideNotif.bind(this);
  }

  componentDidMount() {
    this.checkShowNotifs();

    // let i = 0;
    // let interval = setInterval(() => {
    //   i++;
    //   this.addNotif(`Some text ${i}`);

    //   if (i > 10)
    //     clearInterval(interval);
    // }, 500);
  }

  addNotif(text, type) {
    if (!type)
      type = 'success';

    let newNotif = {
      id: new Date().getTime(),
      active: false,
      text,
      type
    }

    this.setState({
      ...this.state,
      notifs: [...this.state.notifs, newNotif]
    });
  }

  checkShowNotifs() {
    setInterval(() => {
      if (this.state.visibleNotifs.length < MAX_VISIBLE_NOTIFS) {
        let hiddenNotifs = this.state.notifs.filter(n => !n.active);

        if (hiddenNotifs.length)
          this.showNotif(hiddenNotifs[0]);
      }
    }, 500);
  }

  showNotif(notif) {
    let {notifs, visibleNotifs} = this.state;

    notif.active = true;
    let index = notifs.findIndex(item => item.id === notif.id);
    let newNotifs = notifs;
    newNotifs[index] = notif;

    this.setState({
      ...this.state,
      notifs: newNotifs,
      visibleNotifs: [...visibleNotifs, notif.id]
    }, () => {
      this.waitHideNotif(notif);
    });

  }

  waitHideNotif(notif) {
    setTimeout(() => {
      if (this.state.visibleNotifs.includes(notif.id))
        this.hideNotif(notif);
    }, SHOW_NOTIF_TIME);
  }

  hideNotif(notif) {
    let {notifs, visibleNotifs} = this.state;

    this.setState({
      ...this.state,
      notifs: notifs.filter(item => item.id !== notif.id),
      visibleNotifs: visibleNotifs.filter(item => item !== notif.id)
    });
  }

  render() {
    let {notifs} = this.state;

    return (
      <div className={st.wrap}>
        <ul className={st.list}>
          {notifs.map(notif => (
            <li
              key={notif.id}
            >
              <CSSTransition
                in={notif.active}
                classNames="blur"
                timeout={{
                  enter: 400,
                  exit: 200
                }}
                unmountOnExit
              >
                <div className={classnames(st.notif, notif.type)}>
                  <span>{notif.text}</span>
                  <Icon 
                    name="close" 
                    onClick={() => this.hideNotif(notif)}
                  />
                </div>
              </CSSTransition>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ActionNotifs