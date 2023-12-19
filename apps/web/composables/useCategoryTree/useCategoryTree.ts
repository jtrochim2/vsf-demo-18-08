import type { CatalogVersion, CategoryHierarchy, ProductSearchPage } from '@vsf-enterprise/sapcc-types';

type FindParentAndSubcategoriesReturns = {
  parent?: CategoryHierarchy;
  subcategories: CategoryHierarchy[];
};

export type FindParentAndSubcategories = (
  categoryId: string | undefined,
  categories: CategoryHierarchy[] | undefined,
  parent?: CategoryHierarchy,
) => FindParentAndSubcategoriesReturns;

export const useCategoryTree = ({
  productsCatalog,
  catalogVersion,
  currentCategoryId,
}: {
  productsCatalog: Ref<ProductSearchPage | null>;
  catalogVersion: Ref<CatalogVersion | null>;
  currentCategoryId: Ref<string>;
}) => {
  const currentCategoryBreadcrumb = computed(() => {
    return productsCatalog.value?.breadcrumbs?.find(({ facetValueCode }) => facetValueCode === currentCategoryId.value);
  });

  const findParentAndSubcategories: FindParentAndSubcategories = (categoryId, categories = [], parent) => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return { parent, subcategories: category.subcategories ?? [] };
      }
      if (category.subcategories && category.subcategories.length > 0) {
        const { parent, subcategories } = findParentAndSubcategories(categoryId, category.subcategories, category);
        if (parent) {
          return { parent, subcategories };
        }
      }
    }
    return { parent: undefined, subcategories: categories };
  };

  const parentAndCategories = computed(() =>
    findParentAndSubcategories(currentCategoryBreadcrumb.value?.facetValueCode, catalogVersion.value?.categories),
  );

  return {
    parent: computed(() => parentAndCategories.value.parent),
    subcategories: computed(() => parentAndCategories.value.subcategories),
  };
};
