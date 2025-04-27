# pulseChecker

## Features
- User authentication (JWT)
- Team creation/joining (invite code)
- Activity simulation (commits, PRs, messages, blockers)
- Team/individual metrics endpoints

## Tech Stack
- Java 17+
- Spring Boot
- PostgreSQL
- JWT (jjwt)
- Maven

## Setup

1. Set your DB credentials in `src/main/resources/application.properties`.
2. Build & run:

```
mvn spring-boot:run
```

## Endpoints Overview
- `/api/auth/signup` - Register
- `/api/auth/login` - Login (get JWT)
- `/api/team/create` - Create team
- `/api/team/join` - Join team via invite code
- `/api/activity/simulate` - Simulate activity (mock)
- `/api/activity/trends` - Get trends

## Note
- All endpoints require JWT except signup/login.
- Only team creator can remove members or rename team.
