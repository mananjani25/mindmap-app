# MindMap AI Project

This is an AI-powered platform for test creation, document processing, and mind map generation. The project is fully containerized using Docker for easy setup and development.

## Architecture
- **Frontend**: Next.js
- **Backend**: FastAPI (Python)
- **GraphQL API**: Hasura
- **Database**: PostgreSQL

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Git](https://git-scm.com/)
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)

---

## 🚀 Getting Started

Follow these steps to get the entire application running on your local machine.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mindmap-app
```

### 2. Configure Environment Variables
The project uses `.env` files to manage environment-specific variables. We provide example files to get you started.

**A. Backend Configuration**
```bash
cp backend/.env.example backend/.env
```
*(The default values in `backend/.env` are already configured for the Docker environment and usually don't need changes.)*

**B. Frontend Configuration**
```bash
cp frontend/.env.local.example frontend/.env.local
```
*(The default values in `frontend/.env.local` are also configured for Docker and shouldn't need changes unless you modify the Hasura admin or JWT secrets.)*

### 3. Build and Run the Application
This single command will build the Docker images for all services and start them in the background.
```bash
docker-compose up -d --build
```
- `--build`: Forces a build of the images on the first run.
- `-d`: Runs the containers in detached mode.

To see the logs for all services, you can run: `docker-compose logs -f`

### 4. Apply Hasura Migrations and Metadata
After the containers are running, you need to apply the database schema and Hasura metadata.

Navigate to the `hasura` directory:
```bash
cd hasura
```
Now, run the following commands. The admin secret is pre-filled from your `docker-compose.yml` file.
```bash
# Apply database migrations
hasura migrate apply --endpoint http://localhost:8080 --admin-secret 83ab881d73f4a5ff47b6a856a03aea22967efef99e75590cf9cc13f973a54837

# Apply Hasura metadata
hasura metadata apply --endpoint http://localhost:8080 --admin-secret 83ab881d73f4a5ff47b6a856a03aea22967efef99e75590cf9cc13f973a54837
```
This will set up all the tables and relationships in Hasura.

### 5. Verification
Your entire development environment should now be running! You can access the different parts of the application at these URLs:

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Hasura Console**: [http://localhost:8080](http://localhost:8080)
- **Backend API Docs**: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

---

## Development Workflow
- To stop all services: `docker-compose down`
- To stop and remove the database volume (deletes all data): `docker-compose down -v`

