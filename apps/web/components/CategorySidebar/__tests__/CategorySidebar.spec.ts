import { mount } from '@vue/test-utils';
import CategorySidebar from '~/components/CategorySidebar/CategorySidebar.vue';
import { searchParamsMock } from '~/composables/useProductSearchParams/searchParams.mock';

vi.mock('~/composables/useProductSearchParams/useProductSearchParams', () => ({
  useProductSearchParams: vi.fn(() => searchParamsMock),
}));

describe('<CategorySidebar />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(CategorySidebar, {
      props: {
        isOpen: false,
      },
    });

    expect(getByTestId('category-sidebar'));
  });
});
