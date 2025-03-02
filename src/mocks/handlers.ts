import { http, delay, HttpResponse } from 'msw';

export const handlers = [
  http.get('/info', async () => {
    await delay(700);

    return HttpResponse.json({ 
      success: true, 
      data: {
        info: "Some information about the <b>company</b>."
      } 
    });
  }),

  http.post('/login', async ({ request }) => {
    await delay(1000);
    const { email, password } = await request.json() as { email: string; password: string };
    
    if (email === 'aleksei@example.com' && password === 'lkJlkn8hj') {
      return HttpResponse.json({
        success: true,
        data: {
          token: 'fb566635a66295da0c8ad3f467c32dcf',
        },
      });
    } 
    else {
      return HttpResponse.json({
        success: false,
        message: 'Access denied.',
      }, { status: 401 });
    }
  }),
];
