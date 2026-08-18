<!-- # EmployeeManageApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. -->





# 👨‍💼 Employee Management System

<div align="center">

### A Modern Full-Stack Employee Management Application

Built with **Angular 22** ⚡ + **ASP.NET Core 10** 🚀 + **Entity Framework Core** 🗄️ + **Microsoft SQL Server**

<br/>

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-10-512BD4?style=for-the-badge\&logo=dotnet\&logoColor=white)
![C%23](https://img.shields.io/badge/C%23-Backend-239120?style=for-the-badge\&logo=csharp\&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-CC2927?style=for-the-badge\&logo=microsoftsqlserver\&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity%20Framework%20Core-10-512BD4?style=for-the-badge\&logo=.net\&logoColor=white)

<br/>

**A complete enterprise-style employee management solution for managing employees, departments, and designations through a clean and responsive web interface.**

</div>

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Database Design](#-database-design)
* [API Endpoints](#-api-endpoints)
* [Getting Started](#-getting-started)
* [Configuration](#-configuration)
* [Application Flow](#-application-flow)
* [Validation & Error Handling](#-validation--error-handling)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Author](#-author)

---

# 🌟 Overview

**Employee Management System** is a full-stack web application designed to simplify employee administration and master-data management.

The application provides a centralized platform where administrators can:

* 👨‍💼 Create and manage employees
* 🏢 Manage departments
* 💼 Manage designations
* 🔐 Authenticate employees
* 🔎 Search and filter employee records
* ↕️ Sort employee data
* 📄 Paginate large employee datasets
* ✏️ Update employee information
* 🗑️ Delete records
* ✅ Validate duplicate email addresses and contact numbers

The frontend communicates with a RESTful ASP.NET Core Web API, while Entity Framework Core handles communication between the API and Microsoft SQL Server.

---

# ✨ Features

## 👨‍💼 Employee Management

* Add new employees
* View employee details
* Update employee information
* Delete employees
* View department and designation information
* Store employee contact information
* Track employee creation and modification dates
* Assign employee roles

### Employee Information

The system manages:

* Name
* Contact Number
* Alternative Contact Number
* Email
* City
* State
* Pincode
* Address
* Department
* Designation
* Role
* Created Date
* Modified Date

---

## 🏢 Department Management

Complete CRUD functionality for departments.

* Create department
* View departments
* Update department
* Delete department
* Activate/deactivate department
* Prevent duplicate department names

---

## 💼 Designation Management

Designations are associated with departments.

Features include:

* Create designation
* View designations
* Update designation
* Delete designation
* Search designations
* Filter designations by department
* Prevent duplicate designation names

---

## 🔐 Login System

The application includes employee authentication using:

* Email
* Contact Number

Successful authentication returns employee information from the backend API.

---

## 🔎 Search & Filtering

Employee records can be filtered using:

* Employee name
* State
* Designation

The backend also supports sorting by:

* Name
* Email
* State
* Created Date

---

## 📄 Pagination

The employee API supports server-side pagination.

Example:

```text
Page      → 1
Page Size → 5
```

The API returns:

```json
{
  "TotalRecords": 25,
  "Page": 1,
  "PageSize": 5,
  "Data": []
}
```

This makes the application suitable for handling larger datasets without loading every record at once.

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                |
| --------------- | ---------------------- |
| Angular 22      | Frontend framework     |
| TypeScript      | Application logic      |
| HTML5           | UI structure           |
| CSS3            | Styling                |
| Bootstrap 5.3   | Responsive UI          |
| Bootstrap Icons | UI icons               |
| RxJS            | Reactive programming   |
| Angular Router  | Application navigation |

---

## Backend

| Technology               | Purpose                        |
| ------------------------ | ------------------------------ |
| ASP.NET Core 10          | REST API                       |
| C#                       | Backend programming            |
| Entity Framework Core 10 | ORM                            |
| LINQ                     | Database querying              |
| ASP.NET Core Web API     | REST endpoints                 |
| OpenAPI                  | API documentation              |
| CORS                     | Frontend-backend communication |

---

## Database

**Microsoft SQL Server**

Main tables:

```text
employeeTbl
departmentTbl
designationTbl
```

---

# 🏗️ Architecture

The project follows a typical **3-tier full-stack architecture**:

```text
┌─────────────────────────────────────┐
│             Angular 22              │
│             Frontend                │
│                                     │
│  Components → Services → HTTP       │
└─────────────────┬───────────────────┘
                  │
                  │ REST API / JSON
                  ▼
┌─────────────────────────────────────┐
│          ASP.NET Core 10            │
│              Backend                │
│                                     │
│ Controllers → EF Core → LINQ        │
└─────────────────┬───────────────────┘
                  │
                  │ SQL
                  ▼
┌─────────────────────────────────────┐
│          Microsoft SQL Server       │
│                                     │
│ Employee │ Department │ Designation │
└─────────────────────────────────────┘
```

---

# 📁 Project Structure

```text
LatestEmployeeManagement/
│
├── frontend(Angular)/
│   └── employee_manage_app/
│       │
│       ├── src/
│       │   └── app/
│       │       │
│       │       ├── models/
│       │       │   ├── Employee.model.ts
│       │       │   └── Department.model.ts
│       │       │
│       │       ├── pages/
│       │       │   ├── dashboard/
│       │       │   ├── department/
│       │       │   ├── designation/
│       │       │   ├── employee-form/
│       │       │   ├── employee-list/
│       │       │   ├── header/
│       │       │   └── login/
│       │       │
│       │       ├── services/
│       │       │   ├── employee-service.ts
│       │       │   └── master.ts
│       │       │
│       │       ├── app.config.ts
│       │       ├── app.routes.ts
│       │       └── app.ts
│       │
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
└── Visual Studio/
    └── Employee.api/
        └── Employee.api/
            │
            ├── Controllers/
            │   ├── EmployeeMasterController.cs
            │   ├── DepartmentMasterController.cs
            │   ├── DesignationMasterController.cs
            │   └── WeatherForecastController.cs
            │
            ├── Model/
            │   ├── EmployeeModel.cs
            │   ├── Department.cs
            │   ├── Designation.cs
            │   └── EmployeeDbContext.cs
            │
            ├── Properties/
            │   └── launchSettings.json
            │
            ├── Program.cs
            ├── appsettings.json
            └── Employee.api.csproj
```

---

# 🗄️ Database Design

The application uses three primary entities.

### Employee

```text
employeeTbl
│
├── employeeId
├── name
├── contactNo
├── email
├── city
├── state
├── pincode
├── altContactNo
├── address
├── designationId
├── createdDate
├── modifiedDate
└── role
```

### Department

```text
departmentTbl
│
├── departmentId
├── departmentName
└── isActive
```

### Designation

```text
designationTbl
│
├── designationId
├── departmentId
└── designationName
```

### Relationship

```text
Department
     │
     │ 1
     │
     │
     ▼
Designation
     │
     │ 1
     │
     │
     ▼
Employee
```

A department can have multiple designations, and employees are assigned to a designation.

---

# 🔌 API Endpoints

## Employee APIs

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/api/EmployeeMaster`        | Get all employees               |
| GET    | `/api/EmployeeMaster/{id}`   | Get employee by ID              |
| POST   | `/api/EmployeeMaster`        | Create employee                 |
| PUT    | `/api/EmployeeMaster/{id}`   | Update employee                 |
| DELETE | `/api/EmployeeMaster/{id}`   | Delete employee                 |
| GET    | `/api/EmployeeMaster/filter` | Search, filter, sort & paginate |
| POST   | `/api/EmployeeMaster/login`  | Employee login                  |

---

## Department APIs

| Method | Endpoint                                      | Description       |
| ------ | --------------------------------------------- | ----------------- |
| GET    | `/api/DepartmentMaster/GetAllDepartments`     | Get departments   |
| POST   | `/api/DepartmentMaster/AddDepartment`         | Create department |
| PUT    | `/api/DepartmentMaster/UpdateDepartment`      | Update department |
| DELETE | `/api/DepartmentMaster/DeleteDepartment/{id}` | Delete department |

---

## Designation APIs

| Method | Endpoint                                        | Description          |
| ------ | ----------------------------------------------- | -------------------- |
| GET    | `/api/DesignationMaster/GetAllDesignations`     | Get designations     |
| GET    | `/api/DesignationMaster/{id}`                   | Get designation      |
| POST   | `/api/DesignationMaster/AddDesignation`         | Create designation   |
| PUT    | `/api/DesignationMaster/UpdateDesignation/{id}` | Update designation   |
| DELETE | `/api/DesignationMaster/{id}`                   | Delete designation   |
| GET    | `/api/DesignationMaster/search`                 | Search designation   |
| GET    | `/api/DesignationMaster/filter`                 | Filter by department |

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Arkopravo/Employee-Management-App.git
```

```bash
cd Employee-Management-App
```

---

# 2️⃣ Setup SQL Server

Make sure **Microsoft SQL Server** is installed and running.

Create the required database and tables:

```text
employeeManageDB
```

The application expects the following tables:

```text
employeeTbl
departmentTbl
designationTbl
```

Update the connection string inside:

```text
Visual Studio/Employee.api/Employee.api/appsettings.json
```

Example:

```json
{
  "ConnectionStrings": {
    "ProjectCon": "Server=YOUR_SERVER;Database=employeeManageDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> Replace `YOUR_SERVER` with your SQL Server instance name.

---

# 3️⃣ Run the ASP.NET Core Backend

Open the backend directory:

```bash
cd "Visual Studio/Employee.api/Employee.api"
```

Restore dependencies:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

The API is configured to run on:

```text
https://localhost:7038
```

or

```text
http://localhost:5150
```

---

# 4️⃣ Run the Angular Frontend

Open another terminal.

Navigate to:

```bash
cd "frontend(Angular)/employee_manage_app"
```

Install dependencies:

```bash
npm install
```

Start Angular:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:4200
```

---

# ⚙️ Configuration

The Angular application communicates with the ASP.NET Core API using HTTP requests.

Make sure the API URL in the Angular services matches your backend:

```text
https://localhost:7038/api/
```

If your backend runs on a different port, update the API URL accordingly.

---

# 🔄 Application Flow

### Employee Creation

```text
User
  │
  ▼
Angular Employee Form
  │
  ▼
Employee Service
  │
  ▼
HTTP POST
  │
  ▼
ASP.NET Core API
  │
  ▼
Model Validation
  │
  ├── Duplicate Email?
  │
  ├── Duplicate Contact?
  │
  └── Valid Data
        │
        ▼
Entity Framework Core
        │
        ▼
SQL Server
        │
        ▼
Success Response
        │
        ▼
Angular UI
```

---

# 🛡️ Validation & Error Handling

The backend performs validation before modifying database records.

### Employee validation

* Required fields
* Email format validation
* Contact number length validation
* Pincode validation
* Duplicate email detection
* Duplicate contact number detection
* Employee existence validation

### Department validation

* Required department name
* Duplicate department detection
* Department existence validation

### Designation validation

* Required model validation
* Duplicate designation detection
* Department association
* Designation existence validation

The API returns appropriate HTTP responses such as:

```text
200 OK
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

---

# 🎨 Frontend Modules

The Angular application is divided into reusable feature-oriented components.

### Dashboard

Provides the main application interface and navigation.

### Login

Handles employee authentication.

### Employee Form

Used for:

* Creating employees
* Editing employees
* Validating employee data

### Employee List

Displays employee records and supports data interaction.

### Department

Provides department CRUD operations.

### Designation

Provides designation CRUD operations and department-based filtering.

### Header

Provides the application's common navigation/header interface.

---

# 🧠 Key Development Concepts Demonstrated

This project demonstrates practical implementation of:

* RESTful API development
* Angular component architecture
* Angular services
* Dependency injection
* HTTP client communication
* Routing
* RxJS Observables
* Entity Framework Core
* LINQ queries
* SQL Server integration
* CRUD operations
* Server-side pagination
* Dynamic filtering
* Sorting
* Model validation
* CORS configuration
* Exception handling
* Relational database design
* Frontend-backend integration

---

# 🔮 Future Improvements

The project can be extended with additional enterprise-level functionality.

### 🔐 Authentication

* JWT authentication
* Role-based authorization
* Admin and employee roles
* Refresh tokens
* Password-based authentication

### 📊 Dashboard

* Employee statistics
* Department-wise employee count
* Designation analytics
* Charts and graphs
* Recent employee activity

### 🔎 Advanced Search

* Multiple filters
* Date-range filtering
* Advanced sorting
* Dynamic search
* Export filtered results

### 📄 Reports

* Export employees to Excel
* Generate PDF reports
* Department reports
* Employee attendance reports

### ☁️ Deployment

The application can be deployed using:

```text
Angular
   ↓
Azure Static Web Apps / Azure App Service

ASP.NET Core API
   ↓
Azure App Service

SQL Server
   ↓
Azure SQL Database
```

---

# 📸 Screenshots

Add your application screenshots here to make the repository more attractive.

Example:

```markdown
## 📸 Screenshots

### 🔐 Login

![Login](screenshots/login.png)

### 📊 Dashboard

![Dashboard](screenshots/dashboard.png)

### 👨‍💼 Employee Management

![Employees](screenshots/employees.png)

### 🏢 Department Management

![Departments](screenshots/departments.png)

### 💼 Designation Management

![Designations](screenshots/designations.png)
```

> **Tip:** For a job/resume repository, screenshots are highly recommended. They make the project immediately understandable to recruiters.

---

# 💡 Why This Project?

This project was built to demonstrate how a modern full-stack application can be structured using Microsoft's ecosystem together with Angular.

It focuses on practical software development concepts rather than just basic CRUD operations, including:

**Angular → REST API → Entity Framework Core → SQL Server**

This architecture closely resembles the structure used in many real-world enterprise applications.

---

# 📚 Learning Outcomes

Through this project, I gained hands-on experience with:

* Building REST APIs using ASP.NET Core
* Connecting ASP.NET Core with SQL Server
* Working with Entity Framework Core
* Designing relational database models
* Building reusable Angular components
* Creating Angular services
* Consuming REST APIs from Angular
* Implementing CRUD workflows
* Implementing pagination and filtering
* Handling validation errors
* Managing frontend/backend communication
* Configuring CORS
* Structuring a full-stack application

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you would like to contribute:

```bash
# Fork the repository

# Create a new branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature

# Open a Pull Request
```

---

# 📄 License

This project is intended for **educational and portfolio purposes**.

You are free to explore, modify, and improve the project.

---

# 👨‍💻 Author

## **Arkopravo Ghosh**

Full-Stack Developer | Angular | ASP.NET Core | SQL Server | C#

Interested in building scalable, modern and production-ready web applications.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**Built with ❤️ using Angular + ASP.NET Core + SQL Server**

</div>
