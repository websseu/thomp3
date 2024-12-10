import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

type MusicListProps = {
  ranking: number;
  image: string;
  title: string;
  artist: string;
  youtubeID?: string;
  videoId?: string | null;
  handleMusicPlay: (youtubeID: string) => void;
  isYoutubeAdd?: boolean;
};

const MusicList = ({
  ranking,
  image,
  title,
  artist,
  youtubeID,
  videoId,
  handleMusicPlay,
  isYoutubeAdd = false,
}: MusicListProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPlaying = videoId === youtubeID;

  return (
    <li
      className="music__list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => youtubeID && handleMusicPlay(youtubeID)}
    >
      <span className="ranking">{ranking}</span>
      <div className="image relative">
        <img
          src={image}
          alt={title}
          width={50}
          height={50}
          className="rounded-md"
        />
        {youtubeID && (isHovered || isPlaying) && (
          <button
            className={`music__play absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isPlaying ? "opacity-100" : "opacity-85"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // 부모의 클릭 이벤트 전파 방지
              handleMusicPlay(youtubeID);
            }}
          >
            <FaPlay />
          </button>
        )}
      </div>
      <div className="title">
        <p>{title}</p>
        <p>{artist}</p>
      </div>

      {isYoutubeAdd && (
        <div className="music__listen">
          <span
            onClick={() =>
              youtubeID &&
              window.open(
                `https://www.youtube.com/watch?v=${youtubeID}`,
                "_blank"
              )
            }
            className={`music__click ${
              youtubeID
                ? "cursor-pointer text-[#ff0033] hover:border-[#ff0033]"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <SiYoutubemusic />
          </span>
        </div>
      )}
    </li>
  );
};

export default MusicList;
