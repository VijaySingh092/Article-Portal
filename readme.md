# 📰 Article Portal – Full-Stack Article Management Platform

A modern, full-stack article publishing platform where users can create, read, update, and manage articles. Built with the MERN stack, it provides secure authentication, rich-text editing, image uploads, and an interactive dashboard for managing published content.

## ✨ Features

- 🔐 **User Authentication** – Secure sign-up, sign-in, and Google authentication.
- 👤 **User Profiles** – Manage account details and profile information.
- 📝 **Create Articles** – Write and publish articles using a rich-text editor.
- ✏️ **Edit & Delete Articles** – Update or remove previously published articles.
- 🖼️ **Image Uploads** – Upload and manage article images using Appwrite Storage.
- 📚 **Explore Articles** – Browse and read published articles.
- 🔍 **Search & Filter** – Find articles based on keywords and categories.
- 📊 **Admin Dashboard** – Manage users, articles, and platform content.
- 📱 **Responsive Design** – Optimized interface for desktop, tablet, and mobile devices.
- 🔔 **Toast Notifications** – Interactive feedback for user actions.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- shadcn/ui
- React Quill
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Services & Tools
- Appwrite Storage
- Firebase Authentication
- Git & GitHub
- Postman
- VS Code

## 📂 Project Structure

```text
Article-Portal/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── hooks/
│       ├── lib/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── index.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd Article-Portal
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

### 4. Configure Appwrite & Firebase

- Configure your Appwrite project and Storage bucket.
- Add your Firebase project credentials for Google authentication.
- Update the frontend configuration with the required project IDs and API keys.

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT authentication |

Add the required Appwrite and Firebase configuration separately in the frontend.

## 🚀 Application Workflow

1. Users register or sign in to their accounts.
2. Authenticated users access the dashboard.
3. Users create articles using the rich-text editor.
4. Article images are uploaded through Appwrite Storage.
5. Article information is stored in MongoDB.
6. Published articles can be explored and managed.
7. Users can update their profiles and manage their content.

## 🔮 Future Improvements

- 💬 Comments and discussion system.
- ❤️ Like and bookmark functionality.
- 🔔 Real-time notifications.
- 📈 Article analytics and readership statistics.
- 🤖 AI-powered article recommendations.
- 🌐 Social sharing integration.

## 👨‍💻 Author

**Vijay Singh Khetwal**

- GitHub: [VijaySingh092](https://github.com/VijaySingh092)

---

⭐ If you find this project useful, consider giving it a star!