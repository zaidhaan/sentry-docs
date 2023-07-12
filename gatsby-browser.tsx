import {GatsbyBrowser} from 'gatsby';

import {PageWrapper} from 'sentry-docs/components/pageWrapper';
import {DocsPageContext} from 'sentry-docs/types';

export const wrapPageElement: GatsbyBrowser<
  unknown,
  DocsPageContext
>['wrapPageElement'] = ({element, props}) => (
  <PageWrapper pageProps={props}>{element}</PageWrapper>
);

// Disable prefetching altogether so our bw is not destroyed.
// If this turns out to hurt performance significantly, we can
// try out https://www.npmjs.com/package/gatsby-plugin-guess-js
// with data from the prior 1-2 weeks.
export const disableCorePrefetching: GatsbyBrowser['disableCorePrefetching'] = () => true;
