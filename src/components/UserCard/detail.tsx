import React from "react";

import { useWeb3React } from "@web3-react/core";

import { NETWORK_LABELS } from "../../utils/constants";

interface DetailsProps {
  ENSName?: string;
  openOptions: () => void;
}

export default function Detail({
  ENSName,
  openOptions,
}: DetailsProps): JSX.Element {
  const { chainId, account, connector } = useWeb3React();
  const userEthBalance = "100";

  return (
    <div>
      <div>
        <p>
          Connected
        </p>

        <button
          onClick={() => {
            openOptions();
          }}
        >
          disconnect
        </button>
      </div>
      <div>
        <div>

          {account && (
            <span>
              {userEthBalance ?? "0.00"} ETH
            </span>
          )}
          {chainId && NETWORK_LABELS[chainId] && (
            <span>
              {NETWORK_LABELS[chainId]}
            </span>
          )}
        </div>

      </div>

      <div>
        <div>
          {ENSName ? <>{ENSName}</> : <>{account}</>}
        </div>
      </div>
    </div>
  );
}
