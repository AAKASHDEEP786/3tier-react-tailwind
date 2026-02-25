# Deploy a 3 Tier container application with Docker Compose
 
In this project, I am deploying a 3 Tier container application with Docker Compose. The application will have the following:

**Tier 1: Frontend:** What users see in the browser (like a website).

**Tier 2: Backend:** The brain of the app — handles requests and talks to the database.

**Tier 3: Database** Stores actual data like user info, products, etc.

**The Application Architecture Diagram**

![App Arch Diagram](https://github.com/user-attachments/assets/42744ad9-8a91-418f-bc1d-c7ac665ecaf1)

**Components in Our Stack:**

![image](https://github.com/user-attachments/assets/ee808b97-a2c1-4f1c-a40d-9f6b3ad478cf)

**How Do The Different Containers Talk to Each Other?**

All components are in Docker containers and connected via Docker Compose.

**Here's what happens behind the scenes:**

A. User opens the app in a browser (http://ip-of-the-server:80)

B. Frontend (React) is served by Nginx (a lightweight web server)

C. When the user does something (like clicking a button), the frontend makes an HTTP request to the backend (e.g., GET /api/users)

D. Backend (Node.js) receives the request, processes it, and talks to the PostgreSQL database

E. The database sends back the requested data

F. Backend sends that data to the Frontend, which displays it to the user

They all run in separate containers but are connected via a shared Docker network, so they can "talk" to each other using service names (e.g., backend, db).

Browser
   |
   v
[Nginx + React (Frontend)]
   |
   v
[Node.js API (Backend)]
   |
   v
[PostgreSQL Database]

**Why are we using Docker Compose?**

1. One command to spin everything up: docker-compose up -d

2. No dependency conflicts — everything runs in containers

3. Easy to replicate across teams or environments

4. It looks like a mini version of how real production apps run in the cloud

**Summary of Each Service**

**1. Frontend:** Built using React + Tailwind CSS. Served with Nginx for speed and production readiness. React app talks to backend using fetch/AJAX requests

**2. Backend:** Built using Node.js + Express. Exposes REST API endpoints. Connects to Postgres. Contains business logic (like authentication, validation, etc.)

**3. Database:** Using PostgreSQL 15 official Docker image. Stores data persistently

![image](https://github.com/user-attachments/assets/d11f159b-3bfa-4def-b968-622b4f359482)

**Steps to deploy the application (All commands are in _Italic font_):**

1. SSH to the machine (I am using AWS EC2 Instance and Amazon-provided Ubuntu 24.04 LTS AMI). Install docker and docker compose. If you need help, refer to:

Docker Installation: https://youtu.be/onF8QS9DMQA

Docker compose installation: https://youtu.be/JAzg2TjuyRI

2. _mkdir project_

3. sudo apt install git -y # For ubuntu and sudo yum install git -y # For rpm-based OS like RHEL, CentOS Fedora etc

4. _cd project_

5. Setup SSH-Based authentication to GitHub (optional)

6. For SSH-Based authentication: _git clone -b react-tailwind-website git@github.com:bhavukm/3tier-react-tailwind.git_

   For HTTP-Based authentication: _git clone -b react-tailwind-website https://github.com/bhavukm/3tier-react-tailwind.git_

7. _cd 3tier-react-tailwind_

8. _docker compose up -d_

9. _docker compose ps_
  
10. _docker ps_

11. Open a browser and access the application: http://server-ip:80

12. _docker images_
  
13. To destroy all resources created by docker compose: _docker compose down --rmi all -v_
