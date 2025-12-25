# 😼 The Overlord's Pantry

> "Stop sacrificing your vintage sofa. Buy them a throne."

**The Overlord's Pantry** is a full-stack e-commerce platform built for the discerning feline ruler and their obedient human servants. It combines a robust MERN architecture with a high-end, humorous brand identity.

![Project Banner](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200)

## 🚀 Features

### 🛒 The Shopping Experience
* **Royal Product Display:** High-performance product carousel and grid layouts.
* **The Tribute Pile (Cart):** Full Redux-managed cart system with persistent storage.
* **Smooth Checkout:** 4-step checkout process (Login -> Shipping -> Payment -> Order).
* **PayPal Integration:** Fully functioning Sandbox payment gateway.

### 🔐 Security & Auth
* **JWT Authentication:** Secure, HTTP-Only cookies (no local storage token vulnerabilities).
* **Protected Routes:** Middleware to guard order history and checkout processes.
* **User Profiles:** Order history tracking and status updates.

### 🎨 UI/UX Design
* **Responsive Design:** Mobile-first approach using Tailwind CSS.
* **Brand Voice:** Consistent "Overlord vs. Servant" copy throughout the app.
* **Modern Feedback:** Replaced browser alerts with professional Toast notifications (`react-toastify`).
* **Custom 404:** A humorous "Cat knocked it off the table" error page.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Redux Toolkit (State Management)
* Tailwind CSS (Styling)
* React Router DOM v6
* React Toastify

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* Bcryptjs (Password Hashing)
* Multer (Image Uploads - *Coming Soon*)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

git clone [https://github.com/linarifux/overlords-pantry.git](https://github.com/linarifux/overlords-pantry.git)
cd overlords-pantry

### 2. Install Dependencies
* Install packages for both the backend (root) and frontend.

# Root (Backend)
npm install

# Frontend
cd frontend
npm install
cd ..

### 3. Environment Variables
* Create a .env file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PAYPAL_CLIENT_ID=your_paypal_sandbox_id
```
### 4. Seed the Database
* Populate the store with initial data (Products & Users).
```
npm run data:import

```
### 5. Run the App
* Run both frontend and backend concurrently.
```
npm run dev
```
* Visit ```http://localhost:5173``` (or ```3000``` depending on your proxy setup) to view the app.

* 🤝 ContributingServants wishing to contribute to the codebase may open a Pull Request.

* Note: All code changes must be approved by the Overlord (Code Reviews are strict; do not leave console logs).
* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
* Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request📄 License
* Distributed under the MIT License. See LICENSE for more information.
* Built with ❤️ (and fear) by Naimul Islam