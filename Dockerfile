FROM openjdk:8
EXPOSE 8080
ADD target/app-biomedicale-0.0.1-SNAPSHOT.jar app-biomedicale-lt.jar
ENTRYPOINT [ "java" ,"-jar", "/app-biomedicale-lt.jar"]
