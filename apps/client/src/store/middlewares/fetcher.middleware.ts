import type { Middleware } from '@/api/StateAPI/types/types';
import { WelcomeActions } from '../actions/welcome.actions';

export default function fetcher<State>(): Middleware<State> {
  return async function middleware(context) {
    if (context.action.type === WelcomeActions.GO_TO_REG_PAGE) {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(function (r) {
        return r.json();
      });
      console.log('Fetched TODO:', data);
      context.action.payload = { todo: data };
    }
    await context.next(context.action);
  };
}
