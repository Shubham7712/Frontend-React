/*eslint-disable */

import React from 'react';
import {Link} from 'react-router-dom';
export default function BadRequest() {
  return (
    <section class="page-not-found-block">
      <div class="page-not-found">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">404</h2>
          </div>
          <span class="text1">Oops! Page Not Found</span>
          <span class="text2">
            The page you were looking for could not be found.
          </span>
          <a>
            {' '}
            <Link to={`/`} class="tx-ctm-btn">
              {' '}
              Back To Home <i class="fas fa-long-arrow-alt-right"></i>
            </Link>
          </a>
        </div>
      </div>
    </section>
  );
}
