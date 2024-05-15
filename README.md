# Movie_Search
##Project Description
Vue.js client and Express.js server application to query TMDB database

##Repository
https://github.com/ryknow0/Movie_Search.git


##Webservice - Backend

1. Clone the repository using the URL above for the Github repo.

2. Navigate to the webservice directory under the project root that stores the files for the backend.
    ```cd webservice```

3. Install the dependecies
    ``` npm install```
4. Create a '.env' file in the webservice directory and add your TMDB API key:
    ```API_KEY=your_tmdb_api_key```
5. Start the backend server
    ```npm start```
6. The backend server should now be running on http://localhost:3000

##Webapp - Front End

1. Navigate to the front end directory from the project root
```cd webapp```
2. Install the dependecies
    ``` npm install```
3. Start the server
``` npm run dev```
4. Vite will tell you the port the application is running on

##Usage
1. Enter a movie title in the search input box
2. Click the search button.
3. The application will display up to 10 results related to the search input.
