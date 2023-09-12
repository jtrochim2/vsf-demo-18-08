import { mount } from '@vue/test-utils';
import SearchEmptyState from '~/components/SearchEmptyState/SearchEmptyState.vue';

describe('<SearchEmptyState />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(SearchEmptyState);

    expect(getByTestId('search-empty-state'));
  });

  it('should have a link pointing to all categories', () => {
    const { findByTestId } = mount(SearchEmptyState);

    expect(findByTestId('button').attributes('to')).toBe(paths.category);
  });
});
