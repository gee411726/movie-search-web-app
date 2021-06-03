import MovieCard from './MovieCard';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './search-movies.module.css';


export default function MovieCardsDisplay(props) {

  const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  }
  
  const moviesArr = Object.keys(props).map(function(key) {
    return props[key]
  });  

  const moviesChunks = chunk(moviesArr, 4)
  const rows = moviesChunks.map((movieChunk, index) => {
    const moviesCols = movieChunk.map((movie, index) => {
      return (
        <Col xs="6" md="3" key={movie.id}>
            <MovieCard {...{...movie, ...props.images }} key={movie.id}/>
        </Col>
      )
    });
    return <Row key={index}>{moviesCols}</Row>
  });

  return (
    <div styles={{height: '300px'}}>
      <Container>
        {rows}
      </Container>
    </div>
  )
}