import { CategoryHierarchy } from '@vsf-enterprise/sapcc-types';
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

interface FindBreadcrumbParams {
  categoryList?: CategoryHierarchy[];
  categoryId?: string;
  breadcrumbs?: Breadcrumb[];
}
export type FindBreadcrumb = (params: FindBreadcrumbParams) => Breadcrumb[];
