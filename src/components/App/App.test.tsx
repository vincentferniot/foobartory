import { render, screen } from '@testing-library/react';
import App from '.';

test('renders learn react link', () => {
  render(<App />);
  const foobarElement = screen.getByText(/foobar/i);
  expect(foobarElement).toBeInTheDocument();
  // expect(foobarElement).toHaveLength(2);
});
