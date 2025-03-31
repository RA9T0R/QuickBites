# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# Copy โค้ดทั้งหมดและ build โปรเจ็กต์ (Vite จะสร้างโฟลเดอร์ dist)
COPY . .
COPY .env .env
RUN npm run build

# Stage 2: Production – Serve ด้วย Nginx
FROM nginx:stable-alpine

# Copy ไฟล์ build จาก Stage 1 ไปที่ directory ของ Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# เปิด port 80
EXPOSE 80

# รัน Nginx ในโหมด foreground
CMD ["nginx", "-g", "daemon off;"]
