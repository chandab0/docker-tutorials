# Setting up Nginx Load Balancer on Windows
This guide provides instructions for setting up Nginx as a load balancer on a Windows system. Nginx will distribute incoming requests across multiple backend servers to improve performance, scalability, and fault tolerance.

## Prerequisites
Nginx installed on your Windows system. You can download the latest version of Nginx for Windows from the official Nginx website.

## Configuration Steps
### 1. Edit Nginx Configuration (nginx.conf):

- Navigate to the directory where Nginx is installed on your Windows system.
- Open the nginx.conf file in a text editor.
- Configure the upstream servers in the http block. 
- Example:

```
upstream app_servers {
    server localhost:5000;
    server localhost:5001;
    server localhost:5002;
}
```

- Define the load balancing strategy and proxy settings in the server block. 
- Example:
```
server {
    listen 8080;  # Port for the load balancer
    
    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- Save the nginx.conf file after making changes.

### 2. Restart Nginx:

- Open Command Prompt as Administrator.

- Navigate to the directory where Nginx is installed.

- Stop Nginx by running the following command:

> nginx -s stop

- Start Nginx by running the following command:
> nginx

### 3. Test Load Balancer:

- Open a web browser and access http://localhost:8080 (or the port specified in your Nginx configuration). You should see your application served by the Nginx load balancer.
- Verify that requests are being distributed across multiple backend servers.


## Troubleshooting
- If Nginx fails to start or restart, check the Nginx error log for any error messages that may indicate the cause of the issue.
- Ensure that the nginx.conf file is correctly configured with the appropriate upstream servers and proxy settings.