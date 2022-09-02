// import web3 
import { InjectedConnector } from '@web3-react/injected-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

// EVM compatible chain IDs
const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42];

// Supported Chain Labels
export const NETWORK_LABELS: { [chainId: number]: string } = {
    [1]: 'Mainnet',
    [3]: 'Ropsten',
    [4]: 'Rinkeby',
    [5]: 'Goerli',
    [42]: 'Kovan',
};

// Injected connector 
export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS,
})

interface WalletInfo {
    connector?: AbstractConnector; // can be optional but not for  metamask and coinbase wallet
    label: string; // wallet name
    iconURL: string; // wallet avatar
    description?: string; // short description for wallet
    href?: string; // wallet support link
}

// list only metamask 
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    METAMASK: {
        connector: injected,
        label: 'Metamask',
        iconURL: 'https://cdn.cdnlogo.com/logos/m/79/metamask.svg',
        description: 'Popular EVM compatible Wallet',
        href: 'https://metamask.io/'
    }
}

// sign message
export const SIGN_MESSAGE = 'Hello, Beoble!';