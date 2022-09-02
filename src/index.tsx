// import react
import React from "react";
import { createRoot } from "react-dom/client";

// import web3 provider
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";

// import styles
import "./index.css";

// import utils
import getLibrary from "./utils/getLibrary";

// import component
import UserCard from "./components/UserCard";
import Web3ReactManager from "./components/provider/Web3ReactManager";

const Web3ProviderNetwork = createWeb3ReactRoot('BEOBLE');

function MyApp(): JSX.Element {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Web3ReactManager>
                    <div className="main-container">
                        <div className="heading">
                            <h1 className="heading-title">User Wallet Card</h1>
                        </div>

                        <UserCard />

                        <div className="footer">
                            <p className="footer-credits">
                                <a
                                    className="footer-link"
                                    target="_blank"
                                    href="https://github.com/chidodev"
                                >
                                    Developed by Donald Chi
                                </a>
                            </p>
                        </div>
                    </div>
                </Web3ReactManager>
            </Web3ProviderNetwork>

        </Web3ReactProvider>
    );
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);

root.render(<MyApp />);
