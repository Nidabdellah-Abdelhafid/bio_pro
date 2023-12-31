# Stage 1: Build frontend
FROM jhipster/jhipster:v7.9.3 as frontend
WORKDIR /app
COPY package.json .
COPY src/main/webapp .
RUN npm install && npm run webpack:prod

# Stage 2: Build backend
FROM jhipster/jhipster:v7.9.3 as backend
WORKDIR /app
COPY . .
RUN ./mvnw -Pprod package -DskipTests

# Stage 3: Create final image
FROM jhipster/jhipster:v7.9.3
WORKDIR /app
COPY --from=backend /app/target/*.jar app-biomedicale-lt.jar
COPY --from=frontend /app/dist/ /app/src/main/resources/static/

# Expose the port your application will run on
EXPOSE 8080

# Set the entry point to run the application
CMD ["java", "-jar", "app-biomedicale-lt.jar"]
