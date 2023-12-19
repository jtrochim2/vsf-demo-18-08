import type { Product } from "@vsf-enterprise/sapcc-types";

export const productsMock: Product[] = [
  {
    code: '123',
    baseProduct: '123',
    price: {
      currencyIso: 'GBP',
      formattedValue: '£1.23',
      value: 22.22,
    },
    name: 'Test Product',
    images: [
      {
        format: 'product',
        url: 'https://test.com/test.jpg?context=test',
      },
      {
        format: 'product',
        url: 'https://test.com/test.jpg?context=test',
      },
    ],
    url: '/Brands/Playboard/T-Shirt-Men-Playboard-Raster-SS/p/300046038',
  }
];
export const totalProductsMock = 255;
