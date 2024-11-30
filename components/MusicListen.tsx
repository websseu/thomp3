import React from "react";
import { SiApplemusic, SiSpotify, SiYoutubemusic } from "react-icons/si";

interface MusicListenProps {
  youtubeID?: string;
  spotifyID?: string;
  appleID?: string;
}

const MusicListen: React.FC<MusicListenProps> = ({
  youtubeID,
  spotifyID,
  appleID,
}) => {
  return (
    <div className="music__listen">
      {/* YouTube 버튼 */}
      <span
        onClick={() =>
          youtubeID &&
          window.open(`https://www.youtube.com/watch?v=${youtubeID}`, "_blank")
        }
        className={`music__click ${
          youtubeID
            ? "cursor-pointer text-[#ff0033] hover:border-[#ff0033]"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        <SiYoutubemusic />
      </span>

      {/* Spotify 버튼 */}
      <span
        onClick={() =>
          spotifyID &&
          window.open(`https://open.spotify.com/track/${spotifyID}`, "_blank")
        }
        className={`music__click ${
          spotifyID
            ? "cursor-pointer text-[#1ACF5A] hover:border-[#1ACF5A]"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        <SiSpotify />
      </span>

      {/* Apple Music 버튼 */}
      <span
        onClick={() =>
          appleID &&
          window.open(`https://music.apple.com/kr/song/${appleID}`, "_blank")
        }
        className={`music__click ${
          appleID
            ? "cursor-pointer text-[#fb4f67] hover:border-[#fb4f67]"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        <SiApplemusic />
      </span>
    </div>
  );
};

export default MusicListen;
