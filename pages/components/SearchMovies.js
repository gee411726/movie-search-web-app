import { useCallback, useRef, useState, useEffect } from 'react'
import Link from 'next/link';
import movieStyles from '../movies.module.css';
import { TextField, InputAdornment } from '@material-ui/core/';
import TheatersIcon from '@material-ui/icons/Theaters';
import MovieCardsDisplay from './MovieCardsDisplay';
import { apiKey, configProps } from '../../config';


export default function SearchMovies() {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

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
  const searchEndpoint = (query) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

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
        className={movieStyles.container}
        ref={searchRef}
      >
        <TextField
          className={movieStyles.search}
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
        </div>

        {results.length > 0 && (
            <MovieCardsDisplay {...{...results, ...configProps}}/>  
        )}

    </>
    
  )
}