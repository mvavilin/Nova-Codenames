import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import RegButton from './RegButton';

describe('Registration button creation', () => {
  it('creates a button element', () => {
    const button = new RegButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
