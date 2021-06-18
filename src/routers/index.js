import React from 'react';

export default [
  {
    // path: '/main',
    path: '/',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Home')),
  },
  {
    path: '/search-results',
    component: React.lazy(() => import(/* webpackPreload: true */'views/SearchResults')),
  },
  {
    path: '/view-profile/:slug',
    component: React.lazy(() => import(/* webpackPreload: true */'views/LawyerProfile')),
  },
  // VIDGET
  {
    path: '/vidget/:slug',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Vidget')),
  },

  // TODO: temp
  {
    path: '/pages',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Pages')),
    // role: ['user']
  },

  {
    path: '/password/reset',
    component: React.lazy(() => import(/* webpackPreload: true */'views/UpdatePassword')),
  },

  // TODO: users area
  {
    path: '/user/sign-up',
    component: React.lazy(() => import(/* webpackPreload: true */'views/User/SignUp')),
    notFor: ['lawyer', 'user']
  },
  {
    path: '/_vidget/user/sign-up',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Vidget/SignUp')),
    notFor: ['lawyer', 'user']
  },
  {
    path: '/user/sign-in',
    component: React.lazy(() => import(/* webpackPreload: true */'views/User/SignIn')),
    notFor: ['lawyer', 'user']
  },
  {
    path: '/user/recall',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Recall')),
  },
  {
    path: '/email/verify/:id/:hash',
    component: React.lazy(() => import(/* webpackPreload: true */'views/EmailVerify')),
  },

  {
    path: '/user/profile',
    component: React.lazy(() => import(/* webpackPreload: true */'views/User/Profile')),
    role: ['user'],
  },
  {
    path: '/user/session-history',
    component: React.lazy(() => import(/* webpackPreload: true */'views/User/SessionHistory')),
    role: ['user'],
  },
  {
    path: '/user/video-chat',
    component: React.lazy(() => import(/* webpackPreload: true */'views/VideoChat')),
    role: ['user'],
  },

  {
    path: '/user/notifications',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Notifications')),
    role: ['user'],
  },

  // TODO: lawyers area
  {
    path: '/lawyer/search-account',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/SearchAccount')),
    notFor: ['user'],
  },
  {
    path: '/lawyer/search-result',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/SearchResult')),
    notFor: ['user'],
  },
  {
    path: '/lawyer/email/verify/:hash',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/SearchResult/EmailVerification')),
  },
  {
    path: '/lawyer/sign-up',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/SignUp')),
    notFor: ['user'],
  },
  {
    path: '/lawyer/sign-in',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/SignIn')),
    notFor: ['user'],
  },
  {
    path: '/lawyer/recall',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Recall')),
  },

  {
    path: '/lawyer/profile',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/Profile')),
    role: ['lawyer'],
  },
  {
    path: '/lawyer/schedule',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Lawyer/Schedule')),
    role: ['lawyer'],
  },
  {
    path: '/lawyer/video-chat',
    component: React.lazy(() => import(/* webpackPreload: true */'views/VideoChat')),
    role: ['lawyer'],
  },

  {
    path: '/lawyer/notifications',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Notifications')),
    role: ['lawyer'],
  },

  {
    path: '/favorites',
    component: React.lazy(() => import(/* webpackPreload: true */'views/Favorites')),
    role: ['user', 'lawyer'],
  },

  // {
  //   path: '/sign-up',
  //   component: React.lazy(() => import(/* webpackPreload: true */'views/User/Login')),
  // },
  // {
  //   path: '/framework',
  //   component: React.lazy(() => import('views/Framework')),
  // },

  // {
  //   path: null,
  //   component: React.lazy(() => import('views/Page404')),
  // },

  {
    path: null,
    component: React.lazy(() => import('views/Page404')),
  },
]