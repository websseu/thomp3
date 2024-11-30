"use client";

import { useEffect, useState } from "react";
import { useYouTubePlayer } from "@/context/YouTubePlayerContext";
import MusicList from "@/components/MusicList";

import { LuCalendarRange } from "react-icons/lu";
import { format, subDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const { setVideoId, videoId } = useYouTubePlayer();

  // 어제 날짜로 기본값 설정
  const yesterday = subDays(new Date(), 1);

  // 유튜브, 애플, 스포티파이 데이터 상태
  const [youtubeData, setYoutubeData] = useState([]);
  const [appleData, setAppleData] = useState([]);
  const [spotifyData, setSpotifyData] = useState([]);

  // 개별 상태 관리
  const [youtubeLoading, setYoutubeLoading] = useState(true);
  const [appleLoading, setAppleLoading] = useState(true);
  const [spotifyLoading, setSpotifyLoading] = useState(true);

  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [appleError, setAppleError] = useState<string | null>(null);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);

  // 개별 날짜 관리
  const [youtubeDate, setYoutubeDate] = useState(yesterday);
  const [appleDate, setAppleDate] = useState(yesterday);
  const [spotifyDate, setSpotifyDate] = useState(yesterday);

  // 달력 표시 상태
  const [showYoutubeCalendar, setShowYoutubeCalendar] = useState(false);
  const [showAppleCalendar, setShowAppleCalendar] = useState(false);
  const [showSpotifyCalendar, setShowSpotifyCalendar] = useState(false);

  // 유튜브 데이터 가져오기
  const fetchYoutubeData = async (date: string) => {
    setYoutubeLoading(true);
    setYoutubeError(null);
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonMusic/youtube/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch YouTube data: ${response.statusText}`);
      }

      const data = await response.json();
      setYoutubeData(data);
    } catch (error) {
      console.error(error);
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
        `https://websseu.github.io/pythonMusic/apple/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Apple data: ${response.statusText}`);
      }

      const data = await response.json();
      setAppleData(data);
    } catch (error) {
      console.error(error);
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
        `https://websseu.github.io/pythonMusic/spotify/global/globalTop100_${date}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Spotify data: ${response.statusText}`);
      }

      const data = await response.json();
      setSpotifyData(data);
    } catch (error) {
      console.error(error);
      setSpotifyError("스포티파이 데이터를 가져오는 중 문제가 발생했습니다 🥵");
    } finally {
      setSpotifyLoading(false);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    const formattedDate = format(youtubeDate, "yyyy-MM-dd");
    fetchYoutubeData(formattedDate);
  }, [youtubeDate]);

  useEffect(() => {
    const formattedDate = format(appleDate, "yyyy-MM-dd");
    fetchAppleData(formattedDate);
  }, [appleDate]);

  useEffect(() => {
    const formattedDate = format(spotifyDate, "yyyy-MM-dd");
    fetchSpotifyData(formattedDate);
  }, [spotifyDate]);

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
              src="/logo/youtube.png"
              alt="youtube"
              width={30}
              height={30}
              className="rounded-full"
            />
            YouTube Music{" "}
            <LuCalendarRange
              onClick={() => setShowYoutubeCalendar(!showYoutubeCalendar)}
              style={{ cursor: "pointer" }}
            />
          </h2>

          {showYoutubeCalendar && (
            <div>
              <Calendar
                value={youtubeDate}
                onChange={(value) => {
                  setYoutubeDate(value as Date);
                  setShowYoutubeCalendar(false);
                }}
              />
            </div>
          )}

          {youtubeLoading ? (
            <p className="music__loading">유튜브 데이터를 가져오는 중... 🤩</p>
          ) : youtubeError ? (
            <p className="music__error">{youtubeError}</p>
          ) : (
            <ul>
              {youtubeData.map((item: any, index: number) => (
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
              src="/logo/apple.png"
              alt="apple"
              width={30}
              height={30}
              className="rounded-full"
            />
            Apple Music{" "}
            <LuCalendarRange
              onClick={() => setShowAppleCalendar(!showAppleCalendar)}
              style={{ cursor: "pointer" }}
            />
          </h2>

          {showAppleCalendar && (
            <div>
              <Calendar
                value={appleDate}
                onChange={(value) => {
                  setAppleDate(value as Date);
                  setShowAppleCalendar(false);
                }}
              />
            </div>
          )}

          {appleLoading ? (
            <p className="music__loading">애플 데이터를 가져오는 중... 🤩</p>
          ) : appleError ? (
            <p className="music__error">{appleError}</p>
          ) : (
            <ul>
              {appleData.map((item: any, index: number) => (
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
              src="/logo/spotify.png"
              alt="spotify"
              width={30}
              height={30}
              className="rounded-full"
            />
            Spotify Music{" "}
            <LuCalendarRange
              onClick={() => setShowSpotifyCalendar(!showSpotifyCalendar)}
              style={{ cursor: "pointer" }}
            />
          </h2>

          {showSpotifyCalendar && (
            <div>
              <Calendar
                value={spotifyDate}
                onChange={(value) => {
                  setSpotifyDate(value as Date);
                  setShowSpotifyCalendar(false);
                }}
              />
            </div>
          )}

          {spotifyLoading ? (
            <p className="music__loading">
              스포티파이 데이터를 가져오는 중... 🤩
            </p>
          ) : spotifyError ? (
            <p className="music__error">{spotifyError}</p>
          ) : (
            <ul>
              {spotifyData.map((item: any, index: number) => (
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
      </div>
    </section>
  );
}
