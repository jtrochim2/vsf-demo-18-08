import { useRouteQuery } from '@vueuse/router';

export const useProductSearchParams = () => {
  const {
    public: { NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE },
  } = useRuntimeConfig();

  const sort = useRouteQuery<string, string>('sort', 'relevance');
  const currentPage = useRouteQuery<string, number>('page', '1', {
    transform: (value) => {
      const page = Number(value) - 1;

      return page >= 0 ? page : 0;
    },
  });

  const searchTerm = useRouteQuery<string, string>('search', '');
  const query = useRouteQuery<string, string>('query', '');
  const pageSize = useRouteQuery<string, number>('pageSize', NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE, {
    transform: Number,
  });

  return { sort, currentPage, query, pageSize, searchTerm };
};
