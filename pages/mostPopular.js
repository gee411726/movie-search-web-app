import styles from '../styles/Home.module.css';
import movieStyles from './movies.module.css';
import { useCallback, useState } from 'react';
import MovieCardsDisplay from './components/MovieCardsDisplay';
import YearDropdown from './components/YearDropdown';
import 'react-dropdown/style.css';
import { configProps, apiKey } from './config';


export default function HighestRated() {
  const [results, setResults] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const searchEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&region=US`

  const onSelectYear = useCallback((event) => {
    var selectedYear = event.value;
    setYear(selectedYear);
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
          Most Popular Movies by Release Year
        </h1>
        <YearDropdown onChange={onSelectYear} placeholder={"please select a placeholder"} className={movieStyles.search}/> 
        {results.length > 0 && (
        <MovieCardsDisplay {...{...results, ...configProps}}/> )}
      </main>
   </>
  )
}