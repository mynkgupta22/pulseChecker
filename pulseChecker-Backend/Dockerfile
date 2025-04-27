# Use adoptopenjdk for the JRE
FROM eclipse-temurin:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the container
COPY target/*.jar app.jar

# Specify the command to run on container start
CMD ["java", "-jar", "app.jar"]

