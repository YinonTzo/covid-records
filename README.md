# spring-boot-covid-records
This is a Spring Boot project for saving records in a PostgreSQL database and retrieving them using Docker Compose and Postman.

# Running the Project
You can run this project using either docker compose or localhost. </br>

### Docker Compose: Use the following commands: 
- Start: ```docker compose up``` 


### localhost: Use the following commands:
- Create a database called ```covidb```.
- Run the project with the regular configurations.


Once the project up and running, let's register some citizens.</br>

From Postman, send a **POST** request to the user service:

- URL: ```http://localhost:8080/user```
- and the body request (as json):

    ```json
    {
      "firstName": "David",
      "lastName": "Maman",
      "dateOfBirth": "1910-03-10",
      "city": "Jerusalem",
      "address": "Kiryat Yovel",
      "cellularPhone": "052-7777777",
      "landline": "02-555555",
      "infected": false,
      "zipCode": "945175",
      "previousConditions": [
        { "previousCondition": "a" },
        { "previousCondition": "b" },
        { "previousCondition": "c" }
      ]
    }
    ```
  
You should receive a response with status 201 (Created) and the user details.</br>

Now, let's retrieve some data. Send a **GET** request to the user service: <br>
- URL: ```http://localhost:8080/user```

You should receive a response with status 200 (OK) and all the users.

To retrieve specific user, send a **GET** request to the following URL: 
-  URL: ```http://localhost:8080/user/byId/1```
You should receive a response containing the user with id 1.

To view all the users between dates, send a **GET** request to the following URL:
- URL: : ```http://localhost:8080/user/betweenDates```
-
    and the params: <br>
    ```startDate = 1900-01-01``` </br>
    ```endDate = 2000-01-01```

- The complete URL will be: ```http://localhost:8080/user/betweenDates?startDate=1900-01-01&endDate=2000-01-01```

You should receive a response containing the all users between 1900-01-01 and 2000-01-01.

The last endpoint, to retrieve users by city, send a **GET** request to the following URL:
- ```http://localhost:8080/user/byCity/Jerusalem```
You should receive a response the all users who live in Jerusalem.

# Build and push

To build and push the service, follow these steps:
1) run ```mvn clean install``` to build the project.
2) Use the command ```docker build -t  yourusername/covid:0.0.1 .```, replacing ```yourusername```
   with your Docker Hub username.
3) Push the container to Docker Hub using ```docker push -t yourusername/covid:0.0.1```,
   This will make it available for Kubernetes to pull.
4) Finally, you can run the project using Docker Compose, as mentioned earlier.
