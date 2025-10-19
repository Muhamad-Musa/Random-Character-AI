# VueWork — Team Tasks & Scheduling App

## Problem
Small teams often struggle to manage projects and tasks efficiently. Without a centralized system, tasks get lost, progress is hard to track, and collaboration suffers.

## Target Users
- Small teams in companies or startups  
- Project managers who need to assign and track tasks  
- Team members who need visibility on their tasks and deadlines  

## Success Criteria
- Users can create projects and tasks  
- Tasks can be assigned, tracked, and moved across a Kanban board  
- Users can comment on tasks  
- Calendar view shows tasks by due dates  
- Admins can manage users and roles  

## User Stories
1. **As a team member**, I want to view all projects I’m part of, so I can see what I need to work on.  
2. **As a project manager**, I want to create new projects, so the team has a place to track tasks.  
3. **As a team member**, I want to add tasks to a project, so I can keep track of my work items.  
4. **As a project manager**, I want to assign tasks to users, so everyone knows their responsibilities.  
5. **As a team member**, I want to move tasks across the board (To-Do → In-Progress → Done), so I can track task status.  
6. **As a team member**, I want to comment on tasks, so I can communicate updates or ask questions.  
7. **As a team member**, I want to see tasks in a calendar view, so I can plan my work by due dates.  
8. **As an admin**, I want to manage users and roles, so I can control access and permissions.  

## Non-goals
- Advanced analytics or charts  
- Real-time notifications or chat  
- Integration with external APIs  
- Full authentication (only placeholder login)  
- Mobile app design (desktop-first prototype)  

## Low-Fidelity Wireframes
- **Home Page** – header/nav/footer, welcome text, navigation links  
- **Projects List** – list of projects with placeholders  
- **Kanban Board** – columns: To-Do, In-Progress, Done, with example task cards  
- **Task Detail** – page/modal showing task name, description, comments  
- **Calendar View** – monthly view with task markers  

## Tech Stack
- Vue 3 + Vite  
- Vue Router  
- Pinia  
- Axios (placeholder)  
- ESLint + Prettier  

## Base Layout
- Header / NavBar / Footer components  
- Responsive shell (desktop-first)  

## Acceptance
- App runs locally at `http://localhost:5173`  
- 3+ routes are functional  
- Pinia store exists  
- README includes problem, users, success criteria, user stories, non-goals, wireframes  
