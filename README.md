https://github.com/user-attachments/assets/6784a745-09e9-47f7-a65c-9259811184c5

# GA Project – React + Node.js + PostgreSQL

This project consists of two main parts:

- **Frontend** — React
- **Backend** — Node.js + Express + PostgreSQL

The application is containerized using **Docker Compose** for easy setup and deployment

---

## ⚙️ Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (Recommended: LTS version)
- [Docker](https://www.docker.com/)

---

## 📁 Project Structure

```
root/
├── frontend/           # React app
├── backend/            # Node.js API
└── docker-compose.yml  # Docker configuration
```

---

## 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/obfuscade/GA.git
cd GA
```

2. **Copy environment variable files**

```bash
cp frontend/.env.sample frontend/.env
cp backend/.env.sample backend/.env
```

3. **Start the project using Docker Compose**

```bash
docker-compose up --build
```

---

## ✅ Application Access

Once the containers are up and running:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

---

## 🐳 Useful Docker Commands

- **Stop the containers:**

```bash
docker-compose down
```

- **Remove containers, images, volumes (careful: this will delete all data):**

```bash
docker-compose down -v --rmi all --remove-orphans
```

---
