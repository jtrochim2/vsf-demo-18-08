import { mount } from '@vue/test-utils';
import CategoryPageContent from '~/components/CategoryPageContent/CategoryPageContent.vue';
import { productsMock, totalProductsMock } from './CategoryPageContent.mock';

describe('<CategoryPageContent />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(CategoryPageContent, {
      props: {
        title: 'title',
        totalProducts: totalProductsMock,
        products: productsMock,
        itemsPerPage: 24,
      },
    });

    expect(getByTestId('category-page-content'));
  });

  it('should have title', () => {
    const wrapper = mount(CategoryPageContent, {
      props: {
        title: 'title',
        totalProducts: totalProductsMock,
        products: productsMock,
        itemsPerPage: 24,
      },
    });

    expect(wrapper.find('h1').text()).toBe('title');
  });

  it('should render empty state', () => {
    const { findByTestId } = mount(CategoryPageContent, {
      props: {
        title: 'title',
        totalProducts: 0,
        products: [],
        itemsPerPage: 24,
      },
    });

    expect(findByTestId('category-grid').exists()).toBe(false);
  });

  it('should have pagination', () => {
    const { getByTestId } = mount(CategoryPageContent, {
      props: {
        title: 'title',
        totalProducts: totalProductsMock,
        products: productsMock,
        itemsPerPage: 24,
      },
    });

    expect(getByTestId('pagination'));
  });

  it('should render products', () => {
    const { getByTestId } = mount(CategoryPageContent, {
      props: {
        title: 'title',
        totalProducts: totalProductsMock,
        products: productsMock,
        itemsPerPage: 24,
      },
    });

    expect(getByTestId('product-card'));
  });
});
