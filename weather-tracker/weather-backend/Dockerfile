FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy Pipfile and Pipfile.lock
COPY Pipfile* ./

# Install pipenv and dependencies
RUN pip install --no-cache-dir pipenv && \
    pipenv install --deploy --system && \
    pip uninstall -y pipenv virtualenv-clone virtualenv

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 5001

# Start the application
CMD ["python", "app.py"] 