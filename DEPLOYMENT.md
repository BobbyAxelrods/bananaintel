# Deployment & SSL Guide for Banana Intel

## 1. Backend Verification Status
✅ **User Signup:** Functional.
✅ **Verification Flow:** Functional (Link generation fixed, token decoding fixed).
✅ **Email Service:** Configured for Gmail SMTP.
✅ **Admin Flow:** Functional (Signup, Login, Content Creation).
✅ **Resource Delivery:** Implemented (Resources email sent after confirmation).

---

## 2. Deploying to Azure VM

### Prerequisites
- An Azure VM (Ubuntu 22.04 LTS recommended).
- SSH access to the VM.
- Domain `imbanana.cc` pointed to the VM's Public IP (A Record).

### Step 1: Prepare the VM
SSH into your VM and install Docker & Docker Compose:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (avoid sudo for docker commands)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

### Step 2: Deploy Code
Clone your repository to the VM:

```bash
git clone <your-repo-url> banana-intel
cd banana-intel/backend
```

### Step 3: Configure Environment
Create the `.env` file with your production values:

```bash
nano .env
```

Paste your configuration (ensure `DOMAIN` matches your production domain):
```ini
DATABASE_URL=postgresql+asyncpg://admin:secure_password@postgres:5432/banana_intel
MONGO_URL=mongodb://mongo:27017
MONGO_DB_NAME=banana_intel
MILVUS_URI=http://milvus-standalone:19530

SECRET_KEY=your_production_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_CREATION_TOKEN=your_secure_admin_token

MAIL_USERNAME=banana.intelligence.os@gmail.com
MAIL_PASSWORD=sfarmcnlwjvrslnv
MAIL_FROM=banana.intelligence.os@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_FROM_NAME=Banana Intel

DOMAIN=https://imbanana.cc
```

### Step 4: Start Services
```bash
docker compose up -d --build
```

---

## 3. Setting up SSL (imbanana.cc)

We will use **Nginx** as a reverse proxy and **Certbot** for free SSL certificates.

### Step 1: Install Nginx & Certbot
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

### Step 2: Configure Nginx
Create a configuration file for your domain:

```bash
sudo nano /etc/nginx/sites-available/imbanana.cc
```

Paste the following (this proxies traffic to your backend running on port 8000):

```nginx
server {
    server_name imbanana.cc www.imbanana.cc;

    location / {
        proxy_pass http://localhost:3000; # Frontend (if running on 3000)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000; # Backend API
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
*Note: Adjust ports if your Frontend/Backend setup differs in production (e.g., if you serve frontend statically).*

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/imbanana.cc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Obtain SSL Certificate
Run Certbot to automatically configure SSL:

```bash
sudo certbot --nginx -d imbanana.cc -d www.imbanana.cc
```
- Enter your email for renewal notices.
- Agree to terms.
- Choose "Redirect" to force HTTPS.

### Verification
Visit `https://imbanana.cc`. Your connection should be secure, and requests to `/api` will be routed to your FastAPI backend.
