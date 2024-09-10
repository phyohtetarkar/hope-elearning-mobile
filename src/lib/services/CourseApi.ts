import { makeApiRequest } from '../makeApiRequest';
import { Course, Page, SearchParams } from '../models';
import { buildQueryParams } from '../utils';
import { validateApiResponse } from '../validateApiResponse';

export async function getCourseBySlug(slug: string, signal?: AbortSignal) {
  const url = `/content/courses/${slug}`;

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

  const resp = await makeApiRequest({
    url,
    options: {
      signal,
    },
  });

  await validateApiResponse(resp);

  return (await resp.json()) as Page<Course>;
}
