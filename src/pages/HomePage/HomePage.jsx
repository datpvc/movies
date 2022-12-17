import React from "react";
import BackToTop from "../../components/BackToTop/BackToTop";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Application from "./Application/Application";
import HomeCarousel from "./Carousel/HomeCarousel";
import MovieList from "./MovieList/MovieList";
import MovieNews from "./MovieNews/MovieNews";
import MovieTabs from "./MovieTabs/MovieTabs";

export default function HomePage() {
  return (
    <div>
      <Header />
      <HomeCarousel />
      <MovieList />
      <MovieTabs />
      <MovieNews />
      <Application />
      <Footer />
      <BackToTop />
    </div>
  );
}
