import { Facet } from '@vsf-enterprise/sapcc-types';

export const facetMock: Facet = {
  name: 'test',
  values: [
    {
      count: 1,
      name: 'test-1',
      query: { query: { value: 'test-1' }, url: 'test-1' },
      selected: false,
    },
    {
      count: 2,
      name: 'test-2',
      query: { query: { value: 'test-2' }, url: 'test-2' },
      selected: false,
    },
    {
      count: 3,
      name: 'test-3',
      query: { query: { value: 'test-3' }, url: 'test-3' },
      selected: false,
    },
    {
      count: 4,
      name: 'test-4',
      query: { query: { value: 'test-4' }, url: 'test-4' },
      selected: false,
    },
    {
      count: 5,
      name: 'test-5',
      query: { query: { value: 'test-5' }, url: 'test-5' },
      selected: false,
    },
    {
      count: 6,
      name: 'test-6',
      query: { query: { value: 'test-6' }, url: 'test-6' },
      selected: false,
    },
  ],
};
