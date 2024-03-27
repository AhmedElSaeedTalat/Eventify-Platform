## Table of contents
1. [Description](#description)
2. [Services provided](#services-provided)
3. [Routes](#routes)
4. [Technologies](#technologies)
5. [Installation](#installation)
6. [Author](#author)

## Description:
Back-end for the project Eventify. connection to database including redis, and mongodb included
to store users' and events information and to maintain the sessions for the users. new events get stored in
Mongodb with the options to get updated.

## Services provided
- Authentication system to validate users.
- New Events insertion.
- Options for the user to attend different events or remove attendance
besed on the user desire.
- Filteration features based on the event category and price of the event.
- Search feature to search event by location or name using db, or search by date
using sort and search algorithm.
- A test feature is included to test different cases using Mocha and chai packages.

## Routes
- /api-docs: the main route used to show the details of the api endpoints used.
Swagger package is used to facilitate the display of the end points used in a
detatiled way, including expected request parameters and response content.
  

## Technologies
**A list of technologies used within the project:**  
* Express
* REDIS
* Mongodb

## Installation
$ Clone the repository: `git clone https://github.com/AhmedElSaeedTalat/Eventify-Platform.git`  
$ Move to the project directory: `cd Eventify-Platform/back-end`  
$ Run the app: `npm run start-server`


## Author:
Ahmed Talat [Github](https://github.com/AhmedElSaeedTalat) | [twitter](https://twitter.com/AhmedElsaeed105)
Oussama [Github](https://github.com/Oussama-hamdi)
Mary [Github](https://github.com/Marynyamu)
