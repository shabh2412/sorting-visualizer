import PropTypes from "prop-types";

const AlgorithmDetails = ({ algorithm }) => {
  if (!algorithm) return null;

  return (
    <div className="w-[80dvw] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{algorithm.name}</h2>
      {/* if youtube_tutorial_id is not null, then show video */}
      {algorithm.youtube_tutorial_ids && (
        // iframe should be a 16:9 aspect ratio and responsive
        <div className="mb-4">
          <iframe
            className="w-full md:w-[30dvw] lg:w-[44dvw] xl:w-[50dvw] rounded-lg shadow-lg my-2 mx-auto"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${algorithm.youtube_tutorial_ids[0]}?controls=1&playlist=${algorithm?.youtube_tutorial_ids?.join(",")}&color=red`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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
