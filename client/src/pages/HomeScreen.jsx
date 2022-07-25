
import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Card from '../components/base/card'

var albums = [
  {
    title: "City & Architecture",
    description: "Beautiful free photos of cities and architecture found at www.unsplash.com.",
    images: ["https://unsplash.com/photos/hyxka6To3I8/download?force=true", "https://unsplash.com/photos/v4ZsX4tNpM0/download?force=true", "https://unsplash.com/photos/CCD1y0qb8hQ/download?force=true", "https://unsplash.com/photos/HhmCIJTLuGY/download?force=true", "https://unsplash.com/photos/29VFqg1pyK8/download?force=true", "https://unsplash.com/photos/ALBc326eGas/download?force=true", "https://unsplash.com/photos/QoEHqszeva8/download?force=true", "https://unsplash.com/photos/mG5jTwsXcEI/download?force=true", "https://unsplash.com/photos/_QoAuZGAoPY/download?force=true"]
  },
  {
    title: "Food Theme",
    description: "Nice free photos of food for your inspiration found at www.unsplash.com.",
    images: ["https://unsplash.com/photos/GTMGG-xvxdU/download?force=true", "https://unsplash.com/photos/JoGHIF4O9UM/download?force=true", "https://unsplash.com/photos/wMzx2nBdeng/download?force=true", "https://unsplash.com/photos/nkHBFwVBzkg/download?force=true", "https://unsplash.com/photos/W6sqUYlJRiw/download?force=true", "https://unsplash.com/photos/M01DfkOqz7I/download?force=true", "https://unsplash.com/photos/b9xUX3HR5nQ/download?force=true", "https://unsplash.com/photos/Zsot3R_L4i4/download?force=true"]
  },
  {
    title: "People & Portraits",
    description: "Free portraits and photos of people. Source: www.unsplash.com.",
    images: ["https://unsplash.com/photos/vBetZA2-bJg/download?force=true", "https://unsplash.com/photos/LN8KyzS3OJ8/download?force=true", "https://unsplash.com/photos/rxPqkK0hp3c/download?force=true", "https://unsplash.com/photos/AHBvAIVqk64/download?force=true", "https://unsplash.com/photos/4uojMEdcwI8/download?force=true"]
  },
]



const HomeScreen = () => {
  const [data, setData] = useState(albums)
  console.log(data);
  return (
    // map  func with data would have card component inside
   //  data.map
    data.map((album, index) => {
      return (
        <Card
          img={album.images[0]}
          title={album.title}
          subtitle={album.description}
        />
        )
      })

  );
};
  

export default HomeScreen;