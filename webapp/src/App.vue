<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const movies = ref([]);
const searched = ref(false);

const searchMovies = async () => {
  searched.value = true;
  const response = await fetch(`/api/movies?search=${encodeURIComponent(searchQuery.value)}`);
  const data = await response.json();
  if (data.error) {
    movies.value = [];
  } else {
    movies.value = data;
  }
};
</script>

<template>
 <div class="main">
    <h3>Movie Search</h3>
    <form @submit.prevent="searchMovies">
      <input type="text" v-model="searchQuery" placeholder="Enter movie title">
      <input type="submit" value="Search">
    </form>
    <div v-if="movies.length > 0" class="result" v-for="movie in movies" :key="movie.id">
      <h4>{{ movie.title }}</h4>
      <img :src="movie.poster_image_url" alt="Movie Poster" class="poster">
      <p>Popularity: {{ movie.popularity_summary }}</p>
    </div>
    <div v-else-if="searched && movies.length === 0" class="result">No movies found</div>
  </div>
</template>


<style scoped>
@font-face {
  font-family: "ColfaxAI";
  src: url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff2) format("woff2"),
    url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff) format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "ColfaxAI";
  src: url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff2) format("woff2"),
    url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff) format("woff");
  font-weight: bold;
  font-style: normal;
}
.main,
.main input {
  font-size: 16px;
  line-height: 24px;
  color: #959697;
  font-family: "ColfaxAI", Helvetica, sans-serif;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}
.main h3 {
  font-size: 32px;
  line-height: 40px;
  font-weight: bold;
  color: #959697;
  margin: 16px 0 40px;
}
.main form {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.main input[type="text"] {
  padding: 12px 16px;
  border: 1px solid #10a37f;
  border-radius: 4px;
  margin-bottom: 24px;
  outline-color: #10a37f;
}
.main ::placeholder {
  color: #8e8ea0;
  opacity: 1;
}
.main input[type="submit"] {
  padding: 12px 0;
  color: #000000;
  background-color: #10a37f;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
.main .results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main .result {
  margin: 20px;
  text-align: center;
}
.main .result h4 {
  margin-bottom: 10px;
}
.main .result img {
  max-width: 200px;
  max-height: 300px;
  margin-bottom: 10px;
}
</style>