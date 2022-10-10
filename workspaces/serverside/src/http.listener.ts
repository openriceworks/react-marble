import { httpListener } from '@marblejs/http';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { data$ } from './api.effects';
import { cors$ } from '@marblejs/middleware-cors';

const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
    allowHeaders: '*',
    maxAge: 3600,
  })
];

const effects = [
  data$,
];

export const listener = httpListener({
  middlewares,
  effects,
});