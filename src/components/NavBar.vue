<template>
  <nav>
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/students">Students</router-link></li>
      <li><router-link to="/add-student">Add Student</router-link></li>
      <li><router-link to="/class-management">Classes</router-link></li>
      <li><router-link to="/assign-courses">Assign Courses</router-link></li>
      <li><router-link to="/attendance">Attendance</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
nav {
  background-color: #2c3e50;
  padding: 1rem;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

nav a.router-link-active {
  background-color: #0078d4;
}
</style>
