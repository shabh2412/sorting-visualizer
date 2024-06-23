import PropTypes from "prop-types";
import VideoPlayer from "./VideoPlayer";

const AlgorithmDetails = ({ algorithm }) => {
  if (!algorithm) return null;

  return (
    <div className="w-[80dvw] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{algorithm.name}</h2>
      {/* if youtube_tutorial_id is not null, then show video */}
      {algorithm.youtube_tutorial_ids && (
        <VideoPlayer youtube_tutorial_ids={algorithm.youtube_tutorial_ids} />
      )}
      <div className="flex justify-between items-center gap-8 flex-wrap">
        <p className="mb-4 max-w-full">{algorithm.description}</p>
      </div>
      <div className="mb-4">
        <strong>Time Complexity:</strong> {algorithm.time_complexity}
      </div>
      <div className="mb-4">
        <strong>Space Complexity:</strong> {algorithm.space_complexity}
      </div>
      <div className="mb-4">
        <strong>Difficulty:</strong> {algorithm.difficulty}
      </div>
      {/* <div className="mb-4">
        <strong>Steps:</strong>
        <ul className="list-disc list-inside">
          {algorithm.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div> */}
      <div className="mb-4">
        <strong>Algorithm in English:</strong>
        <ul className="list-disc list-inside">
          {algorithm.algorithm_in_english.map((step, index) => (
            // if step doesn't have a "  " in the beginning then normally show the li, else make a nested li
            <li key={index} className={step[0] === " " ? "ml-4" : ""}>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Code:</strong>
        <pre className="bg-gray-200 p-4 rounded max-w-[80dvw] overflow-x-scroll">{algorithm.code}</pre>
      </div>
      {
        algorithm?.use_cases &&
        <div className="mb-4">
          <strong>Use Cases:</strong>
          <ul className="list-disc list-inside">
            {algorithm.use_cases?.map((use_case, index) => (
              <li key={index}>{use_case}</li>
            ))}
          </ul>
        </div>
      }
      <div className="mb-4">
        <strong>More Information: </strong>
        <a href={algorithm.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {algorithm?.name} (external link)
        </a>
      </div>
      {algorithm.img && <img src={algorithm.img} alt={algorithm.name} className="mx-auto rounded-lg shadow-lg my-2 max-w-full" />}
    </div>
  );
};

AlgorithmDetails.propTypes = {
  algorithm: PropTypes.object
};

export default AlgorithmDetails;
