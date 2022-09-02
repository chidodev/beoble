// import react
import React from "react";
import { createRoot } from "react-dom/client";

import { FaWallet, FaArrowRight } from "react-icons/fa";

// import styles
import "./index.css";

function MyApp(): JSX.Element {
  return (
    <>
      <div className="main-container">
        <div className="heading">
          <h1 className="heading-title">User Wallet Card</h1>
        </div>
        <div className="wallet">
          <div className="wallet-info">
            <div className="wallet-icon">
              <FaWallet />
            </div>
            <p className="wallet-exit">
              <i className="fas fa-times"></i>
            </p>
            <p className="wallet-address">Wallet Address Will Appear Here.</p>
          </div>
          <div className="wallet-action">
            <div className="wallet-connect">
              <button className="wallet-button">
                <div className="wallet-label">MetaMask</div>
                <div className="wallet-avatar">
                  <img
                    alt=""
                    src="https://cdn.cdnlogo.com/logos/m/79/metamask.svg"
                    className="wallet-image"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

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
    </>
  );
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);

root.render(<MyApp />);
