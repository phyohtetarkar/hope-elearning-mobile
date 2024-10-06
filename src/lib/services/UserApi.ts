import { makeApiRequest } from '../makeApiRequest';
import { User } from '../models';
import { validateApiResponse } from '../validateApiResponse';

export async function getUser(signal?: AbortSignal) {
  const url = '/profile';

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
    authenticated: true,
  });

  await validateApiResponse(resp);

  return (await resp.json()) as User;
}
