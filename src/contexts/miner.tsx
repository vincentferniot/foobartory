import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  Dispatch,
} from 'react';

import { randomMinMax } from 'helpers/utils';
import { MAX_FOOBARS } from 'helpers/constants';

interface Foobar {
  id: number
}

export interface MinerInterface {
  buildFoobar: () => Promise<string>,
  buyFoobar: () => void,
  canBuildOrBuyFoobar: () => Boolean,
  hasReachedMaxFoobars: () => Boolean,
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
  | { type: 'addFoobar'; }
  | { type: 'reset'; };


const initialState = {
  foo: 0,
  bar: 0,
  foobars: [{ id: 1 }, { id: 2 }]
};

const reducer = (state: State, action: Action) => {
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
    case 'reset': {
      return {
        ...initialState,
      };
    }
    default:
      throw new Error();
  }
};

const MinerContext = createContext({} as MinerInterface);

function MinerProvider(props: object) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const canBuildOrBuyFoobar = () => (state.foo >= 6 && state.bar >= 3) && !hasReachedMaxFoobars();

  const hasReachedMaxFoobars = () => state.foobars.length >= MAX_FOOBARS;

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
        hasReachedMaxFoobars,
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

export {
  MinerProvider,
  useMiner,
  MinerContext,
  initialState,
  reducer,
};
