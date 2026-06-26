# AI Task Manager 🤖✅

A full-stack AI-powered task management web application built with React.js and Express.js, featuring Anthropic Claude AI integration for intelligent task generation and chat assistance.

## 🌐 Live Demo

- **Frontend:** https://ai-task-manager-frontend-two.vercel.app
- **Backend API:** https://ai-task-manager-backend-gjxp.onrender.com

## 🔐 Demo Credentials

| Role  | Email          | Password |
|-------|----------------|----------|
| User  | user@demo.com  | demo123  |
| Admin | admin@demo.com | demo123  |

## 📁 GitHub Repositories

- **Frontend:** https://github.com/lamifaharia/ai-task-manager-frontend
- **Backend:** https://github.com/lamifaharia/ai-task-manager-backend

---

## 📌 Project Overview

AI Task Manager (TaskAI) is a production-quality productivity platform that combines smart task management with the power of Anthropic's Claude AI. Users can create, organize, filter, and track tasks while leveraging AI to automatically generate structured task breakdowns from plain English descriptions and get intelligent assistance through a built-in context-aware chat assistant.

The platform supports two roles — regular users and admins. Users manage their own tasks through a personal dashboard. Admins have full visibility across all users and tasks, with additional analytics and management tools. Both roles get full access to all AI features.

The app is fully responsive across mobile, tablet, and desktop, and supports light and dark mode with proper contrast throughout.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool and dev server |
| React Router DOM v6 | Client-side page routing |
| TanStack Query v5 | Server state management and data fetching |
| Axios | HTTP requests to the backend API |
| React Hook Form | Form state management |
| Zod | Form validation schema |
| Tailwind CSS | Utility-first CSS styling |
| Recharts | Charts and data visualizations in dashboard |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework and REST API |
| JSON Web Token (JWT) | Authentication and authorization |
| bcryptjs | Password hashing |
| UUID | Generating unique IDs |
| dotenv | Environment variable management |
| CORS | Cross-origin resource sharing |
| JSON file storage | Lightweight data persistence |

### AI
| Technology | Purpose |
|---|---|
| Anthropic Claude API | Powers both AI features |
| claude-sonnet-4-6 | The specific Claude model used |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Version control and source code |

---

## 🤖 AI Features

### Feature 1 — AI Chat Assistant

A context-aware chatbot built into the dashboard as a floating widget in the bottom right corner. The assistant is fully aware of the user's current tasks — it knows how many tasks they have, their titles, statuses, and priorities. Users can ask anything related to their work such as productivity advice, how to prioritize tasks, project planning suggestions, or general questions. Full conversation history is maintained during the session so follow-up questions work naturally.

**How to use:**
1. Log in and go to the Dashboard
2. Click the blue robot icon in the bottom right corner
3. Select the **Chat** tab
4. Type any question and press Enter or click Send

**Example questions you can ask:**
- "Which of my tasks should I do first?"
- "Give me tips to finish my high priority tasks faster"
- "How should I plan my week around these tasks?"
- "Summarize what I need to do today"

---

### Feature 2 — AI Task Generator

Users describe their project or goal in plain English and Claude AI automatically generates 4 structured, actionable tasks. Each generated task includes a title, detailed description, category, priority level, and relevant tags. Tasks can be added to the user's account instantly with a single click.

**How to use:**
1. Log in and go to the Dashboard
2. Click the blue robot icon in the bottom right corner
3. Select the **Task Generator** tab
4. Describe your project goal in the text box
5. Click **Generate Tasks**
6. Review the 4 generated tasks and click **Add Task** on any you want to keep

**Example inputs to try:**
- "Build a portfolio website with React and deploy it on Vercel"
- "Plan a social media marketing campaign for a new product launch"
- "Set up a REST API with authentication and database integration"
- "Create a mobile app design and prototype for a food delivery service"

---

## ✨ Features Overview

### Authentication
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Demo login buttons for instant access without typing credentials
- Protected routes — redirects to login if not authenticated

### Role Based Access Control (RBAC)
- **User role** — manages their own tasks, personal dashboard with 4 menu items
- **Admin role** — sees all tasks from all users, admin dashboard with 6 menu items including user management

### Tasks
- Create, view, update, and delete tasks
- Each task has title, description, category, priority, status, due date, and tags
- Task detail page with full information
- Related actions section on task detail page

### Explore / Listing Page
- Debounced search bar for real-time filtering
- Filter by category, priority, and status
- Sort by newest, priority, or alphabetically
- Pagination with page controls
- 4 cards per row on desktop
- Skeleton loaders while data is fetching

