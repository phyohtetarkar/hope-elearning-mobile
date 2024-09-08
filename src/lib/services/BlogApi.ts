import { makeApiRequest } from '../makeApiRequest';
import { Page, Post, SearchParams } from '../models';
import { buildQueryParams } from '../utils';
import { validateApiResponse } from '../validateApiResponse';

export async function getPostBySlug(slug: string, signal?: AbortSignal) {
  const url = `/content/posts/${slug}`;

  console.log(url);

  await new Promise(resolve => setTimeout(resolve, 3000));

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Post;
}

export async function getPosts(params: SearchParams, signal?: AbortSignal) {
  const query = buildQueryParams(params);

  const url = `/content/posts${query}`;

  console.log(url);

  await new Promise(resolve => setTimeout(resolve, 3000));

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Page<Post>;
}
