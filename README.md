# Beans Merchant SDK React App

This repository contains a React app boilerplate designed for the Beans Merchant SDK. It allows users to generate QR codes for payments in USDC or XLM on the Stellar network. The app leverages the Stellar SDK to provide functionalities such as balance checking and payment streams.

![App Screenshot](./shot.png)

## Features

- **QR Code Generation**: Easily create QR codes for payment requests.
- **Currency Selection**: Choose between USDC and XLM for payments.
- **Payment Customization**: Specify the amount and memo for each payment request.
- **Real-Time Updates**: Utilize the Stellar SDK to monitor account balances and payment streams.

## Prerequisites

- Node.js (v18 or higher)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

Clone the repo and install the dependencies:

```bash
git clone https://github.com/Julian-dev28/Beans-merchant-typescript-sdk
cd Beans-merchant-typescript-sdk
yarn install
```

# Usage

Start the application:

```bash
yarn start
```

To make a payment:

1.Choose the currency and specify the amount and memo for the QR code.
1.Scan the QR code using the Beans app.
1.Open the Beans app and accept the transaction to complete the payment.

<img src="./bean.png" alt="image" width="30%" height="30%">

# Contributing

Please feel free to contribute to this project. The SDF welcomes contributors to assist in enhancing the interoperability of ecosystem tools with their respective parts in the Stellar stack.

# Additional Resources

- [Beans Merchant SDK Documentation](https://github.com/Beans-BV/merchant_sdk_javascript)

# Support

For support, please open an issue through the repository.
