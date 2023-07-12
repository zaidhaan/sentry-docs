import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

interface Props {
  title: string;
  description?: string;
  keywords?: string[];

  pageContext?: {
    description?: string;
    excerpt?: string;
    guide?: {title: string};
    noindex?: boolean;
    platform?: {title: string};
    title?: string;
  };
}

interface Data {
  site: {
    siteMetadata: {
      sitePath: string;
      title: string;
      author?: string;
      description?: string;
    };
  };
}

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        sitePath
      }
    }
  }
`;

export function BaseHead({
  title,
  description,
  keywords = [],
  pageContext,
}: Props): JSX.Element {
  const data = useStaticQuery<Data>(query);

  const {
    sitePath,
    author,
    title: baseTitle,
    description: baseDescription,
  } = data.site.siteMetadata;

  const platformGuideTitle = (pageContext.guide ?? pageContext.platform)?.title;

  const platformTitle =
    pageContext.title === platformGuideTitle
      ? pageContext.title
      : `${pageContext.title} for ${platformGuideTitle}`;

  const mainTitle = title ?? platformTitle;

  const pageTitle = mainTitle ? `${mainTitle} | ${baseTitle}` : baseTitle;

  const pageDescription =
    description ??
    pageContext.description ??
    pageContext.excerpt?.slice(0, 160) ??
    baseDescription;

  return (
    <React.Fragment>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`https://${sitePath}/meta.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={`https://${sitePath}/meta-avatar.png`} />
      <meta name="twitter:description" content={pageDescription} />
      <link rel="icon" type="image/png" href="favicon.ico" />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {pageContext.noindex && <meta property="robots" content="noindex" />}
    </React.Fragment>
  );
}
