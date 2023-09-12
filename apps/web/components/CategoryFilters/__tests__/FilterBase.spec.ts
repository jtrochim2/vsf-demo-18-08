import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import FilterBase from '~/components/CategoryFilters/FilterBase.vue';
import { facetMock } from './facet.mock';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<FilterBase />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(FilterBase, {
      props: {
        facet: facetMock,
      },
    });

    expect(getByTestId('filter-base'));
  });

  it('should render size filter', () => {
    const { getByTestId } = mount(FilterBase, {
      props: {
        facet: { ...facetMock, name: 'Size' },
      },
    });

    expect(getByTestId('filter-size'));
  });

  it('should render color filter', () => {
    const { getByTestId } = mount(FilterBase, {
      props: {
        facet: { ...facetMock, name: 'Colour' },
      },
    });

    expect(getByTestId('filter-color'));
  });

  it('should render checkbox filter', () => {
    const { getByTestId } = mount(FilterBase, {
      props: {
        facet: facetMock,
      },
    });

    expect(getByTestId('filter-checkbox'));
  });

  it('should render proper amount of filter options', async () => {
    const filterSelector = '[data-testid="filter-checkbox"]';
    const wrapper = mount(FilterBase, {
      props: {
        facet: facetMock,
      },
    });

    const showMoreButton = wrapper.getByTestId('button');

    expect(wrapper.findAll(filterSelector)).toHaveLength(5);
    expect(showMoreButton.text()).toBe('showMore');

    await showMoreButton.trigger('click');

    expect(wrapper.findAll(filterSelector)).toHaveLength(6);
    expect(showMoreButton.text()).toBe('showLess');
  });
});
