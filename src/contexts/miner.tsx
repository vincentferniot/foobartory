import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  Dispatch,
} from 'react';

import { randomMinMax } from 'helpers/utils';

interface Foobar {
  id: number
}

interface MinerInterface {
  buildFoobar: () => Promise<string>,
  buyFoobar: () => void,
  canBuildOrBuyFoobar: () => Boolean,
  dispatch: Dispatch<Action>,
  state: State,
}

interface State {
  foo: number;
  bar: number;
  foobars: Foobar[],
}

type Action =
  | { type: 'increment'; key: 'foo' | 'bar'; amount?: number }
  | { type: 'decrement'; key: 'foo' | 'bar'; amount?: number }
  | { type: 'addFoobar'; };

const minerReducer = (state: State, action: Action) => {
  console.log('reducer', action)
  switch (action.type) {
    case 'increment':
      return { 
        ...state,
        [action.key]: state[action.key] + (action.amount ?? 1)
      };
    case 'decrement':
      return { 
        ...state,
        [action.key]: state[action.key] - (action.amount ?? 1)
      };
    case 'addFoobar': {
      return {
        ...state,
        foobars: [...state.foobars, { id: state.foobars.length + 1 }]
      };
    }
    default:
      throw new Error();
  }
};

const MinerContext = createContext({} as MinerInterface);

function MinerProvider(props: object) {
  const initialState = {
    foo: 0,
    bar: 0,
    foobars: [{ id: 1 }, { id: 2 }]
  };

  const [state, dispatch] = useReducer(minerReducer, initialState);

  const canBuildOrBuyFoobar = () => state.foo >= 6 && state.bar >= 3;

  const buildFoobar = useCallback(async () => {
    const delay = 2000;

    return new Promise<string>((resolve, reject) => {      
      dispatch({type: 'decrement', key: 'foo', amount: 6 });
      dispatch({type: 'decrement', key: 'bar', amount: 3 });

      setTimeout(() => {
        const hasSucceeded = randomMinMax(0, 1) <= 3/5;

        if (hasSucceeded) {
          resolve('success');
          dispatch({ type: 'addFoobar' });
        }
        else {
          dispatch({type: 'increment', key: 'bar', amount: 3 });
          reject('failure')
        }
      }, delay);
    });
  }, [dispatch]);

  const buyFoobar = useCallback(async () => {
    dispatch({type: 'decrement', key: 'foo', amount: 6 });
    dispatch({type: 'decrement', key: 'bar', amount: 3 });
    dispatch({ type: 'addFoobar' });
  }, [dispatch]);

  return (
    <MinerContext.Provider
      value={{
        buildFoobar,
        buyFoobar,
        canBuildOrBuyFoobar,
        dispatch,
        state,
      }}
      {...props} 
    />
  );
}

function useMiner() {
  const context = useContext(MinerContext)
  if (context === undefined) {
    throw new Error("useMiner must be within MinerProvider")
  }

  return context
}

export { MinerProvider, useMiner };
