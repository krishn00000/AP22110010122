# 🔢 Number Average API

> A small **Node.js + Express** REST API that maintains a sliding window of generated numbers and calculates the average of the values currently stored in that window.

## 📌 Overview

This project implements a number-processing API around a **fixed-size sliding window**. A request to the number endpoint generates a value, compares it with the values already stored, updates the window, and returns both the previous and current state together with the calculated average.

It is a compact project for understanding **Express routing, in-memory state, array processing, REST responses, and rolling calculations**.

## ✨ Features

### 1. Health / Root Endpoint

The `/` route provides a simple server status response.

```text
GET /
```

When the server is running, it responds with `Server is running!`. This makes it easy to confirm that the Express application has started successfully.

### 2. Number Generation Endpoint

The main API is exposed through:

```text
GET /numbers/:numberId
```

The accepted identifiers are `primes`, `fibo`, `e`, and `rand`.

For a valid request, the current implementation generates a random integer from **0 to 99**. The generated value is then processed by the sliding-window logic.

> Note: despite the route names, the current implementation generates a random value for all accepted identifiers rather than generating a prime, Fibonacci, e, or random-specific sequence.

### 3. Sliding Window Storage

The application keeps an in-memory list of recently accepted numbers with a maximum size of **10 values**.

The update process works as follows:

1. Check whether the newly generated number is already present.
2. Add it only when it is not already stored.
3. If the list becomes larger than 10 values, remove the oldest value.
4. Keep the resulting list as the current window.

This gives the application a rolling collection of recent unique values without using a database.

### 4. Previous vs Current State

Before modifying the window, the application creates a copy of the existing values. The API response therefore exposes both states:

- `windowPrevState` — values stored before the request.
- `windowCurrState` — values after processing the new number.

This makes the effect of each API request visible and is useful for understanding state transitions.

### 5. Average Calculation

The API calculates the arithmetic mean of the values currently stored in the window.

The implementation:

- adds all stored values,
- divides the sum by the number of stored values,
- rounds the result to two decimal places,
- returns `0` when the window is empty.

The result is returned through the `avg` field.

### 6. JSON API Response

A successful request returns a structured JSON object containing the previous state, current state, stored numbers, and average.

Example structure:

```json
{
  "windowPrevState": [],
  "windowCurrState": [42],
  "numbers": [42],
  "avg": 42
}
```

### 7. Invalid Route Handling

If an unsupported `numberId` is supplied, the API returns an HTTP `400` response with an error message instead of processing the request.

### 8. Lightweight Error Handling

The number-processing route is wrapped in a `try/catch` block. Unexpected server-side errors are logged and returned as an HTTP `500` response.

## 🧠 How the Application Works

```text
Client Request
     ↓
GET /numbers/:numberId
     ↓
Validate numberId
     ↓
Generate number
     ↓
Save previous window
     ↓
Update sliding window
     ↓
Calculate average
     ↓
Return JSON response
```

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — HTTP server and routing
- **Axios** — HTTP client dependency included in the project
- **axios-retry** — retry support dependency included in the project
- **Nodemon** — development-time automatic server restart

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- npm installed

### Installation

```bash
git clone https://github.com/krishn00000/AP22110010122.git
cd AP22110010122
npm install
```

### Run the Server

```bash
npm start
```

The API listens on:

```text
http://localhost:3000
```

### Test the API

Open the following in a browser or API client:

```text
http://localhost:3000/
http://localhost:3000/numbers/rand
```

You can also replace `rand` with another accepted identifier such as `primes` or `fibo`.

## 📁 Project Structure

```text
AP22110010122/
├── app.js            # Express server and API logic
├── package.json      # Project metadata and dependencies
├── package-lock.json # Locked dependency versions
├── image.png         # Project asset
└── README.md         # Documentation
```

## 👤 Author

**Chinni Krishna Popuri**  
GitHub: [@krishn00000](https://github.com/krishn00000)

---

⭐ If this project helped you understand Express APIs or sliding-window calculations, consider giving it a star.