import type { Facet, FacetValue } from '@vsf-enterprise/sapcc-types';

export type CategoryFiltersProps = {
  facets: Facet[];
};

export type FilterProps = {
  facet: Facet;
};

export type FilterItemProps = {
  facetValue: FacetValue;
};

export type FilterItemEmits = (event: 'update:modelValue', parameter: FacetValue) => void;
