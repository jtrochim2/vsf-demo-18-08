import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import FilterSize from '~/components/CategoryFilters/FilterSize.vue';
import { facetMock } from '~/components/CategoryFilters/__tests__/facet.mock';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<FilterSize />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(FilterSize, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(getByTestId('filter-size'));
  });

  it('should have proper text content', () => {
    const wrapper = mount(FilterSize, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(wrapper.text()).toContain('test-1');
  });

  it('should emit update event', async () => {
    const wrapper = mount(FilterSize, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    await wrapper.find('input').trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
  });
});
