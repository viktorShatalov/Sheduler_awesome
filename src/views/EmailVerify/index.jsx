import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import qs from 'query-string';

import { user } from 'setts/defaultRoutes';
import { CheckUserAuth } from 'helpers/auth';

const EmailVerify = ({location}) => {
  const params = useParams();
  const path = `/email/verify/${params.id}/${params.hash}${location.search}`;

  const history = useHistory();

  useEffect(() => {
    if (CheckUserAuth('user')) {
      axios(path)
        .finally(() => {
          history.push({pathname: user});
        })
    } else {
      history.push({
        pathname: '/user/sign-in',
        search: qs.stringify({path: `${location.pathname}${location.search}`})
      });
    }
  });

  return <p>Checking...</p>;
};

export default EmailVerify;