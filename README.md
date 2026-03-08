# Inventory & Billing Dashboard (MERN Stack)

## 📌 Overview
A full‑stack inventory and billing system built with the MERN stack.  
It includes customer management, product stock tracking, invoice generation, and a recruiter‑ready dashboard with charts, alerts, and insights.

> **Note:** The backend includes a comprehensive test suite using Jest and Supertest. Instructions for running the tests are provided below.
- **Daily sales trend line chart** (Chart.js + React).
- **Stock per item bar chart** with reorder alerts.
- **Low stock blinking alerts** for critical items.
- **Invoice CRUD** with PDF generation and payment tracking.
- **Secure authentication** with JWT.
- **Redux Toolkit** for state management.
- **Responsive UI** styled with Tailwind CSS.

---

## 🛠 Tech Stack
- **Frontend**: React, Redux Toolkit, Chart.js  
- **Backend**: Node.js, Express.js, MongoDB  
- **Other**: JWT Auth, Axios

## 🎨 UI & Styling
- Tailwind CSS for responsive design
- Lucide React Icons for modern, lightweight iconography
- Sonner Toasts for notifications

---

<!-- ## 📸 Screenshots
- Dashboard with charts and alerts  
- Invoice management  
- Customer and product management  

*(Add screenshots here to visually showcase your project.)* -->

---

## ⚙️ Installation
```bash
# Clone repo
git clone https://github.com/yourusername/inventory-dashboard.git

# Install dependencies
```bash


cd inventory-dashboard


cd client
npm install
npm run dev

cd server
npm install
npm run dev

---

## 🧪 Testing
The server includes a Jest-powered test suite covering authentication, customers, products, invoices, and dashboard routes. A `setupTest.js` file mocks authentication middleware and connects to the test database.

1. **Configure environment:**
   - Ensure a MongoDB URI is available in `.env` (used by `setupTest.js`).

2. **Run tests**
   ```bash
   cd server
   npm test          # runs jest and executes all files under `tests/`
   ```

3. **Individual tests**
   - Files are located in `server/tests`:
     - `app.test.js`
     - `auth.test.js`
     - `customer.test.js`
     - `dashboard.test.js`
     - `product.test.js`
     - `invoice.test.js`
     - `validateMiddleware.test.js`

4. **Mocking**
   - Authentication/role middleware is mocked in both `setupTest.js` and within individual test files to bypass real JWT logic.

> ⚠️ Tests assume a running MongoDB instance and will create/delete records. Use a separate test database to avoid corrupting production data.

---
