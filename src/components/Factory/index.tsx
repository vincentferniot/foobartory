import React from 'react';
import './style.css';

type FactoryProps = {
  children: React.ReactNode;
}

export default function Factory({ children }: FactoryProps) {
  return (
    <div className='factory'>
      {children}
    </div>
  );
}