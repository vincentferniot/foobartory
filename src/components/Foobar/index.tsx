import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';
import { randomMinMax } from 'helpers/utils';
import { useMiner } from 'contexts/miner';
import './style.css';

const IDLE = 'IDLE';
const MINING_FOO = 'MINING_FOO';
const MINING_BAR = 'MINING_BAR';
const BUILDING_FOOBAR = 'BUILDING_FOOBAR';
const TRANSFERRING = 'TRANSFERRING';

const MINE_FOO = 'MINE_FOO';
const MINE_BAR = 'MINE_BAR';
const BUILD_FOOBAR = 'BUILD_FOOBAR';

export default function Foobar() {
  const [ status, setStatus ] = useState<string>(IDLE);
  const [ task, setTask ] = useState<string>('');
  const { buildFoobar, canBuildOrBuyFoobar, dispatch } = useMiner();

  let timeout: { current: NodeJS.Timeout | null } = useRef(null);

  const mine = async (type: 'foo' | 'bar') => {
    const delay = type === 'foo' ? 1000 : randomMinMax(500, 2000);

    return new Promise<string>((resolve, reject) => {
      timeout.current = setTimeout(() => {
        resolve('success');
      }, delay)
    });
  };


  const start = useCallback(async () => {
    console.log('start')
    switch(task) {
      case MINE_FOO: {
        setStatus(MINING_FOO);
        await mine('foo');
        dispatch({type: 'increment', key: 'foo'});
        setStatus(IDLE);
        break;
      }
      case MINE_BAR: {
        setStatus(MINING_BAR);
        await mine('bar');
        dispatch({type: 'increment', key: 'bar'});
        setStatus(IDLE);
        break;
      }
      case BUILD_FOOBAR: {
        try {
          await buildFoobar();
        }
        catch (error) {
          console.log(error);
        }
        finally {
          setStatus(IDLE);
          setTask('');
        }
        break;
      }
      default:
        // IDLE status
        break;
    }
  }, [buildFoobar, task, dispatch]);


  useEffect(() => {
    if (status === TRANSFERRING) {
      return;
    } else if (status === IDLE) {
      switch(task) {
        case MINE_FOO:
        case MINE_BAR:
        case BUILD_FOOBAR: {
          start();
          break;
        }
        default:
          // IDLE status
          // console.log(IDLE);
          return;
      }
    }
  }, [status, task, start]);

  useEffect(() => {
    if (task) {
      setTimeout(() => {
        setStatus(IDLE);
      }, 1000);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  }, [task]);

  const handleClick = (value: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value === task) {
      return;
    }

    setStatus(TRANSFERRING);
    setTask(value);
  }

  const isMiningFoo = task === MINE_FOO;
  const isMiningBar = task === MINE_BAR;
  const isBuilding = status === BUILDING_FOOBAR;
  const isTransferring = status === TRANSFERRING;
  const classname = classNames(
    'foobar',
    {'is-mining-foo': isMiningFoo},
    {'is-mining-bar': isMiningBar},
    {'is-building': isBuilding}
  );

  return (
    <div className={classname} data-testid="foobar">
      {isTransferring && <div className="transferring">Transferring...</div>}
      <h2>Foobar</h2>
      <small>task: {task}</small>
      <div className="foobar__controls">
        <button
          data-testid="mine-foo"
          type="button"
          onClick={handleClick(MINE_FOO)}
        >
          mine foo
        </button>
        <button
          data-testid="mine-bar"
          type="button"
          onClick={handleClick(MINE_BAR)}
        >
          mine bar
        </button>
        <button
          data-testid="build-foobar"
          type="button"
          onClick={handleClick(BUILD_FOOBAR)}
          disabled={!canBuildOrBuyFoobar()}
        >
          build foobar
        </button>
      </div>
    </div>
  );
}