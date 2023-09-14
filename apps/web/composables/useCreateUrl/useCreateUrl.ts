import { useRouter } from 'vue-router';

export const useCreateUrl = () => {
  const { currentRoute } = useRouter();

  const createCategoryUrl = (params: { categories?: string; id?: string }) => {
    const [, idSlug] = currentRoute.value.params?.slug || [];
    const { categories, id = idSlug } = params;
    return `${paths.category}${categories ? '/' + categories : ''}${id ? '/' + id : ''}`;
  };

  return { createCategoryUrl };
};

export const slugify = (text: string | number = '') => {
  if (typeof text === 'string') {
    return text.toLocaleLowerCase().replaceAll(' ', '-').replaceAll('/', '-');
  }
  return text.toString();
};
