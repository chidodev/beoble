import React, { useEffect, useState } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { FaWallet, FaRegDotCircle, FaInfoCircle } from "react-icons/fa";

const { hashMessage } = require("@ethersproject/hash");

// buffer config
import * as buffer from "buffer";
(window as any).Buffer = buffer;

// account detail component
import Detail from "./detail";

// import sign message
import { SIGN_MESSAGE } from "../../utils/constants";

import { injected, SUPPORTED_WALLETS } from "../../utils/constants";

import Button from "./Button";
import PendingView from "./Pending";
import { ethers } from "ethers";

type Listener = (...args: Array<any>) => void;

declare global {
    interface Window {
        ethereum?: {
            isMetaMask: boolean;
            request?: any;
            on: (event: string, listener: Listener) => void;
            removeListener: (event: string, listener: Listener) => void;
        };
    }
}

const WALLET_VIEWS = {
    INIT: "init", // initial 
    ACCOUNT: "account", // after login
    PENDING: "pending", // while login
};

export default function UserCard({
    ENSName,
}: {
    ENSName?: string;
}): JSX.Element {
    // important that these are destructed from the account-specific web3-react context
    const { active, account, connector, activate, error } = useWeb3React();

    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

    const [pendingWallet, setPendingWallet] = useState<
        AbstractConnector | undefined
    >();

    const [pendingError, setPendingError] = useState<boolean>();
    const [pendingErrorMsg, setPendingErrorMsg] = useState<string>("");

    const [pubKey, setPubKey] = useState('');
    const [sig, setSig] = useState('');

    const [signErr, setSignErr] = useState<any>(undefined);

    useEffect(() => {
        if (active && !error) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [setWalletView, active, error, connector]);

    const tryActivation = async (connector: AbstractConnector | undefined) => {
        Object.keys(SUPPORTED_WALLETS).map((key) => {
            if (connector === SUPPORTED_WALLETS[key].connector) {
                return SUPPORTED_WALLETS[key].label;
            }
            return true;
        });
        // log selected wallet
        setPendingWallet(connector); // set wallet for pending view
        setWalletView(WALLET_VIEWS.PENDING);

        connector &&
            activate(connector, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(connector); // a little janky...can't use setError because the connector isn't set
                } else {
                    setPendingError(true);
                    setPendingErrorMsg(error.message);
                }
            });
    };

    function getButtons() {
        return Object.keys(SUPPORTED_WALLETS).map((key) => {
            const option = SUPPORTED_WALLETS[key];

            // overwrite injected when needed
            if (option.connector === injected) {
                // don't show injected if there's no injected provider
                if (!window.ethereum) {
                    if (option.label === "Metamask") {
                        return (
                            <Button
                                id={`connect-${key}`}
                                key={key}
                                header={"Install Metamask"}
                                link={option.href}
                                icon={option.iconURL}
                            />
                        );
                    } else {
                        return null; //dont want to return install twice
                    }
                }
            }

            // return rest of options
            return (
                <Button
                    id={`connect-${key}`}
                    onClick={() => {
                        option.connector === connector
                            ? setWalletView(WALLET_VIEWS.ACCOUNT)
                            : tryActivation(option.connector);
                    }}
                    key={key}
                    active={option.connector === connector}
                    header={option.label}
                    icon={option.iconURL}
                />
            );
        });
    }

    function getInfo() {
        if (error) {
            return (
                <>
                    <div>
                        {error instanceof UnsupportedChainIdError
                            ? "Wrong Network"
                            : "Error connecting"}
                    </div>

                    <div>
                        {error instanceof UnsupportedChainIdError ? (
                            <h5>Please connect to the appropriate Ethereum network.</h5>
                        ) : (
                            "Error connecting. Try refreshing the page."
                        )}
                    </div>
                </>
            );
        }

        if (account && walletView === WALLET_VIEWS.ACCOUNT) {
            return (
                <Detail
                    ENSName={ENSName}
                    disconnect={() => setWalletView(WALLET_VIEWS.INIT)}
                />
            );
        }

        return (
            <>
                <p className="wallet-exit">
                    <FaRegDotCircle />
                </p>
                <p className="wallet-address">Wallet Address Will Appear Here.</p>

                {walletView !== WALLET_VIEWS.PENDING ? (
                    <>
                        <p className="wallet-chain">Network ID</p>
                        <p className="wallet-balance">ETH Balance</p>
                    </>

                ) : (
                    <></>
                )}
            </>
        )

    }

    async function signMessage(): Promise<any> {

        setSignErr(undefined);

        try {
            const from = account;
            const msg = `0x${Buffer.from(SIGN_MESSAGE, 'utf8').toString('hex')}`;

            const sign = await window.ethereum!.request({
                method: 'personal_sign',
                params: [msg, from, 'Example password'],
            });

            setSig(sign);

            const pubKey = ethers.utils.recoverPublicKey(hashMessage(SIGN_MESSAGE), sign);

            setPubKey(pubKey);
            const recoveredAddress = ethers.utils.computeAddress(pubKey);

            if (account !== recoveredAddress) setSignErr('something went wrong');

        } catch (err: any) {
            setSignErr(err.message);
        }
    };

    function getAction() {
        if (account && walletView === WALLET_VIEWS.ACCOUNT) {

            // Sign message
            return (
                <>
                    {signErr ? (

                        <div className="wallet-alert">
                            <FaInfoCircle color="red" />
                            <span>{signErr}</span>

                        </div>


                    ) : (
                        <div className="sign-info">
                            <div> Signature: <br />
                                {sig}
                            </div>
                            <div>PubKey: <br />
                                {pubKey}
                            </div>
                        </div>
                    )}
                    <Button
                        id="sign"
                        onClick={signMessage}
                        header="Sign Message"
                        subheader="content='Hello, Beoble!'"
                        icon={'https://cdn.cdnlogo.com/logos/m/79/metamask.svg'}
                    />
                </>
            );
        }

        return (
            <>
                {walletView === WALLET_VIEWS.PENDING ? (
                    <PendingView
                        connector={pendingWallet}
                        error={pendingError}
                        msg={pendingErrorMsg}
                        setPendingError={setPendingError}
                        tryActivation={tryActivation}
                    />
                ) : (
                    <div>{getButtons()}</div>
                )}

            </>
        );
    }

    return (
        <div className="wallet">
            <div className="wallet-info">
                <div className="wallet-icon">
                    <FaWallet />
                </div>

                {getInfo()}
            </div>

            <hr style={{ marginBottom: '10px' }} />

            <div className="wallet-action">

                {getAction()}

            </div>
        </div>
    );
}
