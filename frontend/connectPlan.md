# Frontend to Backend Connection Plan

This document outlines the steps to connect the React frontend to the Node.js backend.

## 1. Configure Development Server Proxy

- **Task:** Modify `frontend/vite.config.ts` to proxy API requests.
- **Details:** To avoid CORS errors during development, we'll configure Vite to proxy requests from `/api` to the backend server at `http://localhost:3000`.

## 2. Create a Centralized API Service

- **Task:** Create a new file `frontend/src/services/api.ts`.
- **Details:** This file will contain all the functions for making API calls to the backend (e.g., using `fetch` or `axios`). This will keep our API logic organized and easy to maintain.

## 3. Fetch and Display Products & Categories

- **Task:** Update `ProductGrid.tsx` and `CategoryGrid.tsx`.
- **Details:**
  - In `ProductGrid.tsx`, replace the current mock data with a call to our new API service to fetch products from the `GET /api/products` endpoint.
  - In `CategoryGrid.tsx`, do the same to fetch data from `GET /api/categories`.
  - Implement loading and error states for a better user experience.

## 4. Implement User Authentication

- **Task:** Create user authentication flows.
- **Details:**
  - Create a `UserContext` to manage the user's authentication state globally.
  - Implement `login` and `register` functions in `api.ts` that call the `POST /api/users/login` and `POST /api/users/register` endpoints.
  - Create components for login and registration forms.
  - Upon successful login, store the received JWT in local storage and update the `UserContext`.
  - For all authenticated requests, include the JWT in the `Authorization` header.

## 5. Build Checkout and Order History

- **Task:** Implement the checkout process and order history page.
- **Details:**
  - In `CheckoutModal.tsx`, call the `POST /api/orders/checkout` endpoint, sending the cart data and the user's JWT for authentication.
  - Create a new page/component where users can view their past orders by fetching data from the protected `GET /api/orders` endpoint.

## 6. Implement Delivery Tracking

- **Task:** Update `DeliveryTracker.tsx`.
- **Details:** Use the public `GET /api/orders/track/:trackingNumber` endpoint to allow users to check their order status without being logged in.

## 7. Connect the Gift Quiz

- **Task:** Implement the logic for `GiftQuiz.tsx`.
- **Details:** When a user completes the quiz, send their answers to the `POST /api/quiz/recommendations` endpoint and display the returned product suggestions.
