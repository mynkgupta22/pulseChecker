# PulseCheck – Team Activity & Collaboration Tracker

PulseCheck is a fullstack web application that helps tech teams track and visualize their collaborative activities. It provides insights into team health by monitoring various metrics like commits, PRs, messages, and blockers.

## Project Structure

### Frontend (React + Vite)
```
pulseChecker-Frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/        # Layout components (Sidebar, Navbar)
│   │   ├── teams/         # Team-related components
│   │   └── ui/           # Base UI components
│   ├── contexts/          # React contexts (Auth)
│   ├── pages/             # Page components
│   └── services/          # API service layers
└── package.json
```

### Backend (Spring Boot)
```
pulseChecker-Backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com.misogi.pulseChecker/
│       │       ├── config/      # Configurations (Security, JWT)
│       │       ├── controller/  # REST endpoints
│       │       ├── model/       # Entity classes
│       │       ├── repository/  # Data access layer
│       │       └── service/     # Business logic
│       └── resources/
│           └── application.properties
└── pom.xml
```

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **UI Components**: Radix UI + Tailwind CSS
- **HTTP Client**: Axios
- **Authentication**: JWT with secure localStorage

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT (jjwt)
- **Build Tool**: Maven
- **API Documentation**: Swagger/OpenAPI

## Core Features

### 1. Authentication & Authorization
- Secure signup/login with email
- JWT-based authentication
- Role-based access control
- Token refresh mechanism

### 2. Team Management
- Create new teams
- Join existing teams via invite code
- Team member management (add/remove)
- Team creator privileges

### 3. Activity Tracking
- Simulated GitHub activity (commits, PRs)
- Simulated Slack messages
- Blocker/help flags
- Activity categorization

### 4. Analytics & Visualization
- Team-level metrics
- Individual contribution stats
- Time-based trend analysis
- Activity gap detection

## Setup & Installation

### Frontend
1. Navigate to frontend directory:
   ```bash
   cd pulseChecker-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

### Backend
1. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/pulsecheck
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. Build and run:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Authentication
- `POST /authenticate` - Login
- `POST /register` - Register new user

### Team Management
- `POST /register-team` - Create new team
- `POST /join-team/{teamCode}` - Join team
- `GET /users/get-team-details` - Get team details
- `DELETE /team/{teamId}/users/{userId}` - Remove team member

### Activity
- `GET /activity/trends` - Get activity trends
- `GET /activity/metrics` - Get team metrics
- `POST /activity/simulate` - Simulate activity

## Deployment & CI/CD

### Frontend Deployment
- Deployed on Netlify
- Automatic deployments on push to main branch
- Environment variables configured in Netlify dashboard

### Backend Deployment
- Hosted on AWS EC2 instance
- Containerized using Docker
- Docker image available on Docker Hub

### CI/CD Pipeline
- GitHub Actions workflow for backend automation
- Automated testing and building
- Docker image build and push to Docker Hub
- Automatic deployment to EC2 instance

```yaml
# Backend CI/CD workflow overview
name: Backend CI/CD
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build with Maven
        run: mvn clean package
      - name: Build & Push Docker image
        run: |
          docker build -t your-repo/pulsecheck .
          docker push your-repo/pulsecheck
      - name: Deploy to EC2
        run: |
          # Deploy using SSH and Docker
          ssh user@ec2-instance "docker pull your-repo/pulsecheck && docker-compose up -d"
```

## Security

- JWT-based authentication
- CORS configuration
- Password encryption
- Role-based access control
- XSS protection

## Future Enhancements

1. Real GitHub/Slack integration
2. Advanced analytics
3. Custom activity categories
4. Team performance benchmarks
5. Notification system

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Note
- All endpoints require JWT except signup/login.
- Only team creator can remove members or rename team.
