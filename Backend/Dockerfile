FROM node:18-alpine

WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install --production

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิด port 4000 (ให้สอดคล้องกับค่าที่ app ใช้)
EXPOSE 4000

# รันคำสั่ง production (ใช้ npm start เพื่อรัน server.js โดยที่ script "start" ใน package.json ใช้ "node server.js")
CMD ["npm", "start"]
