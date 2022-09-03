import React, { useEffect, useState } from "react";

import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";

import { NETWORK_LABELS } from "../../utils/constants";

// import disconnect icon
import { FaSignOutAlt } from "react-icons/fa";

// import utils
import shortenAddress from "../../utils/shortenAddress";

interface DetailsProps {
    ENSName?: string;
    disconnect: () => void;
}

export default function Detail({
    ENSName,
    disconnect,
}: DetailsProps): JSX.Element {
    const { chainId, account, connector } = useWeb3React();

    const [balance, setBalance] = useState('');
    const [ensName, setEnsName] = useState<string|null>(null);

    useEffect(() => {
        async function getBalance() {

            const network = NETWORK_LABELS[chainId!].toLocaleLowerCase();

            const provider = ethers.getDefaultProvider(network);
        
            if(account) {
                const balance = await provider.getBalance(account);
                const ensName = await provider.lookupAddress(account);
            
                setBalance(ethers.utils.formatEther(balance));
                setEnsName(ensName);
            }
        
        }

        getBalance();
    }, [chainId])
    
    return (
        <>
            <p className="wallet-exit">
                <a className="wallet-link" href="#" onClick={disconnect}>
                    <FaSignOutAlt />
                </a>
            </p>
            <p className="wallet-address">
                {ensName ? <>{ensName}</> : <>{shortenAddress(account!)}</>}
            </p>

            <p className="wallet-chain">
                <span>
                    {NETWORK_LABELS[chainId!]}
                </span>
            </p>
            <p className="wallet-balance">{balance.substring(0, 5)} ETH</p>
        </>

    );
}
