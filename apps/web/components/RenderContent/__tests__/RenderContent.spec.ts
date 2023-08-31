import { mount } from '@vue/test-utils';
import RenderContent from '~/components/RenderContent/RenderContent.vue';

describe('<RenderContent />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(RenderContent, {
      props: {
        content: [],
      },
    });

    expect(getByTestId('render-content'));
  });
});
