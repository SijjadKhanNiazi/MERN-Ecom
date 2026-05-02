# MERN Stack E-Commerce Platform 🛒

Yeh ek full-stack e-commerce application hai jo **MERN Stack** (MongoDB, Express, React, Node.js) par banayi gayi hai. Is mein users products browse kar sakte hain, register ho sakte hain, aur secure authentication ke sath orders place kar sakte hain.

## 🚀 Features

- **User Authentication:** JWT (JSON Web Tokens) ke sath secure Login aur Signup.
- **Product Management:** Backend se products fetch karna aur display karna.
- **Shopping Cart:** Items add karne aur orders manage karne ki salahiyat.
- **Secure Backend:** Password hashing (Bcryptjs) aur protected routes.
- **Database:** MongoDB Atlas/Compass ka istemal data persistence ke liye.
- **Error Handling:** Custom middleware ke sath professional error management.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React-Bootstrap, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Bcryptjs
- **State Management:** (Coming Soon: Redux Toolkit)

## 📁 Project Structure

```text
my-ecom-store/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & Error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
├── frontend/            # React application (Vite)
└── .env                 # Environment variables (Hidden)```


