import React, { useState, useEffect } from "react";
import Header from "./Header"; // Adjust path as necessary
import {
  BeansMerchantSdk,
  SvgQrCodeResponse,
  FetchStellarCurrenciesResponse,
  StellarCurrency,
} from "../sdk/sdk";
import { BeansMerchantSdkEnvironment } from "../sdk/environment";
import { IFormState } from "../interfaces/IFormState";
import "./styles.css";

const QrCodeGenerator: React.FC = () => {
  const [formData, setFormData] = useState<IFormState>({
    environment: `${BeansMerchantSdkEnvironment.PRODUCTION}`,
    customEnvironment: "",
    apiKey: `${BeansMerchantSdkEnvironment.API_KEY}`,
    stellarAccountId: `${BeansMerchantSdkEnvironment.ACCOUNT_ID}`,
    selectedCurrency: null,
    amount: "",
    memo: "Vertex",
    maxAllowedPayments: 1,
    webhookUrl: "",
  });
  const [environment, setEnvironment] = useState<string>(
    BeansMerchantSdkEnvironment.PRODUCTION
  );
  const [currencies, setCurrencies] = useState<StellarCurrency[]>([]);
  // const [stellarAccountId, setStellarAccountId] = useState<string>("");
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sdk, setSdk] = useState<BeansMerchantSdk | null>(null);

  useEffect(() => {
    const newSdk = new BeansMerchantSdk(formData.environment, formData.apiKey);
    setSdk(newSdk);
    if (newSdk) {
      newSdk
        .fetchStellarCurrencies(formData.stellarAccountId)
        .then((response: FetchStellarCurrenciesResponse) => {
          setCurrencies(response.stellarCurrencies);
        })
        .catch((err) => console.error("Failed to fetch currencies:", err));
    }
  }, [formData.environment, formData.apiKey, formData.stellarAccountId]);

  const handleGenerateQrCode = async () => {
    setLoading(true);
    try {
      if (!sdk || !formData.selectedCurrency) {
        throw new Error(
          "SDK not initialized or currency not selected. Please check the environment settings and API key, and select a currency."
        );
      }
      const response: SvgQrCodeResponse = await sdk.generateSvgQrCode(
        formData.stellarAccountId,
        formData.selectedCurrency.id,
        parseFloat(formData.amount) || 0,
        formData.memo,
        formData.maxAllowedPayments || undefined,
        formData.webhookUrl || undefined
      );
      setQrCodeSvg(response.svgQrCode);
      setError("");
    } catch (err) {
      setError(err as string);
      console.error("Error when generating QR code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "selectedCurrency") {
      const selected = currencies.find((c) => c.id === value) || null;
      setFormData((prevState) => ({
        ...prevState,
        selectedCurrency: selected,
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleEnvironmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    try {
      const newEnvironment: string =
        value === "production"
          ? BeansMerchantSdkEnvironment.PRODUCTION
          : value === "staging"
          ? BeansMerchantSdkEnvironment.STAGING
          : (value as BeansMerchantSdkEnvironment);
      setEnvironment(newEnvironment);
      setFormData((prevState) => ({
        ...prevState,
        environment: newEnvironment,
      }));
      console.log("Environment changed to:", newEnvironment);
    } catch (err) {
      console.error("Error when changing environment:", err);
    }
  };

  // const handleStellarAccountIdChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   try {
  //     const { value } = event.target;
  //     setStellarAccountId(value);
  //     console.log("Stellar Account ID changed to:", value);
  //   } catch (err) {
  //     console.error("Error when changing Stellar Account ID:", err);
  //   }
  // };

  return (
    <div>
      <Header />
      <form>
        <div className="form-group">
          <label htmlFor="environment">Environment</label>
          <select
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={handleEnvironmentChange}
            className="form-control"
          >
            <option value={BeansMerchantSdkEnvironment.STAGING}>Staging</option>
            <option value={BeansMerchantSdkEnvironment.PRODUCTION}>
              Production
            </option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {formData.environment === "custom" && (
          <div className="form-group">
            <label htmlFor="customEnvironment">Custom Environment URL</label>
            <input
              type="text"
              id="customEnvironment"
              name="customEnvironment"
              value={formData.customEnvironment}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter custom environment URL"
            />
          </div>
        )}
        {/* <div className="form-group">
          <label htmlFor="apiKey">API Key</label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter API Key"
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="stellarAccountId">Stellar Account ID</label>
          <input
            type="text"
            id="stellarAccountId"
            name="stellarAccountId"
            value={formData.stellarAccountId}
            onChange={handleStellarAccountIdChange}
            className="form-control"
            placeholder="Enter Stellar Account ID"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="selectedCurrency">Select Currency</label>
          <select
            id="selectedCurrency"
            name="selectedCurrency"
            value={formData.selectedCurrency?.id || ""}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="memo">Memo</label>
          <input
            type="text"
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter memo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="webhookUrl">Webhook URL (optional)</label>
          <input
            type="text"
            id="webhookUrl"
            name="webhookUrl"
            value={formData.webhookUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter webhook URL"
          />
        </div>
        <button
          type="button"
          onClick={handleGenerateQrCode}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>
      {qrCodeSvg && (
        <div className="qr-code-display">
          <h3 style={{ marginTop: "0", marginBottom: "5px" }}>
            Generated QR Code:
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
            style={{ maxWidth: "200px", maxHeight: "200px", overflow: "auto" }}
          />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
