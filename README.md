# NeatAir-FullStack-App
Neat Airlines Web Application

![Home Page](imgs/Home-Page.png)

Flight Tracker emphasizes my interest in aviation. This Full Stack Application allows for the tracking of flights (via Flight Number), and user functionality to browse airline fleets, and choose favorite crafts from airline fleets.

# Technologies Used
Javascript, HTML, CSS, LIQUID, and MONGOOSE

# User Story
- User should be able to track a flight (via flight number)
- User should be able to view Airline aircraft fleets
- User should be able to create an account
- User should be able to Log In
- User should be able to Input favorite Airline (livery), Aircraft Manufacturer and model
- User should be able to access favorited aircrafts by additional users

# Wireframes

Tracker Page

![Tracker Page](imgs/Tracker-Page.png)

Sign Up

![Sign Up](imgs/Sign-Up.png)

Log In

![Log In](imgs/Login.png)

Favorites

![Favorites](imgs/Favorites.png)

# Route Tables

Favorited Planes

| **URL**          | **HTTP Verb**|**Action**|
|---------------------|--------------|----------|
| /airplanes/         | GET          | index  
| /airplanes/new      | GET          | show       
| /airplanes/new      | GET          | new   
| /airplanes          | POST         | create   
| /airplanes/:id/edit | GET          | edit       
| /airplanes/:id      | PUT          | update    
| /airplanes/:id      | DELETE       | destroy  

Flight Tracker

| **URL**          | **HTTP Verb**|**Action**|
|-----------------------|--------------|----------|
| /tracker/             | GET          | new  
| /tracker/history      | GET          | show  

Users       

| **URL**          | **HTTP Verb**|**Action**|
|-----------------------|--------------|----------|
| /users/signup         | GET          | new  
| /users/signup         | POST         | create   
| /users/login          | GET          | login  
| /users/login          | POST         | create  
| /users/logout         | DELETE       | destroy

# ERD

![ERD](imgs/ERD.png)