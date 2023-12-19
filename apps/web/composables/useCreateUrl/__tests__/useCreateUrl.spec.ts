import { useRouter } from 'vue-router';
import { SpyInstance } from 'vitest';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: ref({}),
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const categories = 'cat';
const id = 'id';
describe('useCreateUrl', () => {
  it('should have working createCategoryUrl', () => {
    const { createCategoryUrl } = useCreateUrl();

    expect(createCategoryUrl({ categories, id })).toBe(`/category/${categories}/${id}`);
    expect(createCategoryUrl({ categories })).toBe(`/category/${categories}`);
    expect(createCategoryUrl({})).toBe(`/category`);
  });

  describe('when router slugs exists', () => {
    it('should use defaults when args given', () => {
      const categoriesSlug = 'catSlug';
      const idSlug = 'idSlug';
      (useRouter as unknown as SpyInstance).mockImplementationOnce(() => ({
        currentRoute: ref({
          params: {
            slug: [categoriesSlug, idSlug],
          },
        }),
      }));

      const { createCategoryUrl } = useCreateUrl();

      expect(createCategoryUrl({ categories, id })).toBe(`/category/${categories}/${id}`);
      expect(createCategoryUrl({ categories })).toBe(`/category/${categories}/${idSlug}`);
      expect(createCategoryUrl({})).toBe(`/category/${idSlug}`);
    });
  });
});
