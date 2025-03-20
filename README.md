### 📌 **README.md**  

# 🎀 Project Management App  

A **pastel-themed** project management application built using **React**, **Material UI**, and **Drag & Drop** functionality. This app helps teams organize tasks in a **Kanban Board**, track project progress, manage team collaborations, and schedule important deadlines using an interactive **calendar**.

---

## ✨ **Features**  

✅ **Kanban Board** - Drag and drop tasks across columns (**To Do, In Progress, Ready**).  
✅ **Calendar View** - Assign tasks to specific dates, view them in an **interactive calendar** with visual markers.  
✅ **Team Management** - Create teams, view team members, and add/remove members dynamically.  
✅ **Roadmap View** - Track **upcoming project goals & features** alongside the calendar.  
✅ **User Authentication** - Secure **login and registration** for personalized task management.  
✅ **Task Assignments** - Assign tasks to **specific users** and filter tasks based on **teams**.  
✅ **Real-time Updates** - Tasks update dynamically across all views (**Kanban, Calendar, Roadmap**).  
✅ **Database-Connected Backend** - All tasks, teams, and users are stored in **MySQL**, ensuring persistence.  
✅ **Fully Responsive UI** - Styled with **Material UI**, optimized for both **desktop & mobile**.  

---

## 🛠 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/HelmiLaakkonen/project-management-app.git
cd project-management-app
```

### **2️⃣ Install Dependencies**  
```
npm install
```

### **3️⃣ Configure the Backend**  
- Create a **.env** file in the root directory and set up your **MySQL database credentials**:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=project_management
  ```
- Run database migrations (`schema.sql`) to initialize the tables.

### **4️⃣ Start the Development Server**  
```
npm run dev
```
📌 The app should now be running on **http://localhost:3000/** (or another available port).  

---

## 🖥 **Tech Stack**  

- **Frontend:** React, Material UI, React Router  
- **State Management:** Context API  
- **Drag & Drop:** hello-pangea/dnd  
- **Backend:** Node.js, Express.js, MySQL  
- **Authentication:** JSON Web Tokens (JWT)  

---

## 📝 **Usage Guide**  

### **🏷️ Managing Tasks in Kanban Board**  
1. **Add new tasks** by entering the task name, description, and team assignment.  
2. **Drag tasks** between columns (**To Do, In Progress, Ready**) to update their progress.  
3. **Click a task** to view/edit details.  

### **📅 Using the Calendar & Roadmap**  
- **Click a date** to view assigned tasks.  
- Tasks are **highlighted with dots** on their respective dates.  
- The **roadmap section** shows **upcoming features** alongside the calendar.  

### **👥 Team Management**  
- **Create teams** and assign them names.  
- **Click a team** to view its **members**.  
- **Add members** to teams dynamically.  
- **Delete teams** when they are no longer needed.  

### **👤 User Authentication**  
- **Login/Register** to access personalized task management.  
- Authentication state is securely stored using **JWT tokens**.  

---

## 💖 **Credits**  
Created with 💕 by [Helmi Laakkonen](https://github.com/HelmiLaakkonen), Pinja Kemppainen & Teemu Räisänen.  

---
