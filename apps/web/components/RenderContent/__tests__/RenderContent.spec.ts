import { mount } from '@vue/test-utils';
import RenderContent from '~/components/RenderContent/RenderContent.vue';

describe('<RenderContent />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(RenderContent, {
      props: {
        content: [
          {
            fields: {
              component: 'Heading',
              title: 'test',
              tag: 'h1',
              className: 'test',
            },
          },
        ],
      },
    });

    expect(getByTestId('render-content-Heading'));
  });
});
