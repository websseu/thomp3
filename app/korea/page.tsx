"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useYouTubePlayer } from "@/context/YouTubePlayerContext";
import { koreaMusics } from "@/constant/country";
import { FaPlay } from "react-icons/fa";
import { MusicItem } from "@/constant/type";
import MusicListen from "@/components/MusicListen";

export default function KoreaPage() {
  const { setVideoId, videoId } = useYouTubePlayer();

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split("T")[0];
  };

  const [selectedCountry, setSelectedCountry] = useState<string>("melon");
  const [selectedDate, setSelectedDate] = useState(getYesterday());
  const [musicData, setMusicData] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchMusicData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://websseu.github.io/pythonMusic/korea/${selectedCountry}/${selectedCountry}Top100_${selectedDate}.json`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setMusicData(data);
      } catch (error) {
        console.error("Error fetching Apple Music data:", error);
        setError(
          "현재 날짜에는 데이터가 존재하지 않습니다. 다른 날짜를 선택해주세요! 🥵"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, [selectedCountry, selectedDate]);

  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedKorea");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
    }
  }, []);

  // 국가 변경 처리
  const handleCountryClick = (country: string) => {
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

  // 날짜 변경 핸들러
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <section id="koreaPage">
      <h1 className="music__title">
        Top 100 Best <span>{selectedCountry}</span> Korea Music
      </h1>

      <div className="korea__music">
        {koreaMusics.map((country) => (
          <span
            key={country.name}
            onClick={() => handleCountryClick(country.name)}
            className={`music__nation overflow-hidden ${
              selectedCountry === country.name
                ? "border-blue-600 bg-blue-100"
                : "border-gray-200"
            }`}
          >
            <Image
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
              <li key={index} className="music__list">
                <span className="ranking">{item.ranking}</span>
                <div className="image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  {item.youtubeID && (
                    <button
                      className={`music__play ${
                        videoId === item.youtubeID ? "opacity-100" : ""
                      }`}
                      onClick={() => handleMusicPlay(item.youtubeID || "")}
                    >
                      <FaPlay />
                    </button>
                  )}
                </div>
                <div className="title">
                  <p>{item.title}</p>
                  <p>{item.artist}</p>
                </div>

                <MusicListen
                  youtubeID={item.youtubeID}
                  spotifyID={item.spotifyID}
                  appleID={item.appleID}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
