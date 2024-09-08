import { makeApiRequest } from '../makeApiRequest';
import { Course, Page, SearchParams } from '../models';
import { buildQueryParams } from '../utils';
import { validateApiResponse } from '../validateApiResponse';

export async function getCourseBySlug(slug: string, signal?: AbortSignal) {
  const url = `/content/courses/${slug}`;

  console.log(url);

  await new Promise(resolve => setTimeout(resolve, 3000));

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Course;
}

export async function getCourses(params: SearchParams, signal?: AbortSignal) {
  const query = buildQueryParams(params);

  const url = `/content/courses${query}`;

  console.log(url);

  await new Promise(resolve => setTimeout(resolve, 3000));

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Page<Course>;
}
