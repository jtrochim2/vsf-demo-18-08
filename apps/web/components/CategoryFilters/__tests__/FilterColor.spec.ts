import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import FilterColor from '~/components/CategoryFilters/FilterColor.vue';
import { facetMock } from '~/components/CategoryFilters/__tests__/facet.mock';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

const mockQuery = vi.fn(() => ({ query: { value: 'mocked param' } }));

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<FilterColor />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(FilterColor, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(getByTestId('filter-color'));
  });

  it('should have proper text content', () => {
    const wrapper = mount(FilterColor, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(wrapper.text()).toContain('test-1');
  });

  it('should have proper count value', () => {
    const wrapper = mount(FilterColor, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    expect(wrapper.getByTestId('counter').text()).toBe('1');
  });

  it('should have proper style set', () => {
    const wrapper = mount(FilterColor, {
      props: {
        facetValue: { ...facetMock.values![0], name: '#000' },
      },
    });

    expect(wrapper.findByTestId('chip-thumbnail').attributes('style')).toBe('background-color: #000;');
  });

  it('should emit update event', async () => {
    const wrapper = mount(FilterColor, {
      props: {
        facetValue: facetMock.values![0],
      },
    });

    await wrapper.find('input').trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
  });
});
