# React & Node.js Mini Projects

---

## 1. React Component & State Management

Build a small React component: **Todo List**

### Features:

- Add a task
- Mark task as complete
- Filter tasks by **All / Completed / Pending**

### Requirements:

- Use **functional components + hooks** (`useState` / `useEffect`)
- No external state management library (Redux, Zustand, etc.)

---

## 2. Form Handling & Validation

Create a **User Profile Form** with conditional validation.

### Fields:

- **Name**: required, min 3 chars
- **Email**: required if Phone is empty
- **Phone**: required if Email is empty

### Requirements:

- Use **React + any validation library** (Zod / Yup / React Hook Form)
- Show **inline error messages**
- On submit, print form data to console

---

## 3. REST API with Node.js + Express

Build a simple backend API with Express.

### Endpoints:

- `GET /tasks` → returns all tasks
- `POST /tasks` → adds a new task (with title & status)
- `PUT /tasks/:id` → updates task status
- `DELETE /tasks/:id` → deletes a task

### Requirements:

- Use an **in-memory array** as storage (no database needed)
- Proper error handling:
  - 404 if task not found
  - Validation errors

---

## 4. React + API Integration

Integrate React with the Node API (from Q3).

### Features:

- Fetch tasks from the API
- Display tasks in a table or list
- Add new task via form
- Mark tasks complete/incomplete

---

## 5. Authentication Basics

**JWT Authentication flow** with Node + React

### In Node.js:

- `POST /login` API accepts `username` & `password` (hardcoded user)
- If valid → return a **JWT token**

### In React:

- Create a **login form**
- On success:
  - Store token in **localStorage**
  - Redirect user to a protected page (loads only if token exists)
