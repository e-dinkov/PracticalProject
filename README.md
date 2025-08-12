```markdown
A modern Angular application for managing basketball player profiles and scouting them, built with a clean UI, responsive design, and MongoDB backend.  
Easily **create**, **edit**, **view**, and **like** player profiles.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Prerequisites
Make sure you have the following installed:

- **Node.js** – _Latest LTS version recommended_ ([Download here](https://nodejs.org/))
- **npm** – comes with Node.js
- **Angular CLI** – Install globally:
  ```bash
  npm install -g @angular/cli
  ```
- **MongoDB & MongoDB Tools** – [Download here](https://www.mongodb.com/try/download/community)

---

### 2️⃣ Installation

Clone this repository:
```bash
git clone https://github.com/your-username/scout.git
cd scout
```

Install dependencies:
```bash
npm install
```

---

### 3️⃣ Running the Project

#### ▶️ Start Angular development server
```bash
ng serve
```


#### ⚠️If it tells you that u cant run scripts run this comand in the basketball-forum directory 
```bash
Set-ExecutionPolicy -Scope CurrentUser Unrestricted
```
Open your browser at **http://localhost:4200**

#### ▶️ Start the backend server
```bash
npm start
```
This starts the Node.js/Express backend API.

---

## 🗄 Database Setup

1. Install **MongoDB** and **MongoDB Tools**.
2. Inside the project folder, open the `scout` folder and **copy its path**.
3. Open your **Mongo Tools** directory in the terminal.
4. Run the following command, replacing the path with your copied one:

```bash
mongorestore -d forum C:\Path\To\Your\scout
```

✅ Database should now be ready.

---

## 📚 Features

- 👤 **Player Profiles** – Create, edit, and view detailed player info.
- 👍 **Like System** – Like your favorite players in real-time.
- 🔒 **Auth Guard** – Restrict edit/delete access to profile owners.
- 📱 **Responsive UI** – Optimized for desktop and mobile.
- 🎨 **Animations** – Smooth fade-in transitions for better UX.
- 🌐 **REST API** – Fast and secure backend integration.

---

## 📦 Libraries & Tools

- **Angular** – Frontend framework
- **RxJS** – Reactive programming
- **Signals** – Angular reactivity for likes
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Bootstrap / Tailwind CSS** – Styling & layout
- **Framer Motion / CSS Animations** – Smooth UI transitions

---

## 📷 Screenshots

> _Replace the placeholders below with actual screenshots of your app UI._

### 🏠 Home Page
![Home Page Screenshot](./basketball-forum/public/Screenshot_3.png)

### 📄 Player Details
![Player Details Screenshot](/basketball-forum/public/Screenshot_4.png)

### ✏️ Players Board
![Players Board](/basketball-forum/public/Screenshot_5.png)

---

## 📜 License

This project is licensed under the MIT License – feel free to modify and use.

---
```

