import React, {Fragment} from 'react';

<<<<<<< Updated upstream:src/pages/404.tsx
import {SEO} from 'sentry-docs/components/seo';

import {getCurrentTransaction} from '../utils';
=======
import {BaseHead} from '~src/components/head';
import Layout from '~src/components/layout';
>>>>>>> Stashed changes:src/pages/404.js

function NotFoundPage() {
  const tx = getCurrentTransaction();
  if (tx) {
    tx.setStatus('not_found');
  }

  return (
<<<<<<< Updated upstream:src/pages/404.tsx
    <Fragment>
      <SEO
        title="Page Not Found"
        description="We couldn’t find the page you were looking for."
      />
=======
    <Layout>
>>>>>>> Stashed changes:src/pages/404.js
      <h1>Page Not Found</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
    </Fragment>
  );
}

export function Head() {
  <BaseHead
    title="Page Not Found"
    description="We couldn’t find the page you were looking for."
  />;
}

export default NotFoundPage;
