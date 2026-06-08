# HELPDESK PROJECT

> Status: Finished V.1

 ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
 ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
 ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
 ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
 ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) 
 ![Bootstrap](https://img.shields.io/badge/-boostrap-0D1117?style=for-the-badge&logo=bootstrap&labelColor=0D1117) 
 ![Vscode](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
 ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) 


Frontend project built with Angular to consume the HelpDesk API. The application focuses on ticket management, user authentication and administrative dashboards.

## 🚀 Technologies
- Angular 17
- TypeScript
- HTML / CSS
- Bootstrap
- ngx-spinner
- Node.js / npm
- Git

## 📋 Features
- Authentication (login / logout)
- CRUD for tickets
- Queue/dashboard views
- User profiles and basic permissions
- Interceptors for token and loading spinner

## 🏗️ Architecture
The application is organized by domain: components, pages, services, guards, interceptors and models. Dependency Injection (providers) is used for interceptors and routing via RouterModule.

## ⚙️ Prerequisites
- Node.js >= 16 (recommended >= 18)
- npm >= 8
- Angular CLI (optional, helps with local commands): ng update @angular/core@17 @angular/cli@17

## 🔧 Installation
1. Clone the repository:
   git clone https://github.com/oliveira-jo/helpdesck-web
2. Change to the project folder:
   cd helpdesk-page
3. Install dependencies:
   npm install

## ▶️ How to run
- Development server:
  npm run start
  or
  ng serve
  Visit: http://localhost:4200

- Production build:
  npm run build
  or
  ng build --configuration production
  Artifacts are generated in: dist/

## 📡 API Endpoints
Actual endpoints are defined in the HelpDesk API and environment variables. Check src/environments/environment.ts.
Example placeholders:
- POST /api/auth/login — authentication
- GET /api/tickets — list tickets
- POST /api/tickets — create ticket
- GET /api/tickets/:id — ticket details
- PUT /api/tickets/:id — update ticket
- GET /api/users — users (admin)

Note: replace these URLs with the values from your environment file.

## 🔐 Security
- JWT token sent via the Authorization header by the TokenInterceptor.
- Guards protect routes that require authentication.
- Avoid storing non-expiring tokens in localStorage without additional measures (refresh tokens, secure cookies).

## 📁 Project structure
Overview of the typical repository structure:
````
src/
├─ app/
│  ├─ components/        # reusable components
│  ├─ pages/             # pages/routes (login, dashboard, tickets)
│  ├─ services/          # services for API calls
│  ├─ guards/            # auth guards
│  ├─ interceptors/      # TokenInterceptor, LoadingInterceptor
│  ├─ models/            # interfaces / types
│  ├─ shared/            # shared modules and utilities
│  ├─ app.config.ts      # providers (interceptors, router)
│  ├─ app.module.ts
│  └─ main.ts
├─ assets/
├─ environments/
│  ├─ environment.ts
│  └─ environment.prod.ts
├─ styles.css
└─ index.html

Other files:
- angular.json
- package.json
- tsconfig.json
- README.md
````

## 👨‍💻 Author
- Name: Jonathan Oliveira
- Contact: devjoliveira@gmail.com

Final notes:
- Update the endpoints, author and environment variables sections according to your real project.
- Check src/environments to point the API URL and other settings.
