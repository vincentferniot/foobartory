import { screen } from '@testing-library/react';
import App from '.';
import { renderWithAllProviders } from 'helpers/tests';

describe('App', () => {
  it('should render', async () => {
    renderWithAllProviders(App);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('should render with Header', async () => {
    renderWithAllProviders(App);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render with 2 foobars at start', async () => {
    renderWithAllProviders(App);
    expect(screen.getAllByTestId('foobar')).toHaveLength(2);
  });
});