### Dashboard
- Overview cards showing total, in-progress, completed, and high-priority counts
- Admin sees additional total users card
- Bar chart showing task status breakdown
- Pie chart showing priority distribution
- Category bar chart showing tasks per category
- All charts use real dynamic data from the API
- Data table of recent tasks with delete action
- Add new task modal form

### UI and Design
- Maximum 3 primary colors — indigo, purple, and neutral gray
- Full light and dark mode support with persistent preference
- Consistent card sizes, border radius, and visual style throughout
- Fully responsive for mobile, tablet, and desktop
- Sticky navbar with dropdown profile menu
- Smooth hover animations on cards

### Home Page Sections
1. Hero section with CTA buttons
2. Statistics section
3. Features section
4. How it works section
5. Testimonials section
6. FAQ section with accordion
7. Call to Action section
8. Newsletter signup section

### Additional Pages
- About page
- Blog page
- Contact page with working form

---

## 📂 Project Structure

ai-task-manager/

├── backend/

│   ├── controllers/

│   │   ├── authController.js

│   │   └── taskController.js

│   ├── data/

│   │   └── db.json

│   ├── middleware/

│   │   └── auth.js

│   ├── routes/

│   │   ├── auth.js

│   │   └── tasks.js

│   ├── .env

│   ├── .gitignore

│   ├── package.json

│   └── server.js

│

└── frontend/

├── src/

│   ├── components/

│   │   ├── AIChat.jsx

│   │   ├── Charts.jsx

│   │   ├── Footer.jsx

│   │   ├── Navbar.jsx

│   │   ├── Sidebar.jsx

│   │   ├── SkeletonCard.jsx

│   │   ├── TaskCard.jsx

│   │   └── ThemeToggle.jsx

│   ├── context/

│   │   └── AuthContext.jsx

│   ├── hooks/

│   │   └── useTasks.js

│   ├── pages/

│   │   ├── About.jsx

│   │   ├── Blog.jsx

│   │   ├── Contact.jsx

│   │   ├── Dashboard.jsx

│   │   ├── Home.jsx

│   │   ├── Login.jsx

│   │   ├── Register.jsx

│   │   ├── TaskDetail.jsx

│   │   └── Tasks.jsx

│   ├── App.jsx

│   ├── index.css

│   └── main.jsx

├── .env

├── .gitignore

├── package.json

└── tailwind.config.js

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- Git installed on your computer

### 1. Clone the Repositories

```bash
# Clone backend
git clone https://github.com/lamifaharia/ai-task-manager-backend.git
cd ai-task-manager-backend

# Clone frontend
git clone https://github.com/lamifaharia/ai-task-manager-frontend.git
cd ai-task-manager-frontend
```

### 2. Backend Setup

```bash
cd ai-task-manager-backend
npm install
```

Create a `.env` file inside the backend folder:
PORT=5000
JWT_SECRET=random_secret_key_here
ANTHROPIC_API_KEY=sk-ant-key-here
Generate the demo user password hash:

```bash
node -e "const b=require('bcryptjs'); b.hash('demo123',10).then(h=>console.log(h))"
```

Copy the output and replace both `"password"` values in `data/db.json`.

Start the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ai-task-manager-frontend
npm install
```

Create a `.env` file inside the frontend folder:
VITE_API_URL=https://ai-task-manager-backend-gjxp.onrender.com

VITE_API_URL=https://ai-task-manager-backend-gjxp.onrender.com
VITE_ANTHROPIC_API_KEY=sk-ant-key-here
Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 4. Open the App

Go to `http://localhost:5173` in your browser and log in with the demo credentials listed at the top of this README.

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and receive JWT token | No |
| GET | /api/auth/me | Get current logged in user | Yes |
| PUT | /api/auth/profile | Update user profile name | Yes |

### Task Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /api/tasks | Get tasks with search, filter, sort, pagination | Yes |
| GET | /api/tasks/stats | Get task statistics for dashboard charts | Yes |
| GET | /api/tasks/:id | Get a single task by ID | Yes |
| POST | /api/tasks | Create a new task | Yes |
| PUT | /api/tasks/:id | Update an existing task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

---

## ⚠️ Note on Free Hosting

The backend is hosted on Render's free plan which automatically sleeps after 15 minutes of inactivity. The first request after a period of inactivity may take 30 to 60 seconds to respond while the server wakes up. This is completely normal behavior on the free tier. Simply wait a moment and refresh the page.