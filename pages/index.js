import Head from 'next/head';
import Image from 'next/image';
import SearchMovies from './components/SearchMovies';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Movie Search!
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <p className={styles.description}>
          Use this web app to search for movies to watch based on user ratings
        </p>

        <div>
          <SearchMovies/>
        </div>

        <div className={styles.grid}>
          <a href="/highestRated" className={styles.card}>
            <h2>Highest Rated &rarr;</h2>
            <p>View highest rated user movies</p>
          </a>

          <a href="/mostPopular" className={styles.card}>
            <h2>Most Popular &rarr;</h2>
            <p>View today's most popular movies</p>
          </a>

          <a
            href="/byGenre" className={styles.card}
          >
            <h2>By Genre &rarr;</h2>
            <p>Discover movies in your favorite Genres!</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
