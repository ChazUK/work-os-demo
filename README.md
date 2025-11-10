# WorkOs Demo


Add the following to /etc/hosts

```
127.0.0.1       portfolio.site
127.0.0.1       portfolio.api
127.0.0.1       nrla.site
```

Install nginx via brew

run `sudo nginx -t` to find the nginx.conf

Add the following to nginx.conf

```
server {
    listen 80;
    server_name portfolio.site;

    location / {
        proxy_pass http://localhost:4200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name portfolio.api;

    location / {
        proxy_pass http://localhost:4201;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name nrla.site;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

run `sudo brew services restart nginx`
