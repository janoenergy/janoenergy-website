export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 转发到 Pages 项目
    const targetUrl = `https://janoenergy-website.pages.dev${url.pathname}${url.search}`;
    
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    
    const response = await fetch(modifiedRequest);
    
    // 创建新的响应，添加安全头
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    
    return modifiedResponse;
  },
};
