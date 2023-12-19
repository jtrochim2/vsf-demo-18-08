import { mount } from '@vue/test-utils';
import CategorySorting from '~/components/CategorySorting/CategorySorting.vue';

const sortingOptionsMock = [
  { code: 'relevance', name: 'relevance' },
  { code: 'topRated', name: 'Top Rated' },
  { code: 'name-asc', name: 'Name (ascending)' },
  { code: 'name-desc', name: 'Name (descending)' },
  { code: 'price-asc', name: 'Price (lowest first)' },
  { code: 'price-desc', name: 'Price (highest first)' },
];

describe('<CategorySorting />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(CategorySorting, {
      props: {
        options: sortingOptionsMock,
        selectedOption: sortingOptionsMock[0].code
      }
    });

    expect(getByTestId('category-sorting'));
  });

  it('should render component with options', () => {
    const { getByTestId } = mount(CategorySorting, {
      props: {
        options: sortingOptionsMock,
        selectedOption: sortingOptionsMock[0].code,
      }
    });
    
    sortingOptionsMock.forEach(({ code }) => getByTestId('category-sorting').text().includes(`sortType.${code}`));
  });

  it('should display first sort option by default', () => {
    const { getByTestId } = mount(CategorySorting, {
      props: {
        options: sortingOptionsMock,
        selectedOption: sortingOptionsMock[0].code
      },
    });

    expect(getByTestId('select-input').findAll('option')[0].text().includes(sortingOptionsMock[0].name))
  });
});
