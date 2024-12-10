"use client";

import { useEffect, useState } from "react";
import { MusicItem } from "@/constant/type";
import { useYouTubePlayer } from "@/context/YouTubePlayerContext";
import MusicList from "@/components/MusicList";

export default function Home() {
  const { setVideoId, videoId } = useYouTubePlayer();

  // 유튜브, 애플, 스포티파이 데이터 상태
  const [youtubeData, setYoutubeData] = useState<MusicItem[]>([]);
  const [appleData, setAppleData] = useState<MusicItem[]>([]);
  const [spotifyData, setSpotifyData] = useState<MusicItem[]>([]);

  // 개별 날짜 관리
  // const [youtubeDate] = useState<string>(getYesterdayDate());
  // const [appleDate] = useState<string>(getYesterdayDate());
  // const [spotifyDate] = useState<string>(getYesterdayDate());
  const [youtubeDate] = useState<string>("2024-12-10");
  const [appleDate] = useState<string>("2024-12-10");
  const [spotifyDate] = useState<string>("2024-12-10");

  // 개별 상태 관리
  const [youtubeLoading, setYoutubeLoading] = useState<boolean>(true);
  const [appleLoading, setAppleLoading] = useState<boolean>(true);
  const [spotifyLoading, setSpotifyLoading] = useState<boolean>(true);

  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [appleError, setAppleError] = useState<string | null>(null);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);

  // 유튜브 데이터 가져오기
  const fetchYoutubeData = async (date: string) => {
    setYoutubeLoading(true);
    setYoutubeError(null);
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonMusic2/youtube/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch YouTube data: ${response.statusText}`);
      }

      const data = await response.json();
      setYoutubeData(data);
    } catch (error) {
      console.log(error);
      setYoutubeError("유튜브 데이터를 가져오는 중 문제가 발생했습니다 🥵");
    } finally {
      setYoutubeLoading(false);
    }
  };

  // 애플 데이터 가져오기
  const fetchAppleData = async (date: string) => {
    setAppleLoading(true);
    setAppleError(null);
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonMusic2/apple/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Apple data: ${response.statusText}`);
      }

      const data = await response.json();
      setAppleData(data);
    } catch (error) {
      console.log(error);
      setAppleError("애플 데이터를 가져오는 중 문제가 발생했습니다 🥵");
    } finally {
      setAppleLoading(false);
    }
  };

  // 스포티파이 데이터 가져오기
  const fetchSpotifyData = async (date: string) => {
    setSpotifyLoading(true);
    setSpotifyError(null);
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonMusic2/spotify/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Spotify data: ${response.statusText}`);
      }

      const data = await response.json();
      setSpotifyData(data);
    } catch (error) {
      console.log(error);
      setSpotifyError("스포티파이 데이터를 가져오는 중 문제가 발생했습니다 🥵");
    } finally {
      setSpotifyLoading(false);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    fetchYoutubeData(youtubeDate);
  }, [youtubeDate]);

  useEffect(() => {
    fetchAppleData(appleDate);
  }, [appleDate]);

  useEffect(() => {
    fetchSpotifyData(spotifyDate);
  }, [spotifyDate]);

  // 유튜브 뮤직 플레이
  const handleMusicPlay = (youtubeID: string) => {
    if (!youtubeID) {
      console.error("YouTube ID가 없습니다.");
      return;
    }
    setVideoId(youtubeID);
  };

  return (
    <section id="mainPage">
      <h1 className="music__title">
        Top 100 Best <span>Music</span> Worldwide
      </h1>

      <div className="main__layout">
        {/* 유튜브 섹션 */}
        <div>
          <h2 className="main__title">
            <img
              src="/logo/youtube2.png"
              alt="youtube"
              width={30}
              height={30}
              className="rounded-full"
            />
            YouTube Music
          </h2>

          {youtubeLoading ? (
            <p className="music__loading">유튜브 데이터를 가져오는 중... 🤩</p>
          ) : youtubeError ? (
            <p className="music__error">{youtubeError}</p>
          ) : (
            <ul>
              {youtubeData.map((item: MusicItem, index: number) => (
                <MusicList
                  key={index}
                  ranking={item.ranking}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  youtubeID={item.youtubeID}
                  videoId={videoId}
                  handleMusicPlay={handleMusicPlay}
                />
              ))}
            </ul>
          )}
        </div>

        {/* 애플 섹션 */}
        <div>
          <h2 className="main__title">
            <img
              src="/logo/apple2.png"
              alt="apple"
              width={30}
              height={30}
              className="rounded-full"
            />
            Apple Music
          </h2>

          {appleLoading ? (
            <p className="music__loading">애플 데이터를 가져오는 중... 🤩</p>
          ) : appleError ? (
            <p className="music__error">{appleError}</p>
          ) : (
            <ul>
              {appleData.map((item: MusicItem, index: number) => (
                <MusicList
                  key={index}
                  ranking={item.ranking}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  youtubeID={item.youtubeID}
                  videoId={videoId}
                  handleMusicPlay={handleMusicPlay}
                />
              ))}
            </ul>
          )}
        </div>

        {/* 스포티파이 섹션 */}
        <div>
          <h2 className="main__title">
            <img
              src="/logo/spotify2.png"
              alt="spotify"
              width={30}
              height={30}
              className="rounded-full"
            />
            Spotify Music
          </h2>

          {spotifyLoading ? (
            <p className="music__loading">
              스포티파이 데이터를 가져오는 중... 🤩
            </p>
          ) : spotifyError ? (
            <p className="music__error">{spotifyError}</p>
          ) : (
            <ul>
              {spotifyData.map((item: MusicItem, index: number) => (
                <MusicList
                  key={index}
                  ranking={item.ranking}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  youtubeID={item.youtubeID}
                  videoId={videoId}
                  handleMusicPlay={handleMusicPlay}
                  isYoutubeAdd={false}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
