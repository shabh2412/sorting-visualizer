import PropTypes from 'prop-types';

export const SortSpeed = ({ speed, set_speed, disabled, stopwatch }) => {
  const format_time = (time) => {
    return `${Math.floor(+time / 100)}s ${time % 1000}ms`;
  };
  return (
    <>
      <div className="w-[80dvw] mx-auto flex justify-center my-4">
        <label className="label w-full">
          <div className='w-32'>
            <p className="label-text">Visualization Speed</p>
            {/* less is faster */}
            <p className="label-text-alt">Less is faster</p>
          </div>
          <input
            type="range"
            min="0"
            max="3000"
            value={speed}
            step="10"
            className={`range range-xs ${disabled ? "[--range-shdw:gray]" : ""}`}
            onChange={(e) => {
              set_speed(+e.target.value);
            }}
            disabled={disabled}
          />
          <span className="label-text">{speed}ms</span>
        </label>
      </div>
      {/* show stopwatch */}
      <div className="w-[80dvw] mx-auto flex justify-center my-4">
        <p className="label-text">Stopwatch: {format_time(stopwatch)}</p>
      </div>
    </>
  );
};

SortSpeed.propTypes = {
  speed: PropTypes.number.isRequired,
  set_speed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stopwatch: PropTypes.number.isRequired
};