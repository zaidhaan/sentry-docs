import React from 'react';
import {graphql} from 'gatsby';

import {BasePage} from 'sentry-docs/components/basePage';
import {Content} from 'sentry-docs/components/content';

export default function Doc(props: any) {
  return (
    <BasePage {...props}>
      <Content file={props.data.file} />
    </BasePage>
  );
}

export const pageQuery = graphql`
  query DocQuery($id: String) {
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
