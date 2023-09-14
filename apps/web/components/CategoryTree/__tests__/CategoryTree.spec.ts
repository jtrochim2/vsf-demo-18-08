import { mount } from '@vue/test-utils';
import { SpyInstance } from 'vitest';
import CategoryTree from '~/components/CategoryTree/CategoryTree.vue';
import { useCategoryTree } from '~/composables/useCategoryTree/useCategoryTree';

const mockSubcategories = [
  {
    id: 'collections',
    lastModified: '2022-11-15T08:03:59+0000',
    name: 'Collections',
    url: '/apparel-uk/catalogs/apparelProductCatalog/Online/categories/collections',
    subcategories: [],
  },
  {
    id: 'categories',
    lastModified: '2022-11-15T08:05:10+0000',
    name: 'Categories',
    url: '/apparel-uk/catalogs/apparelProductCatalog/Online/categories/categories',
    subcategories: [],
  },
  {
    id: 'brands',
    lastModified: '2022-12-12T10:26:45+0000',
    name: 'Brands',
    url: '/apparel-uk/catalogs/apparelProductCatalog/Online/categories/brands',
    subcategories: [],
  },
  {
    id: 'sales',
    lastModified: '2022-12-12T11:46:27+0000',
    name: 'Sales',
    url: '/apparel-uk/catalogs/apparelProductCatalog/Online/categories/sales',
    subcategories: [],
  },
];

vi.mock('~/composables/useCategoryTree/useCategoryTree', () => ({
  useCategoryTree: vi.fn(() => ({
    parent: ref(undefined),
    subcategories: ref(mockSubcategories),
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: ref({}),
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<CategoryTree/>', () => {
  it('should render component', () => {
    const { getByTestId } = mount(CategoryTree, {
      props: {
        currentCategoryId: '',
      },
    });

    const { createCategoryUrl } = useCreateUrl();

    expect(getByTestId('category-tree'));

    getByTestId('categories')
      .findAll('router-link-stub')
      .forEach((routerLink, index) => {
        expect(routerLink.attributes('to')).toBe(
          createCategoryUrl({
            categories: slugify(mockSubcategories[index].name),
            id: mockSubcategories[index].id,
          }),
        );
      });
  });

  it('when useCategoryTree has no categories, should render nothing', () => {
    (useCategoryTree as unknown as SpyInstance).mockImplementationOnce(() => ({
      parent: ref(undefined),
      subcategories: ref([]),
    }));

    const { getByTestId } = mount(CategoryTree, {
      props: {
        currentCategoryId: '',
      },
    });

    expect(getByTestId('categories').find('router-link-stub').exists()).toBeFalsy();
  });
});
