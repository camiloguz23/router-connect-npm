import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ProviderRoutes from './Router';
import { getPath } from './path';

vi.mock('./path.js', () => ({
  getPath: vi.fn()
}));

describe('Route', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should works', () => {
    render(<ProviderRoutes routes={[]} />);
    expect(true).toBeTruthy();
  });

  it('should render 404 if no routes match', () => {
    render(<ProviderRoutes routes={[]} NotFound={() => <h1>404</h1>} />);
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should render the component by route', () => {
    getPath.mockReturnValue('/about')
    const routesMock = [
      {
        path: '/',
        component: () => <h1>home</h1>
      },
      {
        path: '/about',
        component: () => <h1>about</h1>
      }
    ];
    render(<ProviderRoutes routes={routesMock} />);
    console.log(screen.debug())
    expect(screen.getByText('Page Not Found')).toBeTruthy();
  });
});
