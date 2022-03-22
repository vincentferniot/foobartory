import React from 'react';
import { useMiner } from 'contexts/miner';
import './style.css';

type FactoryProps = {
  children: React.ReactNode;
}

export default function Factory({ children }: FactoryProps) {
  const { hasReachedMaxFoobars, dispatch } = useMiner();
  const handleClick = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='factory'>
      {hasReachedMaxFoobars() && (
        <div className='factory__message'>
          <p>You have reached the max foobars!</p>
          <button type="button" onClick={handleClick}>Play again</button>
        </div>
      )}
      {children}
    </div>
  );
}