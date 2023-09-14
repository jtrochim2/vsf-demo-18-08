import { mount } from '@vue/test-utils';
import CategoryFilters from '~/components/CategoryFilters/CategoryFilters.vue';
import { facetMock } from './facet.mock';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<CategoryFilters />', () => {
  it('should render <FilterBase /> component', () => {
    const { getByTestId } = mount(CategoryFilters, {
      props: {
        facets: [facetMock],
      },
    });

    expect(getByTestId('filter-base'));
  });
});
