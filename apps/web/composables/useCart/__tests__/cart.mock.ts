import type { Cart } from '@vsf-enterprise/sapcc-types';

export const cartMock: Cart = {
  appliedOrderPromotions: [],
  appliedProductPromotions: [],
  appliedVouchers: [],
  calculated: false,
  code: '123',
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
  entries: [],
  guid: '1',
  name: 'My cart',
  user: {
    uid: 'anonymous',
    name: 'Anonymous',
  },
};
