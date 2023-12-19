import { mount } from '@vue/test-utils';
import CategoryCard from '~/components/cms/CategoryCard/CategoryCard.vue';

describe('<CategoryCard />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(CategoryCard);

    expect(getByTestId('category-card'));
  });
});
