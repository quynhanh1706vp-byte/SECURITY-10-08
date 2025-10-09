import { env } from 'next-runtime-env';
import { DEFAULT_LOCALE, LOCALE_CODE_MAP } from '@i18n/config';
import { parseJwtPayload, saveAuthUser } from '@providers/data-provider/utils/auth';
import type { HttpError } from '@refinedev/core';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

const checkTokenExpiration = (token: string): number => {
  try {
    const tokenData = parseJwtPayload(token);
    const expirationTime = tokenData?.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    return Math.floor((expirationTime - currentTime) / (1000 * 60)); // Convert to minutes
  } catch {
    return 0;
  }
};

// Refresh token function
const refreshAuthToken = async () => {
  try {
    const auth = Cookies.get('auth');
    if (!auth) {
      throw new Error('No auth token found');
    }

    const parsedAuth = JSON.parse(auth);
    const response = await axios.post(
      `${env('NEXT_PUBLIC_API_ENDPOINT')}/refreshtoken?expiredToken=${parsedAuth.authToken}&refreshToken=${parsedAuth.refreshToken}`, {},
      {
        headers: {
          Authorization: `Bearer ${parsedAuth.authToken}`,
        },
      },
    );

    const { authToken } = saveAuthUser(response?.data?.data || {});

    return authToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    Cookies.remove('auth', { path: '/' });
    throw error;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(async (request: any) => {
  const auth = Cookies.get('auth');
  const culture = Cookies.get('NEXT_LOCALE') || DEFAULT_LOCALE;

  if (auth) {
    const parsedUser = JSON.parse(auth);
    const minutesLeft = checkTokenExpiration(parsedUser.authToken);
    // eslint-disable-next-line no-restricted-syntax
    console.log('Token time remaining:', minutesLeft, 'minutes');

    if (minutesLeft <= 5) {
      try {
        // eslint-disable-next-line no-restricted-syntax
        console.log('Token expiring soon, refreshing...');
        const newToken = await refreshAuthToken();
        request.headers['Authorization'] = `Bearer ${newToken}`;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
      }
    } else {
      request.headers['Authorization'] = `Bearer ${parsedUser.authToken}`;
    }
  }

  if (culture) {
    if (!request.params) {
      request.params = {};
    }
    request.params['culture'] = LOCALE_CODE_MAP[culture];
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      Cookies.remove('auth');
    }

    return Promise.reject(customError);
  },
);

export { axiosInstance };
