import { MinerProvider } from './miner';

type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <MinerProvider>
      {children}
    </MinerProvider>
  )
}
