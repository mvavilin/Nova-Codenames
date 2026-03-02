import type { Middleware } from '@/api/StateAPI';

export default function logger<State>(): Middleware<State> {
  return async function middleware(context) {
    console.log('Middleware Action:', context.action.type, 'State:', context.getState());
    await context.next(context.action);
  };
}
