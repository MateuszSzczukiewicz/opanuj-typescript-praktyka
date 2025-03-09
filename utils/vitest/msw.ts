import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, vi } from 'vitest';

const getQueryParams = (url: string): Record<string, string> => {
  const searchParams = new URL(url).searchParams;
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

const withOptionalDelay = (handler: () => HttpResponse) => {
  return async ({ request }: { request: Request }) => {
    const queryParams = getQueryParams(request.url);
    if (queryParams.delay) {
      await delay(parseInt(queryParams.delay));
    }
    return handler();
  };
};

const restHandlers = [
  http.get(
    'https://dummyjson.com/products/search',
    withOptionalDelay(() => {
      return HttpResponse.json({
        products: [],
      });
    }),
  ),

  http.get('https://dummyjson.com/quotes', ({ request }) => {
    const queryParams = getQueryParams(request.url);
    return HttpResponse.json({
      quotes: [],
      total: 50,
      skip: parseInt(queryParams.skip),
      limit: parseInt(queryParams.limit),
    });
  }),

  http.get('https://swapi.dev/api/planets', ({ request }) => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
        },
      ],
    });
  }),

  http.get('https://swapi.dev/api/starships', () => {
    return HttpResponse.json({
      count: 1,
      next: 'https://swapi.dev/api/starships?page=2',
      previous: 'https://swapi.dev/api/starships?page=1',
      results: [
        {
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          manufacturer: 'Corellian Engineering Corporation',
          cost_in_credits: '3500000',
          length: '150',
          max_atmosphering_speed: '950',
          crew: '30-165',
          passengers: '600',
          cargo_capacity: '3000000',
          consumables: '1 year',
          hyperdrive_rating: '2.0',
          MGLT: '60',
          starship_class: 'corvette',
          pilots: [],
          films: [],
          created: '2014-12-10T14:20:33.369000Z',
          edited: '2014-12-20T21:23:49.867000Z',
          url: 'https://swapi.dev/api/starships/2/',
        },
      ],
    });
  }),

  http.post('http://localhost:3000/api/tracker', () => {
    return HttpResponse.json({
      success: true,
    });
  }),
];

interface SetupMockServerOptions {
  logRequest?: boolean;
}

export function setupMockServer({ logRequest = false }: SetupMockServerOptions = {}) {
  const server = setupServer(...restHandlers);
  let requestLog: Request[] = [];

  server.events.on('request:start', async ({ request }) => {
    requestLog.push(request);
    if (logRequest) {
      console.log('Request started:', request.url, request.method);
    }
  });

  const verifyRequest = (requestUrl: string, requestMethod: string) => {
    const hasMatch = requestLog.some(
      (request) => request.url.includes(requestUrl) && request.method === requestMethod,
    );

    return hasMatch;
  };

  const verifyRequestCount = (requestUrl: string, requestMethod: string) => {
    const matchingRequests = requestLog.filter(
      (request) => request.url === requestUrl && request.method === requestMethod,
    );
    return matchingRequests.length;
  };

  const resetHandlers = () => {
    server.resetHandlers();
    requestLog = [];
  };

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterAll(() => {
    server.close();
    vi.useRealTimers();
  });

  return { verifyRequest, verifyRequestCount, resetHandlers };
}
