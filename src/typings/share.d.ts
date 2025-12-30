export as namespace Shared;
export type PageType =
  | React.LazyExoticComponent<React.FC<>>
  | React.ComponentType;

export type IRoute = {
  path: string;
  component: PageType;
  exact?: boolean;
};
