const scheduler = window.scheduler;

export default (start, end, event) => {
  let css = "";

  // if (event.eventType) css += "event_type_"+event.eventType;
  if (event.collision) {
    css += "event_collision";
  } else {
    if (event.state === 'confirmed') {
      css += " event_confrimed";
    } else if (event.state === 'not-confirmed') {
      css += " event_not-confrimed";
    } else if (event.state === 'new') {
      css += " event_active";
    } else if (event.state === 'expired') {
      css += " event_old shadow-hide";
    }
  }

  // if (new Date(event.end_date) < new Date()) css += " event_old shadow-hide";

  const mode = scheduler.getState().mode;
  if(mode === "month"){
    css += " shadow-hide month-state";
  }
  else {
    // custom logic here
  }

  return css;
};