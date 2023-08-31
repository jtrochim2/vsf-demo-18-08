import { mockSearchProducts } from './useSearchProducts.mock';

vi.mock('~/sdk', () => ({
  useSdk: () => ({
    sapcc: {
      searchProduct: vi.fn(() => mockSearchProducts),
    }
  })
}));

describe('useSearchProducts', () => {
  it('should return data', async () => {
    const { fetchProducts, data } = useSearchProducts();

    await fetchProducts();

    expect(data.value).toEqual(mockSearchProducts);
  });
});


