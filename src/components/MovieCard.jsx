import { IMG_CDN_URL } from "../utils/Constants";
const MovieCard = ({ title, posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt={title} src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
