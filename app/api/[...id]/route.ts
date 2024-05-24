import { type NextRequest } from 'next/server';
import { instance } from '@app/helpers/axios';
import { ApiPaths } from '@app/types/enums/api-paths';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/')[3];
  
  const { data } = await instance.get(
    `${ApiPaths.MOVIE}/${id}`,
    {
      params: {
        language: 'en-US',
        append_to_response: 'videos'
      }
    }
  );
  
  return Response.json(data);
}