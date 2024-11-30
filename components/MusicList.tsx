import Image from "next/image";
import { FaPlay } from "react-icons/fa";

type MusicListProps = {
  ranking: number;
  image: string;
  title: string;
  artist: string;
  youtubeID?: string;
  videoId?: string | null;
  handleMusicPlay: (youtubeID: string) => void;
};

const MusicList = ({
  ranking,
  image,
  title,
  artist,
  youtubeID,
  videoId,
  handleMusicPlay,
}: MusicListProps) => {
  return (
    <li className="music__list">
      <span className="ranking">{ranking}</span>
      <div className="image">
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className="rounded-md"
        />
        {youtubeID && (
          <button
            className={`music__play ${
              videoId === youtubeID ? "opacity-100" : ""
            }`}
            onClick={() => handleMusicPlay(youtubeID)}
          >
            <FaPlay />
          </button>
        )}
      </div>
      <div className="title">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
    </li>
  );
};

export default MusicList;
