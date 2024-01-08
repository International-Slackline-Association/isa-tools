import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { showErrorNotification } from 'utils';

export const API_BASE_URL = '';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://docs-api.slacklineinternational.org',
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const message = `Error: ${action?.payload?.data?.message || action?.error?.message}`;
    api.dispatch(showErrorNotification(message));
  }

  return next(action);
};
