import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";

const Container = styled.div`
  position: relative;
  height: calc(100vh-50px);
  width: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  width: 90vw;
  height: 100vh;
  padding: 50px;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
`;

const Data = styled.div`
  width: 50%;
  margin-left: 20px;
`;

const Title = styled.span`
  font-size: 32px;
`;

const InfoContainer = styled.div`
  margin: 10px 0px;
`;

const Info = styled.span``;

const Divider = styled.span`
  margin: 0px 20px;
`;

const Summary = styled.span`
  opacity: 0.7;
  line-height: 1.5;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70vw;
  margin-bottom: 20px;
`;

const Video = styled.iframe`
  padding: 10px 0px;
  margin-right: 10px;
  height: 30vh;
  width: 20vw;
`;
const HomePage = styled.a`
  padding: 10px;
  border: 1px solid #141414;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: #141414;
  color: white;
  font-weight: 600;
  &:hover {
    color: #141414;
    background-color: white;
    border-color: white;
  }
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Yeonflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Yeonflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPoster.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <InfoContainer>
            <Info>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Info>
            <Divider>▪</Divider>
            <Info>
              {result.runtime ? result.runtime : result.episode_run_time}ms
            </Info>
            <Divider>▪</Divider>
            <Info>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name}/`
                )}
            </Info>
            <Divider>▪</Divider>
            <Info>
              {result.vote_average}/10 <span>💖</span>
            </Info>
            <Divider>▪</Divider>
          </InfoContainer>
          <Summary>{result.overview}</Summary>
          <VideoContainer>
            {result.videos.results.map((video) => (
              <Video
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
              />
            ))}
          </VideoContainer>
          <HomePage href={result.homepage}>homepage</HomePage>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
