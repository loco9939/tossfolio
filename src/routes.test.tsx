import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import routes from './routes';
import defaultTheme from './styles/defaultTheme';

const context = describe;
describe('Routes', () => {
  context('when the current path is "/"', () => {
    beforeEach(() => {
      renderRouter('/');
    });

    it('renders `Header` Toss and Home Component', () => {
      screen.getByRole('heading', { name: 'Toss' });
    });

    it('renders Home Component', () => {
      screen.getByText(/로딩중/);
    });
  });

  context('when the current path is "/signin-complete"', () => {
    it('renders `자산 등록 하러 가기` button', () => {
      renderRouter('/signin-complete');
      screen.getByRole('button', { name: '자산 등록 하러 가기' });
    });
  });

  context('when the current path is "/assets"', () => {
    beforeEach(() => {
      renderRouter('/assets');
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
      renderRouter('/asset-detail');
      await waitFor(() => {
        screen.getByRole('year');
        screen.getByRole('month');
      });
    });
  });
});

export function renderRouter(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}
