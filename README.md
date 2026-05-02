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
└── .env                 # Environment variables (Hidden)
```
⚙️ Installation & SetupRepository
Clone Karein
:Bashgit clone [https://github.com/your-username/mern-ecom.git](https://github.com/your-username/mern-ecom.git)
cd mern-ecom
Backend Setup:Bashcd backend
npm install
.env file banayein aur ye variables add karein:Code snippetPORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
Frontend Setup:Bashcd ../frontend
npm install
Project Run Karein:
Backend ke liye: npm run dev (root ya backend folder mein)
Frontend ke liye: npm run dev (frontend folder mein)📌
API EndpointsMethodEndpointDescriptionAccessGET/api/products
All products fetch kareinPublicPOST/api/users
Naya user register kareinPublicPOST/api/users/loginUser 
login & token hasil kareinPublicGET/api/users/profile
User profile dataPrivatePOST/api/orders
Naya order place kareinPrivate
