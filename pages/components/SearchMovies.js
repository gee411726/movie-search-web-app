import { useCallback, useRef, useState, useEffect } from 'react'
import Link from 'next/link';
import styles from './search-movies.module.css';
import { TextField, InputAdornment } from '@material-ui/core/';
import TheatersIcon from '@material-ui/icons/Theaters';
import MovieCardsDisplay from './MovieCardsDisplay';


export default function SearchMovies() {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])
  const apiKey = '386ae4ef5541173d14d957ce09a099a5';

  /* for now manually update configProps ... baseUrl and such for images... improvement, figure out how to automate every few days later
  let configProps;
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then(res => res.json())
    .then(function(json) {
      configProps = json.images;
      console.log("config props value: ", configProps)
    }) 
  }, [])
  */ 
 const configProps = {"images":{"base_url":"http://image.tmdb.org/t/p/","secure_base_url":"https://image.tmdb.org/t/p/","backdrop_sizes":["w300","w780","w1280","original"],"logo_sizes":["w45","w92","w154","w185","w300","w500","original"],"poster_sizes":["w92","w154","w185","w342","w500","w780","original"],"profile_sizes":["w45","w185","h632","original"],"still_sizes":["w92","w185","w300","original"]},"change_keys":["adult","air_date","also_known_as","alternative_titles","biography","birthday","budget","cast","certifications","character_names","created_by","crew","deathday","episode","episode_number","episode_run_time","freebase_id","freebase_mid","general","genres","guest_stars","homepage","images","imdb_id","languages","name","network","origin_country","original_name","original_title","overview","parts","place_of_birth","plot_keywords","production_code","production_companies","production_countries","releases","revenue","runtime","season","season_number","season_regular","spoken_languages","status","tagline","title","translations","tvdb_id","tvrage_id","type","video","videos"]}


  const searchEndpoint = (query) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
  
  const onChange = useCallback((event) => { // Integrate AbortController to cancel ongoing requests when new change https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
      .then (res => res.json())
      .then (res => {
        setResults(res.results)
      })
    } else {
      setResults([])
    }
  })

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <> 
      <div
        className={styles.container}
        ref={searchRef}
      >
        <TextField
          className={styles.search}
          onChange={onChange}
          onFocus={onFocus}
          placeholder='Search movies'
          type="text"
          value={query}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TheatersIcon />
              </InputAdornment>
            )
          }}
        />
          {active && results.length > 0 && (
            <ul className={styles.results}>
              {results.slice(0,5).map(({ id, title }) => ( // Change results based on ours
                <li className={styles.result} key={id}> {title} </li>
              ))}
              <li className={styles.result}>
                <Link href="">See complete results</Link> {/* Update this later */}
              </li>
            </ul>
          )}

        </div>

        {results.length > 0 && (
            <MovieCardsDisplay {...{...results, ...configProps}}/>  
        )}

    </>
    
  )
}