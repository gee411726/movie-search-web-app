import styles from '../styles/Home.module.css';
import movieStyles from './movies.module.css';
import { useCallback, useState } from 'react';
import MovieCardsDisplay from './components/MovieCardsDisplay';
import GenreDropdown from './components/GenreDropdown';
import 'react-dropdown/style.css';
import { configProps, apiKey } from './config';


export default function HighestRated() {
  const [results, setResults] = useState([]);
  const [genreId, setGenre] = useState('');
  const searchEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_genres=${genreId}&region=US`

  const onSelectGenre = useCallback((genreId) => {
    setGenre(genreId);
    console.log(genreId)
  }, [])


  try {
    fetch(searchEndpoint)
    .then(res => res.json())
    .then(json => setResults(json.results))
  } catch (error) { console.log('error: ', error); }

  
  return (
    <> 
      <main className={styles.main}>
        <h1 className={styles.title}>
          Most Popular Movies by Genre
        </h1>
        <GenreDropdown onChange={onSelectGenre} placeholder={"please select a placeholder"} className={movieStyles.search}/> 
        {results.length > 0 && (
        <MovieCardsDisplay {...{...results, ...configProps}}/> )}
      </main>
   </>
  )
}