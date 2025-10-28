# SambalpuriBazaar

A full-stack **e-commerce platform** for Sambalpuri handloom clothing. Customers can buy **ready-made clothes** or **customize their outfits** using Sambalpuri fabrics. Admin/Weavers can manage products, orders, and inventory. This project bridges **Western Odisha’s handloom artisans** with customers, preserving culture while going digital.  

---

## Project Structure
```text
SambalpuriBazaar
│
├── Backend # Spring Boot project
│   ├── src
│   ├── pom.xml
│   └── ...
│
└── Frontend # React + Vite project
    ├── src
    ├── package.json
    └── vite.config.js
```
---
## 🚀 Tech Stack

**Frontend (React + Vite)**  
- React.js (Vite) – UI development  
- Axios – API calls  
- React Router DOM – Routing  
- Bootstrap / Tailwind – Styling  
- React-Toastify – Notifications  

**Backend (Spring Boot)**  
- Spring Boot – REST APIs  
- Spring Data MongoDB – Database  
- Spring Security – Authentication & authorization  
- Lombok – Boilerplate reduction  
- Maven – Build tool  

**Database**  
- MongoDB Atlas – Cloud database  

---

## 🔑 Features

### 👤 User
- Register / Login  
- Browse products & fabrics  
- Add to Cart & Wishlist  
- Place orders with Razorpay payment  
- Customize clothing (fabric + type + size)  
- Track order status  
- Provide feedback  

### 🛠️ Admin / Weaver
- Add, update, delete products  
- Manage inventory  
- Handle orders & custom requests  
- Track customer feedback  

---

## 📌 How to Run

### 1. Backend (Spring Boot)
```baash
cd Backend
mvn spring-boot:run
```

### 2. Frontend (React + Vite)
```bash
cd Frontend
npm install
npm run dev
```

