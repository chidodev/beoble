import React, { useEffect, useState } from "react";

import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";

import { NETWORK_LABELS } from "../../utils/constants";

// import disconnect icon
import { FaSignOutAlt } from "react-icons/fa";

// import utils
import shortenAddress from "../../utils/shortenAddress";

interface DetailsProps {
    disconnect: () => void;
}

export default function Detail({
    disconnect,
}: DetailsProps): JSX.Element {
    const { chainId, account, connector } = useWeb3React();

    const [balance, setBalance] = useState('');
    const [ensName, setEnsName] = useState<string|null>(null);
    const [avatar, setAvatar] = useState<string|undefined>(undefined);

    useEffect(() => {
        async function getBalance() {

            const network = NETWORK_LABELS[chainId!].toLocaleLowerCase();

            const provider = ethers.getDefaultProvider(network);
        
            if(account) {
                const balance = await provider.getBalance(account);
                const ensName = await provider.lookupAddress(account);
                const resolver = ensName ? await provider.getResolver(ensName) : null;
                let avatar = resolver ? await resolver.getAvatar() : null;
            
                setBalance(ethers.utils.formatEther(balance));
                setEnsName(ensName);
                setAvatar(avatar?.url);
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
                {ensName ? <>
                {avatar && (<img src={avatar} />)}
                {ensName}
                </> : <>{shortenAddress(account!)}</>}
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
