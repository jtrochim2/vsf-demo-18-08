import { Cart } from '@vsf-enterprise/sapcc-types';
import { mount } from '@vue/test-utils';
import OrderSummary from '~/components/OrderSummary/OrderSummary.vue';

const cart: Cart = {
  appliedOrderPromotions: [],
  appliedProductPromotions: [],
  appliedVouchers: [],
  calculated: false,
  code: '1',
  deliveryAddress: {
    firstName: 'John',
    lastName: 'Doe',
    line1: 'Example street 1',
    line2: 'Example street 2',
    postalCode: '12345',
    titleCode: 'Mr',
    town: 'Example town',
    formattedAddress: 'Example street 1',
  },
  deliveryCost: {
    formattedValue: '$12.00',
    value: 12,
  },
  description: 'That is my cool cart',
  entries: [
    {
      quantity: 0,
    },
  ],
  guid: '1',
  name: 'My cart',
  deliveryOrderGroups: [
    {
      totalPriceWithTax: {
        value: 200,
        formattedValue: '$200',
        currencyIso: 'USD',
      },
    },
  ],
};

describe('<OrderSummary />', () => {
  it('should render component', () => {
    const wrapper = mount(OrderSummary, {
      props: {
        cart,
      },
    });

    expect(wrapper.getByTestId('order-summary'));
  });
});
