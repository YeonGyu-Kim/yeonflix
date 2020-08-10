import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => (
  <>
    <Helmet>
      <title>TV | Yeonflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        <Helmet>
          <title>TV | Yeonflix</title>
        </Helmet>
        {topRated && topRated.length > 0 && (
          <Section
            title="Top Rated Shows "
            children={topRated.map((tv) => (
              <Poster
                key={tv.id}
                id={tv.id}
                imageUrl={tv.poster_path}
                title={tv.original_name}
                rating={tv.vote_average}
                year={tv.first_air_date.substring(0, 4)}
                isMovie={false}
              />
            ))}
          />
        )}
        {popular && popular.length > 0 && (
          <Section
            title="Popular Shows "
            children={popular.map((tv) => (
              <Poster
                key={tv.id}
                id={tv.id}
                imageUrl={tv.poster_path}
                title={tv.original_name}
                rating={tv.vote_average}
                year={tv.first_air_date.substring(0, 4)}
                isMovie={false}
              />
            ))}
          />
        )}
        {airingToday && airingToday.length > 0 && (
          <Section
            title="Airing Today "
            children={airingToday.map((tv) => (
              <Poster
                key={tv.id}
                id={tv.id}
                imageUrl={tv.poster_path}
                title={tv.original_name}
                rating={tv.vote_average}
                year={tv.first_air_date.substring(0, 4)}
                isMovie={false}
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

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
