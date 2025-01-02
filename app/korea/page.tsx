"use client";

import React, { useEffect, useState } from "react";
import { MusicItem } from "@/constant/type";
import { getYesterdayDate } from "@/constant/utils";
import { useYouTubePlayer } from "@/context/YouTubePlayerContext";
import { koreaMusics } from "@/constant/country";
import MusicList from "@/components/MusicList";

export default function KoreaPage() {
  const { setVideoId, videoId } = useYouTubePlayer();
  const [selectedCountry, setSelectedCountry] = useState<string>("melon");
  const [selectedDate, setSelectedDate] = useState<string>(getYesterdayDate());
  const [musicData, setMusicData] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCountryData = koreaMusics.find(
    (country) => country.name === selectedCountry
  );

  // 데이터 가져오기
  useEffect(() => {
    const fetchMusicData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://websseu.github.io/pythonMusic2/korea/${selectedCountry}/${selectedCountry}Top100_${selectedDate}.json`
        );

        console.log(response);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setMusicData(data);
      } catch (error) {
        console.log("Error fetching Apple Music data:", error);
        setError(
          "현재 날짜에는 데이터가 존재하지 않습니다. 다른 날짜를 선택해주세요! 🥵"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, [selectedCountry, selectedDate]);

  // 플랫폼 저장
  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedKorea");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
    }
  }, []);

  // 플랫폼 변경
  const handlePlatformClick = (country: string) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedKorea", country);
  };

  // 유튜브 재생
  const handleMusicPlay = (youtubeID: string) => {
    if (!youtubeID) {
      console.error("YouTube ID가 없습니다.");
      return;
    }
    setVideoId(youtubeID);
  };

  // 날짜 변경
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <section id="korePage">
      <h1 className="music__title">
        Top 100 Best{" "}
        {selectedCountryData?.url ? (
          <a
            href={selectedCountryData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {selectedCountry}
          </a>
        ) : (
          <span>{selectedCountry}</span>
        )}{" "}
        Korea Music
      </h1>

      <div className="korea__music">
        {koreaMusics.map((country) => (
          <span
            key={country.name}
            onClick={() => handlePlatformClick(country.name)}
            className={`music__nation overflow-hidden ${
              selectedCountry === country.name
                ? "border-blue-600 bg-blue-100"
                : "border-gray-200"
            }`}
          >
            <img
              src={country.icon}
              alt={country.name}
              width={30}
              height={30}
              className="music__icons"
            />
          </span>
        ))}
      </div>

      <div className="music__choice">
        <input
          type="date"
          value={selectedDate}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
        />
      </div>

      <div className="music__lists">
        {loading ? (
          <p className="music__loading">데이터를 가져오는 중입니다... 🤩</p>
        ) : error ? (
          <p className="music__error">{error}</p>
        ) : (
          <ul>
            {musicData.map((item: MusicItem, index: number) => (
              <MusicList
                key={index}
                ranking={item.ranking}
                image={item.image}
                title={item.title}
                artist={item.artist}
                youtubeID={item.youtubeID}
                videoId={videoId}
                handleMusicPlay={handleMusicPlay}
                isYoutubeAdd={true}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
