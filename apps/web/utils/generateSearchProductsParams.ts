import { type ProductSearchProps } from '@vsf-enterprise/sapcc-types';
import { type DeepMaybeRef } from '@vueuse/core';

export const generateSearchProductsParams = ({
  searchTerm,
  filters,
  query,
  pageSize,
  currentPage,
  sort,
}: DeepMaybeRef<ProductSearchProps>): ComputedRef<ProductSearchProps> =>
  computed(() => ({
    searchTerm: unref(searchTerm),
    filters: unref(filters),
    query: unref(query),
    pageSize: unref(pageSize),
    currentPage: unref(currentPage),
    sort: unref(sort),
  }));
