import MovieCard from './MovieCard';
import { Container, Row, Col } from 'react-bootstrap';
import movieStyles from '../movies.module.css';


export default function MovieCardsDisplay(props) {

  const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  }
  
  const moviesArr = Object.keys(props).reduce(function(movies, key) {
    if ("vote_count" in props[key]) {
      movies.push(props[key]);
    }
    return movies
  }, [])

  moviesArr.sort(function(a, b) {
    if (a.vote_average < b.vote_average) {
      return 1
    } else {
      return -1
    };
  })


  const moviesChunks = chunk(moviesArr, 4)
  const rows = moviesChunks.map((movieChunk, index) => {
    const moviesCols = movieChunk.map((movie, index) => {
      return (
        <Col xs="6" s="4" md="3" lg="3" key={movie.id}>
            <MovieCard {...{...movie, ...props.images }} key={movie.id}/>
        </Col>
      )
    });
    return <Row key={index}>{moviesCols}</Row>
  });

  return (
    <div className={movieStyles.display}>
      <Container>
        {rows}
      </Container>
    </div>
  )
}