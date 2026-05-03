# Use a slim Python image for a smaller footprint
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Set environment variables
ENV ENVIRONMENT=production
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
# We use 0.0.0.0 so it can be reached from outside the container
CMD ["python", "main.py"]
