import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import FilterCheckbox from '~/components/CategoryFilters/FilterCheckbox.vue';
import { facetMock } from '~/components/CategoryFilters/__tests__/facet.mock';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<FilterCheckbox />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(FilterCheckbox, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(getByTestId('filter-checkbox'));
  });

  it('should have proper text content', () => {
    const wrapper = mount(FilterCheckbox, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(wrapper.text()).toContain('test-1');
  });

  it('should have proper count value', () => {
    const wrapper = mount(FilterCheckbox, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(wrapper.getByTestId('counter').text()).toBe('1');
  });

  it('should emit update event', async () => {
    const wrapper = mount(FilterCheckbox, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    await wrapper.find('input').trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
  });
});
