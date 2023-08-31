import { useRouteQuery } from '@vueuse/router';

export const useProductSearchParams = () => {
  const {
    public: { NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE },
  } = useRuntimeConfig();

  const sort = useRouteQuery('sort', 'relevance' as string);
  const currentPage = useRouteQuery('page', '1', {
    transform: (value) => {
      const page = Number(value);
      return page >= 0 ? page : 0;
    },
  });
  const searchTerm = useRouteQuery('search', '' as string);
  const query = useRouteQuery('query', '' as string);
  const pageSize = useRouteQuery('pageSize', NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE, { transform: Number });

  return { sort, currentPage, query, pageSize, searchTerm };
};
