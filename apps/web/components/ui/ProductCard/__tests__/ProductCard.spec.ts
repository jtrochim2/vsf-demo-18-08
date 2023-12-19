import { mount } from '@vue/test-utils';
import ProductCard from '~/components/ui/ProductCard/ProductCard.vue';

describe('<ProductCard />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(ProductCard, {
      props: {
        name: 'test',
        price: {
          formattedValue: '£1.23',
        },
        imageUrl: '/images/product.webp',
        link: '/'
      },
    });

    expect(getByTestId('product-card'));
  });
});
