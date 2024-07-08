import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useSession from './hooks/useSession';
import routes from './routes';
import defaultTheme from './styles/defaultTheme';

const context = describe;

vi.mock('@/hooks/useSession', () => ({
  default: vi.fn(),
}));

describe('Routes', () => {
  context('when the current path is "/"', () => {
    beforeEach(() => {
      renderRouter('/', 'test-user');
    });

    it('renders `Header` Toss and Home Component', () => {
      screen.getByRole('img');
    });

    it('renders Home Component', () => {
      screen.getByText(/로딩중/);
    });
  });

  context('when the current path is "/landing"', () => {
    it('renders "로그인", "나만의 자산관리""', () => {
      renderRouter('/landing');

      screen.getByText(/로그인/);
      screen.getByText(/나만의 자산관리/);
    });

    it('renders "홈으로', () => {
      renderRouter('/landing', 'test-user');

      screen.getByText(/홈으로/);
    });
  });

  context('when the current path is "/signin-complete"', () => {
    it('renders `자산 등록 하러 가기` button', () => {
      renderRouter('/signin-complete', 'test-user');
      screen.getByRole('button', { name: '자산 등록 하러 가기' });
    });
  });

  context('when the current path is "/assets"', () => {
    beforeEach(() => {
      renderRouter('/assets', 'test-user');
    });

    it('renders `YearSelct` component', async () => {
      await waitFor(() => {
        screen.getByRole('prev');
        screen.getByRole('next');
      });
    });

    it('renders 12 of `MonthAsset` component', async () => {
      await waitFor(() => {
        const monthList = screen.getByRole('year-asset-list');

        expect(monthList).toBeInTheDocument();
      });
    });
  });

  context('when the current path is "/asset-detail"', () => {
    it('renders `YearSelect`, `MonthSelect` component', async () => {
      renderRouter('/asset-detail', 'test-user');
      await waitFor(() => {
        screen.getByRole('year');
        screen.getByRole('month');
      });
    });
  });

  context('when the current path is "/signin"', () => {
    it('renders 카카오톡', () => {
      renderRouter('/signin', 'test-user');

      screen.getByRole('login');
    });
  });
});

export function renderRouter(path: string, session?: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  (useSession as jest.Mock).mockReturnValue({ session });
  render(
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}
