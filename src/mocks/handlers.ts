import { http, delay, HttpResponse } from 'msw';

const authors = [
  { authorId: 1, name: "Charlie Chaplin" },
  { authorId: 2, name: "Albert Einstein" },
  { authorId: 3, name: "Mark Twain" },
];

const quotes = [
  { quoteId: 1, authorId: 1, quote: "A day without laughter is a day wasted." },
  { quoteId: 2, authorId: 1, quote: "Life is a tragedy when seen in close-up, but a comedy in long-shot." },
  { quoteId: 3, authorId: 2, quote: "Imagination is more important than knowledge." },
  { quoteId: 4, authorId: 2, quote: "Try not to become a man of success, but rather try to become a man of value." },
  { quoteId: 5, authorId: 3, quote: "The secret of getting ahead is getting started." },
  { quoteId: 6, authorId: 3, quote: "Kindness is a language which the deaf can hear and the blind can see." },
];

export const handlers = [
  http.get('/info', async () => {
    await delay(700);
    return HttpResponse.json({ 
      success: true, 
      data: { info: "Some information about the <b>company</b>." } 
    });
  }),

  http.get('/profile', async ({ request }) => {
    await delay(700);
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return HttpResponse.json({ success: false, message: "Missing token" }, { status: 400 });
    }

    return HttpResponse.json({ 
      success: true, 
      data: { fullname: "Aleksei K", email: "aleksei@example.com" } 
    });
  }),

  http.get('/author', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return HttpResponse.json({ success: false, message: "Missing token" }, { status: 400 });
    }

    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    return HttpResponse.json({ 
      success: true,
      data: randomAuthor
    });
  }),

  http.get('/quote', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const authorId = parseInt(url.searchParams.get('authorId') || '0', 10);

    if (!token) {
      return HttpResponse.json({ success: false, message: "Missing token" }, { status: 400 });
    }

    const authorQuotes = quotes.filter(q => q.authorId === authorId);
    if (authorQuotes.length === 0) {
      return HttpResponse.json({ 
        success: false,
        message: 'No quotes found for this author'
      }, { status: 404 });
    }
    const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];
    return HttpResponse.json({ 
      success: true,
      data: randomQuote
    });
  }),

  http.post('/login', async ({ request }) => {
    await delay(1000);
    const { email, password } = await request.json() as { email: string; password: string };
    if (email === 'aleksei@example.com' && password === 'lkJlkn8hj') {
      return HttpResponse.json({
        success: true,
        data: { token: 'fb566635a66295da0c8ad3f467c32dcf' },
      });
    } else {
      return HttpResponse.json({
        success: false,
        message: 'Access denied.',
      }, { status: 401 });
    }
  }),

  http.delete('/logout', async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return HttpResponse.json({ success: false, message: "Missing token" }, { status: 400 });
    }

    return HttpResponse.json({ 
      success: true, 
      data: {} 
    });
  }),
];
