import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  store: mockStore,
}));

import LoginButton from './LoginButton';

describe('Login button creation', () => {
  it('creates a button element', () => {
    const button = new LoginButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
