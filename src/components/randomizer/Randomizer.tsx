import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchTitlesAsync,
  selectCurrentTitle,
  selectMediaType,
  selectTitles,
  setMediaType,
  setTitle,
} from "../../redux/slices/titlesSlice";
import { truncateString, getValuation } from "../../utils/helpers";
import Spinner from "../spinner/Spinner";

import { IMAGES_URL } from "../../constants/config";
import star from "../../assets/star.svg";
import posterPlaceholder from "../../assets/backdrop.webp";
import "./RandomizerStyles.scss";

const Randomizer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const titles = useSelector(selectTitles);
  const media = useSelector(selectMediaType);
  const title = useSelector(selectCurrentTitle);
  const titleRef = useRef(0);

  const nextTitle = async (mediaType: string) => {
    try {
      if (media === mediaType) {
        if (titleRef.current < titles.length - 1) {
          titleRef.current = titleRef.current + 1;
          dispatch(setTitle(titles[titleRef.current]));
        } else {
          titleRef.current = 0;
          await dispatch(fetchTitlesAsync(mediaType));
        }
      } else {
        dispatch(setMediaType(mediaType));
        titleRef.current = 0;
        await dispatch(fetchTitlesAsync(mediaType));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTitles = async (mediaType: string) => {
    try {
      await dispatch(fetchTitlesAsync(mediaType));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!titles?.length) {
      fetchTitles(media || "movie");
    }
  }, []);

  return Object.keys(title).length ? (
    <div className="flex-container">
      <Link to={`/detail/${title?.id}`} className="poster">
        <img
          className="img-link"
          src={
            title?.poster_path
              ? `${IMAGES_URL}w500${title?.poster_path}`
              : posterPlaceholder
          }
          alt={title?.title || title?.name}
        />
      </Link>
      <div className="summary">
        <div className="column">
          <h1>{title?.title || title?.name}</h1>
          <h4 className="media mt-1">
            {media === "movie" ? "Movie" : "TV Show"}
          </h4>
          <p className="mt-1">{truncateString(title?.overview)}</p>
          <div className="row g-1 mt-1">
            <img className="star" src={star} alt="Vote" />
            <span>{getValuation(title?.vote_average)}</span>
          </div>
          <div className="row justify-content-center g-3 mt-3">
            <button
              className="btn flex-item"
              onClick={() => nextTitle("movie")}
            >
              Movie
            </button>
            <button className="btn flex-item" onClick={() => nextTitle("tv")}>
              TV Show
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Randomizer;
