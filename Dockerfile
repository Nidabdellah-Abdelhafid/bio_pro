FROM openjdk:8


EXPOSE 8080

# Build  app
ADD target/app-biomedicale-0.0.1-SNAPSHOT.jar app-biomedicale-0.0.1-SNAPSHOT.jar

# Set command to serve Angular app
ENTRYPOINT [ "java" ,"-jar", "/app-biomedicale-0.0.1-SNAPSHOT.jar"]
