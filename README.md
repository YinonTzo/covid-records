# spring-boot-covid-records
This is a Spring Boot project for saving records in a PostgreSQL database and retrieving them using Docker Compose and Postman.

# Running the Project
You can run this project using either docker compose or localhost. </br>

<h3><b>Docker Compose:</b> Use the following commands: </h3>
<ul>
<li>Start: <code>docker compose up</code> </li>
</ul>

<h3><b>localhost:</b> Use the following commands: </h3>
<ol>
<li>Create a database called <code>covidb</code>.</li>
<li>Run the project with the regular configurations.</li>
</ol>

Once the project up and running, let's register some citizens.</br>

From Postman, send a **POST** request to the user service:
<ul>
<li>URL: <code>http://localhost:8080/user</code> </li>
<li>and the body request (as json):</li>
<code>
    {</br>
        "firstName": "David",</br>
        "lastName": "Maman",</br>
        "birthDate": "1910-03-10",</br>
        "city": "Jerusalem",</br>
        "address": "Kiryat Yovel",</br>
        "cellularPhone": "052-7777777",</br>
        "infected": false,</br>
        "previousConditions": [</br>
        { "previousCondition": "Diabetes" },</br>
        { "previousCondition": "J6pd" },</br>
        { "previousCondition": "Allergies" }</br>
    ]</br>
    }
</code>
</ul>

You should receive a response with status 201 (Created) and the user details.</br>

Now, let's retrieve some data. Send a **GET** request to the user service: <br>
<ul>
<li>URL: <code>http://localhost:8080/user</code> </li>
</ul>

You should receive a response with status 200 (OK) and all the users.

To retrieve specific user, send a **GET** request to the following URL: 
<li> URL: <code>http://localhost:8080/user/byId/1</code> </li>
You should receive a response containing the user with id 1.

To view all the users between dates, send a **GET** request to the following URL:
<li>URL: : <code>http://localhost:8080/user/betweenDates</code> </li>
<li>
    and the params: <br>
    <code>startDate = 1900-01-01</code> </br>
    <code>endDate = 2000-01-01</code>
</li>
<li>The complete URL will be: <code>http://localhost:8080/user/betweenDates?startDate=1900-01-01&endDate=2000-01-01</code> </li>

You should receive a response containing the all users between 1900-01-01 and 2000-01-01.

The last endpoint, to retrieve users by city, send a **GET** request to the following URL:
<li>
    <code>http://localhost:8080/user/byCity/Jerusalem</code>
</li>
You should receive a response the all users who live in Jerusalem.

# Build and push

To build and push the service, follow these steps:
1) run <code>mvn clean install</code> to build the project.
2) Use the command <code>docker build -t  yourusername/covid:0.0.1 .</code>, replacing <code>yourusername</code>
   with your Docker Hub username.
3) Finally, you can run the project using Docker Compose, as mentioned earlier.