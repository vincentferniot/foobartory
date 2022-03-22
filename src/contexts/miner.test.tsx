import { screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { MinerProvider, useMiner, initialState } from './miner';

describe('MinerContext', () => {
  const wrapper = ({ children }: any) => <MinerProvider>{children}</MinerProvider>;

  describe('intialization', () => {
    const { result } = renderHook(() => useMiner(), { wrapper });

    it('should have initialState', () => {    
      expect(result.current.state).toEqual(initialState);
    });
  
    it('should be impossible to build or buy foobar', () => {    
      act(() => {
        result.current.canBuildOrBuyFoobar();
      });
    
      expect(result.current.canBuildOrBuyFoobar()).toBeFalsy();
    });
  });

  describe('actions', () => {    
    // const wrapper = ({ children }: any) => <MinerProvider>{children}</MinerProvider>;

    describe('increment', () => {
      it('should increment foo', () => {  
        const { result } = renderHook(() => useMiner(), { wrapper });
        
        // default increment
        act(() => {
          result.current.dispatch({ type: 'increment', key: 'foo' });
        });
        expect(result.current.state.foo).toBe(1);

        // increment with amount
        act(() => {
          result.current.dispatch({ type: 'increment', key: 'foo', amount: 10 });
        });
        expect(result.current.state.foo).toBe(11);
      });
  
      it('should increment bar', () => {
        const { result } = renderHook(() => useMiner(), { wrapper });
        
        // default increment
        act(() => {
          result.current.dispatch({ type: 'increment', key: 'bar' });
        });
        expect(result.current.state.bar).toBe(1);

        // increment with amount
        act(() => {
          result.current.dispatch({ type: 'increment', key: 'bar', amount: 10 });
        });
        expect(result.current.state.bar).toBe(11);
      });
    });

    describe('decrement', () => {
      it('should decrement foo', () => {  
        const { result } = renderHook(() => useMiner(), { wrapper });
  
        // default decrement
        act(() => {
          result.current.dispatch({ type: 'decrement', key: 'foo' });
        });
        expect(result.current.state.foo).toBe(-1);

        // decrement with amount
        act(() => {
          result.current.dispatch({ type: 'decrement', key: 'foo', amount: 10 });
        });
        expect(result.current.state.foo).toBe(-11);
      });
  
      it('should decrement bar', () => {
        const { result } = renderHook(() => useMiner(), { wrapper });
  
        // default decrement
        act(() => {
          result.current.dispatch({ type: 'decrement', key: 'bar' });
        });
        expect(result.current.state.bar).toBe(-1);

        // decrement with amount
        act(() => {
          result.current.dispatch({ type: 'decrement', key: 'bar', amount: 10 });
        });
        expect(result.current.state.bar).toBe(-11);
      });
    });
    describe('addFoobar', () => {});

    

    it('should add foobar', () => {   
      const { result } = renderHook(() => useMiner(), { wrapper });

      act(() => {
        result.current.buyFoobar();
      });
      expect(result.current.state.foobars).toHaveLength(3);
    });
  });

  describe('methods', () => {
    it('should be able to buy foobar', () => {
      const { result } = renderHook(() => useMiner(), { wrapper });

      act(() => {
        result.current.buyFoobar();
      });
      expect(result.current.state.foobars).toHaveLength(3);
    });

    it('should be able to build foobar', async () => {
      const { result } = renderHook(() => useMiner(), { wrapper });

      // test both results of buildFoobar
      await act(async () => {
        return result.current.buildFoobar()
          .then(res => {
            expect(result.current.state).toEqual({
              foo: -6,
              bar: -3,
              foobars: [{ id: 1 }, { id: 2 }, { id: 3 }]
            });
          })
          .catch(error => {
            expect(result.current.state).toEqual({
              foo: -6,
              bar: 0,
              foobars: [{ id: 1 }, { id: 2 }],
            });
          });
      });
    });
  });
});