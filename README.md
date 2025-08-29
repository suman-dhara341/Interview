---

### *1. React Component & State Management*

Build a small React component.
Create a *Todo List* component where a user can:

* Add a task
* Mark it as complete
* Filter tasks by *All / Completed / Pending*

Requirements:

* Use *functional components + hooks (useState/useEffect)*
* No external state management library (Redux, Zustand, etc.).

---

### _2. Form Handling & Validation_

Simple profile form with conditional validation.
Create a _User Profile Form_ with the following fields:

- Name (required, min 3 chars)
- Email (required if Phone is empty)
- Phone (required if Email is empty)

Requirements:

- Use _React + any validation library (Zod/Yup/React Hook Form)_
- Show inline error messages.
- On submit, print form data to console.

---

### _3. REST API with Node.js + Express_

Build a simple backend API.
Create an Express server with endpoints:

- GET /tasks → returns all tasks
- POST /tasks → adds a new task (with title & status)
- PUT /tasks/:id → updates task status
- DELETE /tasks/:id → deletes a task

Requirements:

- Use an _in-memory array_ as storage (no DB needed).
- Proper error handling (404 if not found, validation errors).

---

### _4. React + API Integration_

Integrate React with the Node API (from Q3).
Create a React page that:

- Fetches the list of tasks from the API
- Displays them in a table/list
- Allows adding a new task via form
- Allows marking tasks complete/incomplete

---

### _5. Authentication Basics_

JWT Authentication flow with Node + React.

- In Node.js:

  - Create a POST /login API that accepts username & password (hardcode user).
  - If valid → return a JWT token.

- In React:

  - Create a login form.
  - On success, store the token in _localStorage_.
  - Redirect user to a protected page that only loads if the token exists.

---
