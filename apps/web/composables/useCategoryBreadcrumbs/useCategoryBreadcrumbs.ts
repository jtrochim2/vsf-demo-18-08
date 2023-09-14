import type { CatalogVersion, CategoryHierarchy } from '@vsf-enterprise/sapcc-types';
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';
import type { FindBreadcrumb } from '~/composables/useCategoryBreadcrumbs/types';

const createBreadcrumbFromCategory = ({ name, id }: CategoryHierarchy) => {
  if (!name || !id) {
    return null;
  }

  const { createCategoryUrl } = useCreateUrl();

  return {
    id,
    name,
    link: createCategoryUrl({ id }),
  };
};

const findBreadcrumb: FindBreadcrumb = ({ categoryList, categoryId, breadcrumbs = [] }) => {
  if (!categoryList?.length) {
    return [];
  }

  const category = categoryList[0];
  const breadcrumb = createBreadcrumbFromCategory(category);

  if (!breadcrumb) {
    return breadcrumbs;
  }

  if (category.id === categoryId) {
    return [...breadcrumbs, breadcrumb];
  }

  const subcategoryBreadcrumbs = findBreadcrumb({
    categoryList: category.subcategories,
    categoryId,
    breadcrumbs: [...breadcrumbs, breadcrumb],
  });

  if (subcategoryBreadcrumbs.length > 0) {
    return subcategoryBreadcrumbs;
  }

  return findBreadcrumb({ categoryList: categoryList?.slice(1), categoryId, breadcrumbs });
};

export const useCategoryBreadcrumbs = ({
  catalogVersion = ref({ categories: [] }),
  currentCategoryId,
}: {
  catalogVersion?: Ref<CatalogVersion | null>;
  currentCategoryId?: Ref<string>;
}) => {
  const { t } = useI18n();

  const breadcrumbs = computed(
    () =>
      [
        { id: 'home', name: t('home'), link: '/' },
        { id: 'allProducts', name: t('allProducts'), link: paths.category },
        ...findBreadcrumb({ categoryList: catalogVersion.value?.categories, categoryId: currentCategoryId?.value }),
      ] as Breadcrumb[],
  );

  return {
    breadcrumbs,
  };
};
