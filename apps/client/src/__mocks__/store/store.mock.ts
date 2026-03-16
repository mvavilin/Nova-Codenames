import { vi } from 'vitest';
import mockInitialState from '@__mocks__/store/state';

const mockStore = {
  getState: vi.fn(() => ({ ...mockInitialState })),
  dispatch: vi.fn(),
  subscribe: vi.fn(),
};

export default mockStore;
