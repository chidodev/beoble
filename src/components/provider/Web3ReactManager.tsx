import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';

export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { active, connector } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activate,
  } = useWeb3React();


  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!connector && !active && networkError) {
    return (
      <>
        Oops! An unknown error occurred. Please refresh the page, or visit from
        another browser or device.
      </>
    );
  }

  // trying injected, if the network connect ever isn't active or in an error state, activate it
  useEffect(() => {
    if ( connector !== undefined && !networkActive && !networkError && !active) {
      activate(connector);
    }
  }, [ networkActive, networkError, connector, activate, active]);

  return children;
}
