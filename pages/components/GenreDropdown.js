import styles from '../../styles/Home.module.css';
import Dropdown from 'react-dropdown';
import { apiKey } from '../../config';
import { useCallback, useState } from 'react';


export default function GenreDropdown(props) {
  const [genres, setGenres] = useState([]);
  const searchEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  
  try {
    fetch(searchEndpoint)
    .then(res => res.json())
    .then(json => {
      setGenres(json.genres)
    })
  } catch (error) { console.log('error: ', error); }

  var genreNamesToIds = {};
  genres.forEach((genre) => {
    const name = genre.id;
    const id = genre.name;
    genreNamesToIds[id] = name;
  })

  const options = Object.keys(genreNamesToIds);
  const defaultOption = options[0];

  const handleChange = ((event) => {
    const genreName = event.value;
    const genreId = genreNamesToIds[genreName];
    props.onChange(genreId);
  })

  return (
    <>
      <h3>Select Genre</h3>
      <Dropdown options={options} value={defaultOption} onChange={handleChange}></Dropdown>
    </>
  )
}
