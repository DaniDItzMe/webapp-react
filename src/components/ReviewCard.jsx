export default function ReviewCard({ review, PrintStars }) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{review.name}</h5>
          <p className="card-text">{review.text}</p>
          <p>
            <strong>Vote: </strong>
            {PrintStars(review.vote)}
          </p>
        </div>
      </div>
    </>
  );
}
