import { Prettify } from '@storefront-ui/shared';
import { compile, match } from 'path-to-regexp';
import { CompileArguments, ExtractParams } from '~/utils/types';

export const createRoute = <TPattern extends string, TParams extends object = Prettify<ExtractParams<TPattern>>>(
  pattern: TPattern,
) => ({
  compile(...arguments_: CompileArguments<TParams>): string {
    const [parameters] = arguments_;
    return compile<TParams>(pattern)(parameters as TParams);
  },
  match: match<TParams>(pattern),
});

export const cloudinaryLoader = (url: string): string => {
  const [imagePathWithoutParams, searchParams = ''] = url.split('?');
  const segmentsParameter = imagePathWithoutParams.split('/').filter(Boolean);
  const sapContextSearchParameter = new URLSearchParams(searchParams).get('context');

  const route = createRoute('/sap/:segments*/context/:context');
  return route.compile({ segments: segmentsParameter, context: sapContextSearchParameter });
};
