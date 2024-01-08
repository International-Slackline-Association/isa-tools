import { baseApi } from 'store/rtk-query';
import { AsyncReturnType } from 'type-fest';
import {
  listCertifiedGears,
  listInstructors,
  listRiggers,
  listEquipmentWarnings,
} from '@server/functions/api/endpoints/listings-api';

export const listingsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getInstructorsList: builder.query<AsyncReturnType<typeof listInstructors>['items'], void>({
        query: () => ({
          url: `list/instructors`,
        }),
        transformResponse: (response: AsyncReturnType<typeof listInstructors>) => {
          return response.items;
        },
      }),
      getRiggerList: builder.query<AsyncReturnType<typeof listRiggers>['items'], void>({
        query: () => ({
          url: `list/riggers`,
        }),
        transformResponse: (response: AsyncReturnType<typeof listRiggers>) => {
          return response.items;
        },
      }),
      getCertifiedGears: builder.query<AsyncReturnType<typeof listCertifiedGears>['items'], void>({
        query: () => ({
          url: `list/approved-gears`,
        }),
        transformResponse: (response: AsyncReturnType<typeof listCertifiedGears>) => {
          return response.items;
        },
      }),
      getEquipmentWarnings: builder.query<AsyncReturnType<typeof listEquipmentWarnings>['items'], void>({
        query: () => ({
          url: `list/equipment-warnings`,
        }),
        transformResponse: (response: AsyncReturnType<typeof listEquipmentWarnings>) => {
          return response.items;
        },
      }),
    }),
  });
