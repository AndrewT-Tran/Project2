# Weather Tracking Application

## Overview

The Weather Tracking Application is built as part of the Production Manager training at Revature. It provides real-time weather updates, visualizations, and alerting mechanisms using a modern tech stack.

## Tech Stack

### Frontend

- **Framework**: React + Vite
- **UI Library**: Material UI
- **State Management**: React Query
- **Authentication**: Firebase Authentication
- **HTTP Client**: Axios

### Backend

- **API Framework**: Flask
- **Weather Data**: OpenWeather API
- **Authentication**: Firebase Admin SDK
- **Package Management**: Pipenv

### Monitoring & DevOps

- **Containerization**: Docker
- **Metrics**: Prometheus
- **Visualization**: Grafana
- **Alerting**: Prometheus Alertmanager

## Features

### React Frontend

![alt text](../assets/postspark_export_2025-03-14_09-40-43.png)

- User authentication via Firebase
- Real-time weather data display
- Weather-based recommendations
- Modern UI with Material UI components
- Responsive design for all devices

### Flask Backend

![alt text](../assets/postspark_export_2025-03-14_09-42-28.png)

- RESTful API endpoints for weather data
- Firebase authentication integration
- OpenWeather API integration
- Prometheus metrics exposure
- CORS support for frontend communication

### Monitoring Stack

- **Prometheus**: Scrapes and stores weather metrics
- **Alertmanager**: Configurable weather alerts
- **Grafana**: Interactive weather dashboards

## Setup & Deployment

### Prerequisites

- Docker and Docker Compose
- Firebase account and project setup
- OpenWeather API key

### Environment Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd weather-tracker
   ```

2. Configure environment variables:

   Frontend (.env):

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Backend (.env):

   ```
   WEATHER_API_KEY=your_openweather_api_key
   PORT=5001
   ```

3. Add Firebase service account key:
   - Download `serviceAccountKey.json` from Firebase Console
   - Place it in the `weather-backend` directory

### Docker Deployment

1. Build and start all services:

   ```bash
   docker-compose up --build
   ```

2. Access the applications:
   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:5001>
   - Prometheus: <http://localhost:9090>
   - Alertmanager: <http://localhost:9093>
   - Grafana: <http://localhost:3000>

### Local Development

Frontend:

```bash
cd weather-tracker-frontend
npm install
npm run dev
```

Backend:

```bash
cd weather-backend
pipenv install
pipenv run python app.py
```

## Monitoring Setup

### Grafana

1. Access Grafana at <http://localhost:3000>
2. Default credentials:
   - Username: admin
   - Password: admin
3. Add Prometheus as a data source:
   - URL: <http://prometheus:9090>
   - Access: Server (default)

### Alertmanager

1. Configure notification channels in `alertmanager.yml`
2. Alerts will be triggered based on rules in `prometheus.yml`

## Project Structure

```
weather-tracker/
├── weather-tracker-frontend/    # React frontend
│   ├── src/                    # Source code
│   ├── Dockerfile             # Frontend container config
│   └── package.json           # Dependencies
├── weather-backend/           # Flask backend
│   ├── app.py                # Main application
│   ├── Dockerfile            # Backend container config
│   └── Pipfile              # Python dependencies
└── docker-compose.yml        # Container orchestration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- WebSocket integration for real-time updates
- Additional weather data providers
- Mobile application using React Native
- Kubernetes deployment configuration
- Enhanced analytics and forecasting

## Troubleshooting

Common issues and solutions:

1. **Docker containers not starting:**
   - Check Docker logs: `docker-compose logs`
   - Verify environment variables are set
   - Ensure ports are not in use

2. **Frontend not connecting to backend:**
   - Verify CORS configuration
   - Check API URL in frontend environment
   - Confirm backend is running

3. **Monitoring issues:**
   - Check Prometheus targets
   - Verify metrics endpoint accessibility
   - Review Grafana data source configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
