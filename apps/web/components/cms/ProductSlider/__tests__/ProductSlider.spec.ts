import { mount } from '@vue/test-utils';
import ProductSlider from '~/components/cms/ProductSlider/ProductSlider.vue';

describe('<ProductSlider />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(ProductSlider);

    expect(getByTestId('product-slider'));
  });
});
