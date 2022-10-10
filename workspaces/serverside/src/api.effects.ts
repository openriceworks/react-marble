import { combineRoutes, r } from '@marblejs/http';
import { map } from 'rxjs/operators';
import {Data} from 'common'

const getData$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ => {
    return req$.pipe(
        map(_ => {
          const body: Data = {
            label: "name",
            value: "react-marble"
          }
          return {body}
        }),
      )
    })
  )

const postData$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ => {
    return req$.pipe(
        map(value => ({ body: value.body })),
      )
    })
  );

export const data$ = combineRoutes('/data', [
  getData$,
  postData$
])