import { useMiner } from 'contexts/miner';
import './style.css';

import Header from 'components/Header'
import Factory from 'components/Factory'
import Foobar from 'components/Foobar'

function App() {
  const { state: { foobars } } = useMiner();

  return (
    <div className="App" data-testid="app">
      <Header />
      <Factory>
        {foobars.map(foobar => (
          <Foobar key={foobar.id} />
        ))}
      </Factory>
    </div>
  );
}

export default App;
