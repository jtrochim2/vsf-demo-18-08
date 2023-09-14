export type Breadcrumb = {
  id: string;
  name: string;
  link: string;
};

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};
