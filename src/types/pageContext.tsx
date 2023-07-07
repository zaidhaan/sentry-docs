// TODO(epurkhiser): This probably should not be inside of this pageContext
// types file
export interface PlatformMeta {
  name: string;
  title: string;
}

// TODO(epurkhiser): This probably should not be inside of this pageContext
// types file
export interface GuideMeta {
  name: string;
  title: string;
}

interface GenericDocPageContext {
  pageType: 'genericDoc';
  // TODO(epurkhiser): There are additional context types
}

interface PlatformIndexPage {
  pageType: 'platformIndex';
  title: string;
  // TODO(epurkhiser): There are additional context types
}
interface ApiPageContext {
  notoc: boolean;
  pageType: 'api';
  title: string;
  // TODO(epurkhiser): There are additional context types
}

interface PlatformPageContext {
  pageType: 'platform';
  platform: PlatformMeta;
  title: string;
  guide?: GuideMeta;
  // TODO(epurkhiser): There are additional context types
}

interface ApiDocPageContext {
  pageType: 'apiDoc';
  tag: string;
  title: string;
  // TODO(epurkhiser): There are additional context types
}

interface ApiReferencePageContext {
  pageType: 'apiReference';
  tag: string;
  title: string;
  // TODO(epurkhiser): There are additional context types
}

interface InternalDocPageContext {
  pageType: 'internalDoc';
  tag: string;
  title: string;
  // TODO(epurkhiser): There are additional context types
}

interface WizardDebugPageContext {
  noindex: boolean;
  pageType: 'wizardDeubug';
  title: string;
  // TODO(epurkhiser): There are additional context types
}

/**
 * An intersection representing all the possible page contexts. May be
 * discrimated on via the pageType attribute.
 */
export type DocsPageContext =
  | GenericDocPageContext
  | PlatformIndexPage
  | PlatformPageContext
  | ApiPageContext
  | ApiDocPageContext
  | ApiReferencePageContext
  | InternalDocPageContext
  | WizardDebugPageContext;
