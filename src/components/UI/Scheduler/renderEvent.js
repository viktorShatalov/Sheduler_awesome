import SvgIcons from 'assets/img/icons.svg';

const scheduler = window.scheduler;

export default (container, ev, width, height, header_content, body_content) => {
  const container_width = container.style.width;
  let title = scheduler.templates.event_header(ev.start_date, ev.end_date, ev).replace(' PM -', ' -').replace(' AM -', ' -');
  
  var html = `
    <div class="dhx_event_custom_wrapper">
      <div class="dhx_event_move dhx_header" style="width:${container_width};">&nbsp;</div>
      <div class="dhx_event_move dhx_title">${title}</div>
      <div class="dhx_body" style="width:${container_width};">
    </div>
      <!--${ev.text}-->
      <span class="dhx_body-icon-wrap">
      ${ev.eventType && ev.eventType.includes(3) ? `<span class="dhx_body-icon"><svg class="esq-icon esq-icon--home"><use xlink:href="${SvgIcons}#icon-home" width="100%" height="100%"></use></svg></span>`:''}
      ${ev.eventType && ev.eventType.includes(2) ? `<span class="dhx_body-icon"><svg class="esq-icon esq-icon--phone-outline"><use xlink:href="${SvgIcons}#icon-phone-outline" width="100%" height="100%"></use></svg></span>`:''}
      ${ev.eventType && ev.eventType.includes(1) ? `<span class="dhx_body-icon"><svg class="esq-icon esq-icon--video"><use xlink:href="${SvgIcons}#icon-video" width="100%" height="100%"></use></svg></span>`: ''}
      </span>
    </div>
    <div class="dhx_event_resize dhx_footer" style=" width:${container_width}"></div>
  `;

  container.innerHTML = html;
  return true;
};
