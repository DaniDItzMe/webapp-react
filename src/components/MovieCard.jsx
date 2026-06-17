import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const MoveToDetails = () => {
    navigate("/movieDetails/" + movie.id);
  };

  return (
    <div
      className="card"
      style={{ width: "18rem" }}
      data-bs-theme="dark"
      onClick={MoveToDetails}
    >
      {movie.image && (
        <img
          src={movie.image}
          className="card-img-top"
          alt={movie.title}
          style={{ aspectRatio: "2/3", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h4 className="card-title text-center">{movie.title}</h4>

        <p>
          <strong>Genre: </strong>
          {movie.genre}
        </p>

        <p className="card-text">{movie.abstract}</p>
      </div>
    </div>
  );
}
