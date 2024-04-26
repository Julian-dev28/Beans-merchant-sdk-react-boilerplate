import React from "react";
import vertexLogo from "./vertex.png";

const Header: React.FC = () => {
  return (
    <div className="header-section">
      <div className="header-container">
        <img src={vertexLogo} alt="Vertex Logo" className="header-logo" />
        <h1 className="header-title mb-4">Vertex Community Pay</h1>
        <h2 className="header-subtitle mb-4">Stellar QR Code Generator</h2>
        <h3 className="header-powered-by mb-4">
          <a
            className="header-link"
            href="https://github.com/Beans-BV/merchant_sdk_javascript"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Beans Merchant SDK
          </a>
        </h3>
        <p className="header-description mb-4">
          This tool allows you to pay the Vertex Community fund using Stellar
        </p>
      </div>
    </div>
  );
};

export default Header;
