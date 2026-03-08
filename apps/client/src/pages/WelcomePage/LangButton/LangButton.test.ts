import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import LangButton from './LangButton';

describe('Language button creation', () => {
  it('creates a button element', () => {
    const button = new LangButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
