import store from '@store/store';
import type { TranslationKey } from './translationKeys';
import { translations } from './translations';

export function t(key: TranslationKey): string {
  const state = store.getState();
  return translations[state.language][key] || key;
}

export { translations } from './translations';
