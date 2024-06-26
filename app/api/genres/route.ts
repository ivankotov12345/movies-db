
import { instance } from '@app/helpers/axios';
import { ApiPaths } from '@app/types/enums/api-paths';

export async function GET() {
  const { data } = await instance.get(ApiPaths.GENRES_LIST);

  return Response.json(data);
}