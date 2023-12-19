import { ref } from 'vue';
import { Breadcrumb } from '~/components/ui/Breadcrumbs/types';
import { useCategoryBreadcrumbs } from '~/composables/useCategoryBreadcrumbs';

const mockBreadcrumbs = (...breadcrumbs: Breadcrumb[]) => [
  { id: 'home', link: '/', name: 'home' },
  { id: 'allProducts', link: '/category', name: 'allProducts' },
  ...breadcrumbs,
];

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: ref({
      params: {
        slug: ['categories'],
      },
    }),
  })),
}));

vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(() => ({
    t: (phrase: string) => phrase,
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useCategoryBreadcrumbs', () => {
  it('should return breadcrumbs for a category without subcategories', () => {
    const categoriesMock = [
      {
        id: 'categories',
        name: 'Categories',
        url: '',
        subcategories: [],
      },
    ];

    const { breadcrumbs } = useCategoryBreadcrumbs({
      catalogVersion: ref({ categories: categoriesMock }),
      currentCategoryId: ref('categories'),
    });

    expect(breadcrumbs.value).toMatchObject(
      mockBreadcrumbs({ id: 'categories', link: '/category/categories', name: 'Categories' }),
    );
  });

  it('should return breadcrumbs for a category with subcategories', () => {
    const categoriesMock = [
      {
        id: 'categories',
        name: 'Categories',
        url: '',
        subcategories: [
          {
            id: '220000',
            name: 'Accessories',
            url: '',
            subcategories: [],
          },
          {
            id: '1456',
            name: 'Test',
            url: '',
            subcategories: [
              {
                id: '5678',
                name: 'Test2',
                url: '',
                subcategories: [],
              },
            ],
          },
        ],
      },
    ];

    const { breadcrumbs } = useCategoryBreadcrumbs({
      catalogVersion: ref({ categories: categoriesMock }),
      currentCategoryId: ref('5678'),
    });

    expect(breadcrumbs.value).toEqual(
      mockBreadcrumbs(
        { id: 'categories', link: '/category/categories', name: 'Categories' },
        { id: '1456', link: '/category/1456', name: 'Test' },
        { id: '5678', link: '/category/5678', name: 'Test2' },
      ),
    );
  });

  it('should return base breadcrumbs if no category provided', () => {
    const { breadcrumbs } = useCategoryBreadcrumbs({});

    expect(breadcrumbs.value).toEqual(mockBreadcrumbs());
  });

  it('should handle invalid categories', () => {
    const categoriesMock = [
      {
        name: 'Categories',
        url: '',
        subcategories: [
          {
            name: 'Accessories',
            url: '',
            subcategories: [],
          },
        ],
      },
    ];

    const { breadcrumbs } = useCategoryBreadcrumbs({
      catalogVersion: ref({ categories: categoriesMock }),
      currentCategoryId: ref('5678'),
    });

    expect(breadcrumbs.value).toEqual(mockBreadcrumbs());
  });
});
