import { render } from '@testing-library/react';
import Providers from 'contexts';

/**
 * HOC that returns a component wrapped in the context providers
 * @param Component component to render
 * @returns rendered component within its contexts
 */
export function renderWithContextProviders(Component: React.ComponentType) {
  return render(
    <Providers>
      <Component />
    </Providers>
  );
}