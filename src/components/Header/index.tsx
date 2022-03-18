import { useMiner } from 'contexts/miner';

export default function Header() {
  const { canBuildOrBuyFoobar, buyFoobar, state } = useMiner();

  return (
    <div className="header" data-testid="header">
      <div className="header__total">foo: {state.foo}</div>
      <div className="header__total">bar: {state.bar}</div>
      <div className="header__button">
        <button
          type="button"
          onClick={() => buyFoobar()}
          disabled={!canBuildOrBuyFoobar()}
        >
          buy foobar
        </button>
      </div>
    </div>
  );
}
