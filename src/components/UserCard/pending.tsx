import React from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";

// import constant
import { SUPPORTED_WALLETS } from "../../utils/constants";

// import react icons
import { FaInfoCircle } from "react-icons/fa";

// import component
import Button from "./Button";

export default function PendingView({
    connector,
    error = false,
    msg = "",
    setPendingError,
    tryActivation,
}: {
    connector?: AbstractConnector;
    error?: boolean;
    msg?: string;
    setPendingError: (error: boolean) => void;
    tryActivation: (connector: AbstractConnector) => void;
}): JSX.Element {
    const isMetamask = window?.ethereum?.isMetaMask;

    return (
        <>
            {error ? (

                <div className="wallet-alert">
                    <FaInfoCircle color="red" />
                    <span>{msg}</span>
                    <div className="space">
                    </div>
                    <button type="button" className="wallet-retry"
                        onClick={() => {
                            setPendingError(false);
                            connector && tryActivation(connector);
                        }}
                    >Try Again</button></div>


            ) : (
                <div className="wallet-loading">
                    <img src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg" />
                    <p>Connecting...</p>
                </div>
            )}


            {Object.keys(SUPPORTED_WALLETS).map((key) => {
                const option = SUPPORTED_WALLETS[key];
                if (option.connector === connector) {
                    return (
                        <Button
                            id={`connect-${key}`}
                            key={key}
                            header={option.label}
                            subheader={option.description}
                            icon={option.iconURL}
                        />
                    );
                }
                return null;
            })}
        </>
    );
}
