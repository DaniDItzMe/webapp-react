import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import Alert from "../components/Alert";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    vote: 1,
    text: "",
  });

  const [isValid, setIsValid] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = () => {
    axios
      .get("http://localhost:3333/api/movies/" + id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err.message));
  };

  const RenderReviews = () => {
    return movie.reviews?.map((review) => (
      <ReviewCard key={review.id} review={review} PrintStars={PrintStars} />
    ));
  };

  const average = () => {
    const votes = movie.reviews?.map((review) => {
      return review.vote;
    });

    return votes?.length
      ? votes.reduce((sum, n) => sum + n, 0) / votes.length
      : 0;
  };

  const PrintStars = (vote) => {
    return Array.from({ length: vote }).map((vote, index) => (
      <span key={index}>★</span>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.text) {
      if (formData.vote < 1 || formData.vote > 5) {
        setAlertMessage("Vote must be between 1 and 5");
        setIsValid(false);
        return;
      }

      axios
        .post(
          "http://localhost:3333/api/movies/reviews",
          { ...formData, movieId: id },
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then(() => {
          setAlertMessage("Review added successfully");
          setIsValid(true);
          setFormData({
            name: "",
            vote: 0,
            text: "",
          });
          fetchMovie();
        })
        .catch((err) => {
          console.error(err.message);
          setAlertMessage("Error adding review");
          setIsValid(false);
        });
    } else {
      setAlertMessage("Please fill all the fields");
      setIsValid(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn btn-dark absolute top-0 start-10 translate-middle-x mt-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>
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

      <div className="card my-3">
        <h3 className="card-header">Leave a Review</h3>
        <div className="card-body">
          {!isValid && (
            <Alert
              message={alertMessage}
              type={isValid ? "success" : "danger"}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Insert your name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="vote" className="form-label">
                Vote
              </label>
              <input
                type="number"
                className="form-control"
                id="vote"
                name="vote"
                placeholder="Insert your vote"
                min="1"
                max="5"
                onChange={handleChange}
                value={formData.vote}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                id="text"
                name="text"
                placeholder="Insert your comment"
                rows="3"
                onChange={handleChange}
                value={formData.text}
              ></textarea>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button type="submit" className="btn btn-light w-75">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr />

      <div className="d-flex flex-column gap-3">{RenderReviews()}</div>
    </>
  );
}
