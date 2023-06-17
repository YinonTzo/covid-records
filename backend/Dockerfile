FROM openjdk:17

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} covid.jar

ENTRYPOINT ["java", "-jar", "./covid.jar"]

EXPOSE 8080