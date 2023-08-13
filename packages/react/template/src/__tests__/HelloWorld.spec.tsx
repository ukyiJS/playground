import { describe, expect, it } from 'vitest';
import { render, screen } from './utils';
import App from '@/App';

describe('HelloWorld', () => {
  it('renders properly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Vite + React');
  });
});
