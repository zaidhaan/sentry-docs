import React from 'react';
import {graphql} from 'gatsby';

import {BasePage} from 'sentry-docs/components/basePage';
import {Content} from 'sentry-docs/components/content';
import {PlatformSdkDetail} from 'sentry-docs/components/platformSdkDetail';

type Props = {
  data: {
    file: any;
  };
  pageContext: {
    platform: {
      name: string;
      title: string;
    };
    title: string;
    guide?: {
      name: string;
      title: string;
    };
  };
};

export default function Platform(props: Props) {
  const {pageContext} = props;
  // Ruby
  // Rails
  // X for Ruby
  // X for Rails
  const seoTitle =
    pageContext.title === (pageContext.guide || pageContext.platform).title
      ? pageContext.title
      : `${pageContext.title} for ${(pageContext.guide || pageContext.platform).title}`;

  return (
    <BasePage {...props} seoTitle={seoTitle} prependToc={<PlatformSdkDetail />}>
      <Content file={props.data.file} />
    </BasePage>
  );
}

export const pageQuery = graphql`
  query PlatformPageQuery($id: String) {
    file(id: {eq: $id}) {
      id
      relativePath
      sourceInstanceName
      childMarkdownRemark {
        html
        internal {
          type
        }
      }
      childMdx {
        body
        internal {
          type
        }
      }
    }
  }
`;
