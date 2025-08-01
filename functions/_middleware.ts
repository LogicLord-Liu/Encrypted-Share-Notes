// functions/_middleware.ts
export const onRequest: PagesFunction = async ({ request, next }) => {
  const response = await next();

  // 允许所有来源（仅用于开发，生产环境应限制）
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};