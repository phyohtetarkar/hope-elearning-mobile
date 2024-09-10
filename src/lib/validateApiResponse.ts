import { ApiError } from './errors';

export async function validateApiResponse(resp: Response) {
  if (resp.status === 403) {
    throw new ApiError(resp.status, 'FORBIDDEN: Permission denied');
  }

  if (resp.status === 404) {
    throw new ApiError(resp.status, 'Resource not found');
  }

  if (resp.status === 204) {
    throw new ApiError(resp.status, 'Content not found');
  }

  if (!resp.ok) {
    const json = await resp.json();
    throw new ApiError(resp.status, json.message);
  }
}
