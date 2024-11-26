
# WoWoWallet SDK Documentation

This documentation describes how to use the **WoWoWallet SDK** to manage wallets and handle orders.

---

## **1. Initialization**

To use the SDK, initialize the `WoWoWallet` class:

```typescript
import { WoWoWallet } from './WoWoWallet';

const wallet = new WoWoWallet('<API_KEY>', '<BASE_URL>');
```

| Parameter | Type   | Description                                                             |
|-----------|--------|-------------------------------------------------------------------------|
| `apiKey`  | string | API key provided by WoWoWallet. **(Required)**                         |
| `baseUrl` | string | Base URL of WoWoWallet API. Defaults to `https://api.wowo.htilssu.id.vn`|

---

## **2. Wallet Management**

### **2.1 Create Wallet**

Creates a new wallet for the authenticated application.

**Method:** `createWallet()`

```typescript
const wallet = await wallet.createWallet();
```

**Response:**
```json
{
  "id": "walletId",
  "balance": 0,
  "currency": "USD"
}
```

---

### **2.2 Delete Wallet**

Deletes a wallet by its ID.

**Method:** `deleteWallet(walletId: string)`

```typescript
const result = await wallet.deleteWallet('walletId');
```

**Response:**  
Returns `true` if the wallet was successfully deleted.

---

### **2.3 Get Wallet Details**

Retrieves details of a specific wallet.

**Method:** `getWallet(walletId: string)`

```typescript
const walletDetails = await wallet.getWallet('walletId');
```

**Response:**
```json
{
  "id": "walletId",
  "balance": 1000,
  "currency": "USD"
}
```

---

### **2.4 Transfer Money**

Transfers money between wallets.

**Method:** `transferMoney(walletId: string, amount: number)`

```typescript
const updatedWallet = await wallet.transferMoney('walletId', 500);
```

**Response:**
```json
{
  "id": "walletId",
  "balance": 500,
  "currency": "USD"
}
```

---

### **2.5 Withdraw Money**

Withdraws a specific amount from a wallet.

**Method:** `getMoneyFromWallet(walletId: string, amount: number)`

```typescript
const updatedWallet = await wallet.getMoneyFromWallet('walletId', 200);
```

**Response:**
```json
{
  "id": "walletId",
  "balance": 300,
  "currency": "USD"
}
```