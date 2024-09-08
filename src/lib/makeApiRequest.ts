import { API_URL } from '@env';

interface MakeApiRequestProps {
  url: string;
  options?: RequestInit;
}

export async function makeApiRequest({
  url,
  options = {},
}: MakeApiRequestProps): Promise<Response> {
  let requestOptions: RequestInit = {
    ...options,
  };

  const requestUrl = `${API_URL}${url}`;
  const response = await fetch(requestUrl, requestOptions);

  if (response.status === 401) {
    // access token has expired, try to refresh it
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
    });
    if (refreshResponse.ok) {
      //   const { accessToken, refreshToken } = await refreshResponse.json();
      // retry original request with new access token
      const retryResponse = await fetch(requestUrl, requestOptions);
      return retryResponse;
    }
  }
  return response;
}
