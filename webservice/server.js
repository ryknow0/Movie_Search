const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
//const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTNkNDAxNzMwNDI0MWI4OTBhMzQ1ZGE3M2NmODhhYiIsInN1YiI6IjY2NDQxMWM4MzlhNjgxNDQ2Yjc3ZGE2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANMDMd6PMuJLFNrU_Lt-N8vGQRTO0lEJdHlqrEMt9fI';

app.use(express.static(path.join(__dirname, 'dist')));

//Working Curl
//curl -X GET 'http://localhost:3000/movies?search=Toy%20Story'
//Browser test
//http://localhost:3000/movies?search=Toy%20Story
app.get('/api/movies', async (req, res) => {
  try {
    const title = req.query.search;
    //Check for empty search string
    if (!title) {
      return res.status(400).json({ error: 'Search parameter "title" is required' });
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ${process.env.API_KEY}'
      }
    };


    const response = await fetch(url, options);
    const data = await response.json();
    //check response for empty value
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No movies found' });
    }

    const movies = data.results.slice(0, 10).map(movie => ({
      movie_id: movie.id,
      title: movie.title,
      poster_image_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      popularity_summary: `${movie.popularity} out of ${movie.vote_count}`
    }));

    res.json(movies);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

