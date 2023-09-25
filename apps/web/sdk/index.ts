import { contentfulModule, ContentfulModuleType } from '@vsf-enterprise/contentful-sdk';
import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { type SdkModule, sdkModule } from '@vue-storefront/storefront-boilerplate-sdk';

export const useSdk = () => {
  const config = useRuntimeConfig();
  const { NUXT_PUBLIC_SDK_SAPCC_API_URL, NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL, NUXT_PUBLIC_SDK_CNTF_API_URL } =
    config.public;

  const sdkConfig = {
    commerce: buildModule<SdkModule>(sdkModule),
    sapcc: buildModule<SAPCCModuleType>(sapccModule, {
      apiUrl: NUXT_PUBLIC_SDK_SAPCC_API_URL,
      ssrApiUrl: NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL,
    }),
    contentful: buildModule<ContentfulModuleType>(contentfulModule, {
      apiUrl: NUXT_PUBLIC_SDK_CNTF_API_URL,
    }),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
};
