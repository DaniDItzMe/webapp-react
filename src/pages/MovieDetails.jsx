import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/movies/" + id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  const RenderReviews = () => {
    return movie.reviews?.map((review) => (
      <ReviewCard key={review.id} review={review} PrintStars={PrintStars} />
    ));
  };

  const average = () => {
    const votes = movie.reviews?.map((review) => {
      return review.vote;
    });
    console.log(votes);

    return votes?.length
      ? votes.reduce((sum, n) => sum + n, 0) / votes.length
      : 0;
  };

  const PrintStars = (vote) => {
    return Array.from({ length: vote }).map((vote, index) => (
      <span key={index}>★</span>
    ));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card p-3 d-flex flex-row gap-3">
          <img
            className="rounded"
            src={movie.image}
            alt={movie.title}
            style={{ aspectRatio: "2/3", height: "30vh" }}
          />
          <div
            className="rounded"
            style={{ width: "1px", backgroundColor: "#424549" }}
          ></div>
          <div className="d-flex flex-column justify-content-between">
            <h2>Title: {movie.title}</h2>
            <h4>Director : {movie.director}</h4>
            <h4>Genre : {movie.genre}</h4>
            <h4>Release year : {movie.release_year}</h4>
          </div>
        </div>
      </div>

      <h1 className="text-center p-3">Reviews</h1>

      <h2 className="text-center">Average votes: {PrintStars(average())}</h2>

      <div className="d-flex flex-column gap-3">{RenderReviews()}</div>
      {/* ⭐ */}
    </>
  );
}
