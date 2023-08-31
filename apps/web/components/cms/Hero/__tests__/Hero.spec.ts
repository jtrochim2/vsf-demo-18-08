import { mount } from '@vue/test-utils';
import Hero from '~/components/cms/Hero/Hero.vue';

describe('<Hero />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(Hero);

    expect(getByTestId('hero'));
  });
});
