import { API_URL } from '@env';
import auth from '@react-native-firebase/auth';

interface MakeApiRequestProps {
  url: string;
  options?: RequestInit;
  authenticated?: boolean;
}

export async function makeApiRequest({
  url,
  options = {},
  authenticated,
}: MakeApiRequestProps): Promise<Response> {
  let requestOptions: RequestInit = {
    ...options,
  };

  if (authenticated) {
    const headers: HeadersInit_ = {
      ...requestOptions.headers,
      Authorization: `Bearer ${await auth().currentUser?.getIdToken()}`,
    };

    requestOptions.headers = headers;
  }

  const requestUrl = `${API_URL}${url}`;
  // console.log(requestUrl);

  // await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await fetch(requestUrl, requestOptions);

  if (response.status === 401) {
    // access token has expired, try to refresh it
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
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
