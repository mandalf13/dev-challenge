import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchSimilarTitlesAsync,
  selectCurrentTitle,
  selectMediaType,
  selectTitles,
} from "../../redux/slices/titlesSlice";
import Spinner from "../spinner/Spinner";

import { IMAGES_URL } from "../../constants/config";
import star from "../../assets/star.svg";
import posterPlaceholder from "../../assets/backdrop.webp";
import "../randomizer/RandomizerStyles.scss";
import "./DetailStyles.scss";
import { getValuation } from "../../utils/helpers";

const Detail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const titles = useSelector(selectTitles);
  const mediaType = useSelector(selectMediaType);
  const title = useSelector(selectCurrentTitle);

  const overviewRef = useRef<HTMLDivElement>(null);

  const [selectedTitle, setSelectedTitle] = useState<Record<string, any>>({});

  const handleSelectedTitle = (t: Record<string, any>) => {
    setSelectedTitle(t);
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchSimilarTitles = async (mediaType: string, titleId: string) => {
    try {
      await dispatch(fetchSimilarTitlesAsync({ mediaType, titleId }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (title?.id) {
      setSelectedTitle(title);
      fetchSimilarTitles(mediaType as string, title.id);
    }
  }, [title]);

  return Object.keys(selectedTitle)?.length ? (
    <>
      <div ref={overviewRef} className="flex-container">
        <div className="poster">
          <img
            src={
              selectedTitle?.poster_path
                ? `${IMAGES_URL}w500${selectedTitle?.poster_path}`
                : posterPlaceholder
            }
            alt={selectedTitle?.title || selectedTitle?.name}
          />
        </div>
        <div className="summary">
          <div className="column">
            <h1>{selectedTitle?.title || selectedTitle?.name}</h1>
            <h4 className="media mt-1">
              {mediaType === "movie" ? "Movie" : "TV Show"}
            </h4>
            <p className="mt-1">{selectedTitle?.overview}</p>
            <div className="row g-1 mt-1">
              <img className="star" src={star} alt="Vote" />
              <span>{getValuation(selectedTitle?.vote_average)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <h1 className="mb-1">Recommended</h1>
        <div className="gallery">
          {titles
            .filter((t) => t?.poster_path)
            .map((t) => (
              <div className="card" onClick={() => handleSelectedTitle(t)}>
                <img
                  src={
                    t?.poster_path
                      ? `${IMAGES_URL}w500${t?.poster_path}`
                      : posterPlaceholder
                  }
                  alt={t?.title || t?.name}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Detail;
