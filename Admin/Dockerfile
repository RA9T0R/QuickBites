# ====== Stage 1: Build React (Vite) ======
FROM node:18-alpine AS build

WORKDIR /app

# คัดลอก package.json และติดตั้ง dependency
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด + .env
COPY . .
COPY .env .env

# สร้าง production build
RUN npm run build


# ====== Stage 2: Serve with Nginx ======
FROM nginx:stable-alpine

# คัดลอกไฟล์ build ไปยัง nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# ใส่ config nginx เอง (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิดพอร์ต 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
