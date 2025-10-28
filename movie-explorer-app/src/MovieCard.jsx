import FavoriteIcon from "@mui/icons-material/Favorite";

function MovieCard(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="movieCard">
      <h1>title</h1>
      <img src="https://placehold.co/400x300" />
      <p>release date</p>
      <p>genre</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        inventore, reprehenderit maiores doloribus vitae ducimus ullam placeat
        minus voluptatibus consectetur, accusantium, fugit fugiat magnam eius
        quas dolorum explicabo aut dignissimos.
      </p>
      <button onClick={handleClick}>
        <FavoriteIcon />
      </button>
    </div>
  );
}

export default MovieCard;
