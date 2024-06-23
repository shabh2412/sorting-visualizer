import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ youtube_tutorial_ids }) => {
  const [selectedVideo, setSelectedVideo] = useState(youtube_tutorial_ids[0]);

  useEffect(() => {
    setSelectedVideo(youtube_tutorial_ids[0]);
  }, [youtube_tutorial_ids]);

  return (
    <div className="video-player grid grid-cols-1 md:grid-cols-4">
      <iframe
        className="w-full md:w-[30dvw] lg:w-[44dvw] xl:w-[50dvw] rounded-lg shadow-lg my-2 mx-auto md:col-span-3"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${selectedVideo}?controls=1&playlist=${youtube_tutorial_ids.join(",")}&color=red`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-list my-4 flex md:flex-col gap-3 items-center justify-start rounded bg-gray-200 max-h-[35dvh] overflow-y-scroll p-2 max-w-[80dvw] overflow-x-scroll">
        {youtube_tutorial_ids.map((videoId, index) => (
          <div key={index} className="video-item flex items-center h-20 w-40" style={{
            border: selectedVideo === videoId ? "2px solid red" : "none",
            borderRadius: selectedVideo === videoId ? "10px" : "none",
            padding: selectedVideo === videoId ? "5px" : "none",
          }}>
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8OUKJU4nyl7-tj2y24v_ogc7n9A`}
              alt={`Thumbnail of Video ${index + 1}`}
              className="h-full rounded cursor-pointer object-contain w-40"
              onClick={() => setSelectedVideo(videoId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  youtube_tutorial_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VideoPlayer;
