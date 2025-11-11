# AWS Serverless Control Hub

### Overview

AWS Serverless Control Hub is a lightweight full-stack management dashboard that allows users to **view, create, and delete user records** stored in **AWS DynamoDB** through a **serverless Node.js backend** and a **React frontend** hosted on AWS Amplify.

The goal of this project is to demonstrate an **end-to-end, fully managed cloud architecture** using **AWS Lambda**, **API Gateway**, and **Amplify Hosting**, providing a scalable and cost-efficient solution with zero infrastructure management.

---
## 📸 Website screenshot
<img width="796" height="1063" alt="image" src="https://github.com/user-attachments/assets/cea1c69a-08ef-4cb9-996c-aad9d1daf23f" />

---
## 🧠 Technologies Used

| Layer     | Technology                | Description                              |
|-----------|---------------------------|------------------------------------------|
| Frontend  | React + TypeScript        | Interactive and responsive UI            |
| Styling   | Bootstrap                 | Modern and lightweight CSS framework     |
| Backend   | AWS Lambda (Node.js 20.x) | Stateless serverless functions           |
| API       | AWS API Gateway           | RESTful interface with CORS and HTTPS    |
| Database  | AWS DynamoDB              | NoSQL user data storage                  |
| Logging   | AWS CloudWatch Logs       | Real-time Lambda log retrieval           |
| Hosting   | AWS Amplify               | Continuous deployment and hosting        |

---

## 🏗️ Architecture Diagram

```text
                    ┌──────────────────────────┐
                    │     React Frontend       │
                    │ (AWS Amplify Hosting)    │
                    └────────────┬─────────────┘
                                 │ HTTPS (REST)
                                 ▼
                    ┌──────────────────────────┐
                    │     API Gateway          │
                    │ (Public API Endpoints)   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   AWS Lambda (Node.js)   │
                    │   usersBackend Handler   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     AWS DynamoDB         │
                    │      UsersTable          │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   AWS CloudWatch Logs    │
                    │   Real-Time Monitoring   │
                    └──────────────────────────┘
```

---

## 🧩 System Components

### **1. Frontend (React + TypeScript)**

* Built with **React** and **Bootstrap** for a clean, responsive user interface.  
* Hosted via **AWS Amplify** for continuous deployment from GitHub.  
* Displays and manages user records dynamically via REST API calls.  
* Provides input validation, error messages, and visual feedback.  
* Includes integrated social and project links (LinkedIn, GitHub, Project Repo).  

---

### **2. Backend (AWS Lambda + Node.js)**

* Developed in **Node.js 20.x** runtime.  
* Exposes REST endpoints for **GET**, **POST**, and **DELETE** operations.  
* Interacts with **AWS DynamoDB** for persistent user data storage.  
* Managed by **AWS API Gateway**, which handles HTTPS requests and CORS.  
* Returns consistent status-coded responses for all operations.

#### 🧠 Motivation for Using Lambda

The backend relies on **AWS Lambda** as a core component to showcase the power of a **fully serverless design**:
* **Zero server management** - no provisioning or scaling required.  
* **Pay-per-use** pricing model, ideal for low-to-medium workloads.  
* **High availability** with automatic scaling per request.  
* **Native AWS integration** with DynamoDB, CloudWatch, and API Gateway.  
* Each endpoint (GET, POST, DELETE) runs as an independent, stateless function.  

This design ensures the backend is **modular, maintainable, and cost-efficient**, serving as an ideal pattern for lightweight SaaS or monitoring dashboards.

---

### **3. Database (AWS DynamoDB)**

* Table: `UsersTable`  
* Primary Key: `user_id`  
* Stores fields: `user_id`, `name`, `email`  
* Accessed via AWS SDK’s `DocumentClient` for CRUD operations.  
* Scales automatically based on usage, requiring zero maintenance.

---

### **4. Hosting and Deployment**

* **AWS Amplify** hosts the React app and builds automatically on every GitHub commit.  
* **API Gateway** exposes secure, CORS-enabled HTTPS endpoints.  
* The architecture allows complete separation between frontend and backend.  
* Deployment is entirely managed and version-controlled through Amplify CI/CD.

---

## ☁️ CloudWatch Logs Integration

A dedicated **CloudWatch Logs integration** was added to the project, enabling real-time visibility of backend activity directly from the frontend dashboard.

### How It Works
* A separate Lambda function (`getLogsHandler`) retrieves logs from **AWS CloudWatch** using the `logs:GetLogEvents` and `logs:DescribeLogStreams` permissions.  
* The React dashboard calls a `/logs` endpoint via API Gateway to fetch the most recent logs.  
* Only the **5 latest log entries** are displayed in the interface for readability.  
* The UI includes a “Refresh Logs” button to fetch new entries dynamically.  

### Benefits
* Provides **real-time debugging and observability** without entering the AWS Console.  
* Allows developers to validate Lambda execution, request metadata, and response time.  
* Demonstrates **cross-service communication** between Lambda and CloudWatch.  
* Perfect for educational and monitoring use cases.

---

## ⚙️ Key Features

* Fully serverless, event-driven architecture.  
* Real-time CRUD management of users in DynamoDB.  
* Built-in **CloudWatch monitoring** via the React dashboard.  
* Secure and scalable through API Gateway and IAM permissions.  
* Clean Bootstrap-based UI with status and validation feedback.  
* Automatically deployed through AWS Amplify CI/CD pipeline.  

---

## 📂 Project Structure

Aws-Serverless-Control-Hub/
├── amplify/ # Amplify configuration
├── src/
│ ├── api/usersApi.ts # Axios requests to API Gateway
│ ├── App.tsx # React app (UI + API integration)
│ ├── App.css # Styling and layout
│ └── ... # Additional components
├── package.json # Dependencies
├── vite.config.ts # Vite configuration
└── README.md # Project documentation

---

## 🚀 Deployment Steps

1. **Create DynamoDB Table** `UsersTable` with primary key `user_id`.  
2. **Deploy Lambda Function** `usersBackend` for user CRUD operations.  
3. **Deploy Lambda Function** `getLogsHandler` for CloudWatch integration.  
4. Attach IAM permissions to `getLogsHandler`:
   - `logs:GetLogEvents`
   - `logs:DescribeLogStreams`
5. **Create API Gateway** REST API with the following routes:
   - `GET /users`
   - `POST /users`
   - `DELETE /users/{id}`
   - `GET /logs`
6. Enable **CORS** on all endpoints.  
7. Connect your React project to **AWS Amplify** for hosting.  
8. Update API URLs in `src/api/usersApi.ts`.

---

## 🧭 Author

**Matan Shemesh**  
Software Engineer | Cloud & Simulation Systems  

- [LinkedIn](https://www.linkedin.com/in/matanshemesh/)  
- [GitHub](https://github.com/MatanShemesh10)  
- [Project Repository](https://github.com/MatanShemesh10/Aws-Serverless-Control-Hub)

---

© 2025 AWS Serverless Control Hub · Built by Matan Shemesh
