# Student Management System

A comprehensive Vue 3 web application for managing students, classes, courses, and attendance tracking.

## Features

✅ **Dashboard** - Overview with total students/classes and recent 5 students
✅ **Student List** - View all students with search and pagination
✅ **Add Student** - Create new students with validation
✅ **Student Details** - View individual student info and assigned courses
✅ **Class Management** - Add/manage classes and view students per class
✅ **Assign Courses** - Assign courses to students
✅ **Attendance Tracking** - Mark student attendance by course and date

## Tech Stack

- **Frontend:** Vue 3 + Vue Router + Pinia
- **Build Tool:** Vite
- **Styling:** Scoped CSS
- **State Management:** Pinia

## Project Structure

```
src/
├── components/
│   ├── NavBar.vue       # Navigation menu
│   └── Footer.vue       # Footer component
├── layouts/
│   └── BaseLayout.vue   # Base layout wrapper
├── pages/
│   ├── Dashboard.vue            # Home page
│   ├── StudentList.vue          # All students
│   ├── AddStudent.vue           # Add new student
│   ├── StudentDetails.vue       # Student info
│   ├── ClassManagement.vue      # Manage classes
│   ├── AssignCourses.vue        # Assign courses
│   └── AttendanceTracking.vue   # Attendance
├── router/
│   └── index.js         # Route definitions
├── stores/
│   └── studentStore.js  # Pinia store
├── App.vue
└── main.js
```

## Data Models

### Student
```javascript
{
  id: Number,
  name: String,
  age: Number,
  email: String,
  class_id: Number,
  courses: [Number] // array of course IDs
}
```

### Class
```javascript
{
  id: Number,
  name: String
}
```

### Course
```javascript
{
  id: Number,
  name: String
}
```

### Attendance
```javascript
{
  id: Number,
  student_id: Number,
  course_id: Number,
  date: String, // "YYYY-MM-DD"
  status: String // "Present" or "Absent"
}
```

## API Endpoints (Backend Ready)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get one student |
| POST | `/students` | Create student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |
| GET | `/classes` | Get all classes |
| POST | `/classes` | Create class |
| GET | `/courses` | Get all courses |
| GET | `/students/:id/courses` | Get student's courses |
| POST | `/students/:id/courses` | Assign courses |
| GET | `/attendance?course_id=X&date=YYYY-MM-DD` | Get attendance |
| POST | `/attendance` | Mark attendance |

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Features Implementation Status

### Dashboard ✅
- Total students count
- Total classes count
- Recent 5 students display
- Navigation links to all pages

### Student List ✅
- Search by student name
- Table with Name, Class, Actions columns
- View button → Student Details
- Delete button with confirmation
- Link to Add Student

### Add Student ✅
- Form fields: Name, Age, Class, Email (all required)
- Email validation
- Success message with link to view
- Reset button functionality

### Student Details ✅
- Display: Name, Age, Email, Class
- List of assigned courses
- Assign Courses button
- Delete button
- Back button

### Class Management ✅
- List all classes
- Add new class form
- Click class to view students
- Students filtered by class

### Assign Courses ✅
- Student dropdown selector
- Course checkboxes
- Display currently assigned courses
- Success message on assignment

### Attendance Tracking ✅
- Course selector dropdown
- Date picker
- Load button to fetch students
- Mark Present/Absent status
- Save attendance records
- Attendance history display

## Next Steps

1. Create a backend API (Node.js/Express, Python/Flask, etc.)
2. Connect API endpoints in the store using axios
3. Replace mock data with real API calls
4. Add error handling and loading states
5. Deploy to production

## License

MIT
