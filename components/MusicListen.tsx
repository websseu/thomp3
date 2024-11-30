import React from "react";
import clsx from "clsx";
import { SiApplemusic, SiSpotify, SiYoutubemusic } from "react-icons/si";

type MusicListenProps = {
  youtubeID?: string;
  spotifyID?: string;
  appleID?: string;
};

export default function MusicListen({
  youtubeID,
  spotifyID,
  appleID,
}: MusicListenProps) {
  return (
    <div className="music__listen">
      <span
        onClick={() =>
          youtubeID
            ? window.open(
                `https://www.youtube.com/watch?v=${youtubeID}`,
                "_blank"
              )
            : null
        }
        className={clsx(
          "music__click",
          youtubeID
            ? "cursor-pointer text-[#ff0033] hover:border-[#ff0033]"
            : "cursor-not-allowed"
        )}
      >
        <SiYoutubemusic />
      </span>
      <span
        onClick={() =>
          spotifyID
            ? window.open(
                `https://open.spotify.com/track/${spotifyID}`,
                "_blank"
              )
            : null
        }
        className={clsx(
          "music__click",
          spotifyID
            ? "cursor-pointer text-[#1ACF5A] hover:border-[#1ACF5A]"
            : "cursor-not-allowed"
        )}
      >
        <SiSpotify />
      </span>
      <span
        onClick={() =>
          appleID
            ? window.open(
                `https://music.apple.com/kr/song/${appleID}`,
                "_blank"
              )
            : null
        }
        className={clsx(
          "music__click",
          appleID
            ? "cursor-pointer text-[#fb4f67] hover:border-[#fb4f67]"
            : "cursor-not-allowed"
        )}
      >
        <SiApplemusic />
      </span>
    </div>
  );
}
