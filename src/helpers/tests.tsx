import { render } from '@testing-library/react';
import Providers from 'contexts';

/**
 * HOC that returns a component wrapped in the context providers
 * @param Component component to render
 * @returns rendered component within its contexts
 */
export function renderWithAllProviders(Component: React.ComponentType) {
  return render(
    <Providers>
      <Component />
    </Providers>
  );
}

/**
 * HOC that returns a component wrapped in the context provider with custom value props
 * @param ui component to render
 * @param param1 object containing the provider props and render options
 * @param Provider context provider to use
 * @returns rendered component within provided context
 */
export function renderWithProvider(ui: React.ReactNode, {providerProps, ...renderOptions}: any, Provider: React.ComponentType<any>) {
  return render(
    <Provider {...providerProps}>{ui}</Provider>,
    renderOptions,
  )
}