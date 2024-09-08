import { makeApiRequest } from '../makeApiRequest';
import { Category, Page, SearchParams } from '../models';
import { buildQueryParams } from '../utils';
import { validateApiResponse } from '../validateApiResponse';

export async function getCategories(
  params: SearchParams,
  signal?: AbortSignal,
) {
  const query = buildQueryParams(params);

  const url = `/content/categories${query}`;

  console.log(url);

  await new Promise(resolve => setTimeout(resolve, 3000));

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Page<Category>;
}
