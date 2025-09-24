# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies needed for libraries like spacy/nltk
RUN apt-get update && apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download NLP models (based on your document_processor.py)
RUN python -m spacy download en_core_web_sm
RUN python -m nltk.downloader stopwords punkt

# Copy the rest of the backend application code from your host to your container at /app
COPY ./app /app/app

# Command to run the application
# It looks for an 'app' object inside the 'app/main.py' file
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]