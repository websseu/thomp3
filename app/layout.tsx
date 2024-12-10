import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { YouTubePlayerProvider } from "@/context/YouTubePlayerContext";
import YouTubePlayer from "@/components/YouTubePlayer";

export const metadata: Metadata = {
  title: "Global Music Rankings | Top Charts Worldwide",
  description:
    "Explore the top music rankings from platforms like YouTube, Spotify, and Apple Music. Stay updated with the latest global music trends.",
  keywords: [
    "music rankings",
    "global charts",
    "top songs",
    "YouTube music",
    "Spotify top tracks",
    "Apple Music charts",
    "global music trends",
    "top 10 songs",
  ],
  openGraph: {
    title: "ThompStar : Global Music Rankings",
    description:
      "Your ultimate source for top music rankings across various platforms.",
    url: "https://www.thompstar.com",
    siteName: "Global Music Rankings",
    images: [
      {
        url: "/thompstar.webp",
        width: 1200,
        height: 630,
        alt: "Global Music Rankings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Music Rankings",
    description: "Stay in tune with the top music rankings worldwide.",
    images: ["/thompstar.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <YouTubePlayerProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <YouTubePlayer />
        </YouTubePlayerProvider>
      </body>
    </html>
  );
}
