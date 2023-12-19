import { flushPromises, mount } from '@vue/test-utils';
import { cartMock } from '~/composables/useCart/__tests__/cart.mock';
import { useCart } from '~/composables/useCart/useCart';

const createCartMock = vi.fn(() => Promise.resolve(cartMock));
const getCartMock = vi.fn(() => Promise.resolve(cartMock));
const getCookieMock = vi.fn(() => '');

vi.mock('~/sdk', () => ({
  useSdk: () => ({
    sapcc: {
      getCart: getCartMock,
      createCart: createCartMock,
    },
  }),
}));

vi.mock('js-cookie', () => ({
  default: {
    get: () => getCookieMock(),
    set: () => ({}),
  },
}));

const TestComponent = defineComponent({
  template: '<span />',
  setup() {
    return {
      ...useCart(),
    };
  },
});

beforeEach(() => {
  clearNuxtState('useCart');
  clearNuxtData();
  vi.clearAllMocks();
});

describe('useCart', () => {
  it('should have no data on initial state', async () => {
    const wrapper = mount(TestComponent);

    expect(wrapper.vm.data).toBe(null);
  });

  it('should return cart data', async () => {
    const wrapper = mount(TestComponent);

    await flushPromises();

    expect(wrapper.vm.data).toMatchObject(cartMock);
  });

  it('should create a new cart when no cookie available', async () => {
    mount(TestComponent);

    await flushPromises();

    expect(createCartMock).toHaveBeenCalled();
  });

  it('should fetch existing cart when cookie is available', async () => {
    getCookieMock.mockReturnValueOnce('123');
    mount(TestComponent);

    await flushPromises();

    expect(getCartMock).toHaveBeenCalled();
  });

  it('should fetch cart data only once per instance', async () => {
    mount(TestComponent);
    mount(TestComponent);

    await flushPromises();

    expect(createCartMock).toHaveBeenCalledOnce();
  });
});
