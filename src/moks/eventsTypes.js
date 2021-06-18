import React from 'react';
import Icon from 'components/UI/Icon';

export default [
  {
    id: 2,
    label: 'Phone call',
    icon: <span className="icon-wrap" style={{marginRight: '8px'}}>
      {/* <Icon name="phone-outline"/> */}

      <svg className="esq-icon esq-icon--phone-outline" width="17" height="16" viewBox="0 0 17 16">
        <path stroke="currentColor" fill="none" strokeWidth="1.2" d="M15.78 12.908c-.846 1.902-2.83 2.235-3.477 2.235-.19 0-3.154.147-7.415-3.643C1.459 8.45 1.04 5.17 1.004 4.547c-.036-.607.15-2.13 2.383-3.26.277-.14.826-.203.967-.07.063.059 1.938 2.952 1.987 3.048.05.096.074.19.074.282 0 .132-.1.298-.301.496-.2.198-.42.38-.655.545-.236.165-.455.34-.656.525-.2.185-.3.337-.3.456.013.309.282 1.414 2.336 3.106 2.055 1.693 3.044 2.17 3.14 2.203.095.033.174.05.237.05.127 0 .29-.095.487-.283.197-.188.86-1.04 1.071-1.23.212-.187.388-.281.529-.281.098 0 .199.023.3.069.103.046 3.192 1.741 3.251 1.798.16.154.047.635-.074.907"/>
        </svg>
    </span>,
    sort: 2
  },
  {
    id: 3,
    label: 'Live meeting',
    icon: <span className="icon-wrap" style={{marginRight: '8px'}}>
      {/* <Icon name="home"/> */}

      <svg className="esq-icon esq-icon--home" width="17" height="16" viewBox="0 0 17 16">
        <path fill="currentColor" d="M14.201 15.811H3.134a1.499 1.499 0 01-1.497-1.497V6.436a.52.52 0 111.042 0v7.878c0 .251.204.455.455.455h11.067a.456.456 0 00.456-.455V6.436a.52.52 0 111.041 0v7.878c0 .825-.671 1.497-1.497 1.497z"/><path fill="currentColor" d="M16.48 8.259a.52.52 0 01-.37-.153L9.635 1.63a1.369 1.369 0 00-1.933 0L1.224 8.106a.52.52 0 11-.736-.736L6.964.893c.94-.94 2.467-.94 3.406 0l6.477 6.477a.52.52 0 01-.368.889zM10.75 15.81H6.585a.52.52 0 01-.52-.52v-4.622c0-.897.73-1.627 1.627-1.627h1.953c.897 0 1.627.73 1.627 1.627v4.622a.52.52 0 01-.52.52zm-3.645-1.04h3.125v-4.102a.587.587 0 00-.586-.586H7.69a.587.587 0 00-.586.586v4.101z"/>
      </svg>
    </span>,
    sort: 1
  },
  {
    id: 1,
    label: 'Video call',
    icon: <span className="icon-wrap" style={{marginRight: '8px'}}>
      {/* <Icon name="video"/> */}

      <svg className="esq-icon esq-icon--video" width="12" height="8" viewBox="0 0 12 8">
        <path stroke="currentColor" fill="none" strokeLinejoin="round" strokeWidth=".8" d="M8.327 5v1.594c0 .5-.459.906-1.025.906H1.525C.96 7.5.5 7.094.5 6.594V1.406C.5.906.959.5 1.525.5h5.777c.566 0 1.025.406 1.025.906V3m0 2L11.5 6V2L8.327 3m0 2V3M6 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
        </svg>
    </span>,
    sort: 3
  },
];
