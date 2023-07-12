import {PageProps} from 'gatsby';

import {ApiSidebar} from 'sentry-docs/components/apiSidebar';
import {InternalDocsSidebar} from 'sentry-docs/components/internalDocsSidebar';
import {Layout} from 'sentry-docs/components/layout';
import PageContext from 'sentry-docs/components/pageContext';
import {PlatformSidebar} from 'sentry-docs/components/platformSidebar';
import {Sidebar} from 'sentry-docs/components/sidebar';
import {DocsPageContext} from 'sentry-docs/types';

interface PageWrapperProps {
  children: React.ReactNode;
  pageProps: PageProps<unknown, DocsPageContext, unknown>;
}

function PageWrapper({children, pageProps}: PageWrapperProps) {
  const {pageContext} = pageProps;

  // Index page does not render the layout
  if (pageProps.path === '/') {
    return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>;
  }

  let sidebar = <Sidebar />;

  if (pageContext.pageType === 'platform') {
    const {platform, guide} = pageContext;
    sidebar = <PlatformSidebar platform={platform} guide={guide} />;
  }

  if (pageContext.pageType === 'internalDoc') {
    sidebar = <InternalDocsSidebar />;
  }

  if (
    pageContext.pageType === 'api' ||
    pageContext.pageType === 'apiDoc' ||
    pageContext.pageType === 'apiReference'
  ) {
    sidebar = <ApiSidebar />;
  }

  return (
    <PageContext.Provider value={pageContext}>
      <Layout sidebar={sidebar} pageContext={pageContext}>
        {children}
      </Layout>
    </PageContext.Provider>
  );
}

export {PageWrapper};
