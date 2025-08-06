# 📘 Node.js Service

## 📌 Overview

This is a **Node.js + Express.js** based microservice designed to perform CRUD operations on user data stored in a **MySQL** database. It is part of a **multi-tier Kubernetes architecture** and connects to the backend tier (MySQL) using environment configurations via Kubernetes `ConfigMap` and `Secrets`.

## 🛠️ Tech Stack

- **Backend Service**: Node.js, Express.js  
- **Database**: MySQL (StatefulSet)  
- **Containerization**: Docker  
- **External Configuration**: Kubernetes ConfigMap & Secret  
- **Scaling & Resilience**: Kubernetes Deployment (4 replicas)  
- **Service Exposure**: Ingress  

## 📂 Project Structure

```bash

app/
├── index.js
├── db.js
├── configLoader.js
├── package.json
├── config/
│ └── .env.dev 
| └── .env.prod
docker/
├── Dockerfile
├── .dockerignore

```

## 📦 Installation (Locally for Dev)

```bash

npm install
npm start

```


## 🐳 Docker Commands

Build and push the service API image:

```bash
# Build image
docker build -t <your-dockerhub-username>/node-app .

# Push to Docker Hub
docker push <your-dockerhub-username>/node-app

```

## 🔐 External Configuration

The Node.js service uses Kubernetes to manage configurations:

| Name          | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| `DB_HOST`     | ConfigMap | Hostname of the MySQL service |
| `DB_PORT`     | ConfigMap | Port for MySQL                |
| `DB_NAME`     | ConfigMap | Name of the database          |
| `DB_USER`     | Secret    | MySQL username                |
| `DB_PASSWORD` | Secret    | MySQL password                |


## 🔄 CRUD API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Fetch all users   |
| POST   | `/users`     | Create new user   |
| PUT    | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

All endpoints connect to the backend MySQL database tier for operations.

## 🧪 Sample Request (Postman/cURL)

```bash

curl http://<INGRESS_URL>/users

```