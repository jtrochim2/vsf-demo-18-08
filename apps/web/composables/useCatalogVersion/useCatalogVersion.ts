import type { CatalogVersion } from '@vsf-enterprise/sapcc-types';
import { useSdk } from '~/sdk';

/**
 * @description Composable for managing category tree.
 * @param url Parameter of the content to fetch.
 * @example
 * const { data, loading, fetchCatalogVersion } = useCatalogVersion();
 */
export const useCatalogVersion = () => {
  const state = useState<{ data: null | CatalogVersion; loading: boolean }>(`content`, () => ({
    data: null,
    loading: false,
  }));

  /**
   * @description Function for fetching the catalog tree.
   * @example
   * fetchCatalogVersion();
   */
  const fetchCatalogVersion = async () => {
    state.value.loading = true;
    try {
      const { data, error } = await useAsyncData(() => useSdk().sapcc.getCatalogVersion());
      useHandleError(error.value);
      state.value.data = data.value;
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    fetchCatalogVersion,
    ...toRefs(state.value),
  };
};
