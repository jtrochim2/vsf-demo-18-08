import { Sort } from '@vsf-enterprise/sapcc-types';

interface SortOption extends Sort {
  name?: string;
  selected?: boolean;
}

export interface CategorySortingProps {
  options?: SortOption[];
  selectedOption: string;
}

export type SortingEmits = (event: 'on-change', selected: CategorySortingProps['selectedOption']) => void;
