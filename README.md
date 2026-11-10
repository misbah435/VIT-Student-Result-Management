# VIT Student Result Management System

A full-stack student result management application built using React, Spring Boot and MySQL.

## Features
- Student dashboard with total student count
- Average and highest percentage statistics
- Add student records
- Edit student records
- Delete student records
- Search students by name, PRN or branch
- Automatic total marks and percentage calculation
- Responsive dark-themed interface

## Technologies Used

**Frontend:** React, Vite, JavaScript, CSS, Lucide React

**Backend:** Java 17, Spring Boot, Spring Data JPA, Maven

**Database:** MySQL 8

## Project Structure

- `src/` - Spring Boot backend
- `frontend/` - React frontend
- `pom.xml` - Maven configuration

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE vit_student_result;
```

Configure your database credentials using the `DB_PASSWORD` environment variable.

## Run the Backend

```powershell
$env:DB_PASSWORD = "YOUR_MYSQL_PASSWORD"
mvn spring-boot:run
```

Backend URL: http://localhost:8080

## Run the Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Add student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

## Developer

**Misbah Shaikh**

BTech Computer Science
