import React, { useState, useEffect } from "react";
import { movieApi } from "api";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [popular, setPopular] = useState([]);
  async function getHome() {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      setNowPlaying(nowPlaying);

      const {
        data: { results: upComing },
      } = await movieApi.upComing();
      setUpComing(upComing);

      const {
        data: { results: popular },
      } = await movieApi.popular();
      setPopular(popular);
    } catch {
      setError("Cannot find movies infromation.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getHome();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>Movies | Yeonflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Helmet>
            <title>Movies | Yeonflix</title>
          </Helmet>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section
              title="Now Playing"
              children={nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            />
          )}
          {popular && popular.length > 0 && (
            <Section
              title="Popular Movies"
              children={popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            />
          )}
          {upComing && upComing.length > 0 && (
            <Section
              title="Upcoming Movies"
              children={upComing.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            />
          )}
          {error && <Message text={error} color="#ec74c3c" />}
        </Container>
      )}
      ;
    </>
  );
}
