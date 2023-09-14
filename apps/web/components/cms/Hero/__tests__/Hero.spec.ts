import { mount } from '@vue/test-utils';
import Hero from '~/components/cms/Hero/Hero.vue';

const mockData = {
  title: 'title1',
  subtitle: 'subtitle',
  description: 'description',
  buttonLink: '/link',
  buttonText: 'text',
  secondaryButtonText: 'secondary text',
  secondaryButtonLink: '/secondary',
  image: {
    alt: 'alt',
    url: 'url',
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<Hero />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(Hero, {
      props: mockData,
    });

    expect(getByTestId('hero'));
  });
});
