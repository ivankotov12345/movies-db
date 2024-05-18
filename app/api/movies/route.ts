import { type NextRequest } from 'next/server';
import { instance } from '@app/helpers/axios';
import { ApiPaths } from '@app/types/enums/api-paths';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const { data } = await instance.get(`${ApiPaths.MOVIES_LIST}?${searchParams}`);
  
  return Response.json(data);
}