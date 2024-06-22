import PropTypes from 'prop-types';
export const ArrayLength = ({ min, max, n, set_n, disabled, reset_array, reload_array, is_not_same }) => {
  return (
    <>
      {/* title for this section */}
      <div className="text-center text-3xl font-bold mt-20">Array Length</div>
      <p className="text-center mt-4">Choose the length of the array between <span className="text-primary"> {min}</span> and <span className="text-primary"> {max}</span></p>
      <p className="text-center text-xl mt-4">N - {n}</p>
      <div className="container mx-auto my-4 flex">
        <label className="label flex gap-3 flex-1">
          {/* 1 */}
          <span className="label-text-alt">{min}</span>
          <input disabled={disabled} type="range" min={min} max={max} step={1} value={n} onChange={(e) => set_n(+e.target.value)} className={`range ${disabled ? "[--range-shdw:gray]" : ""}`} />
          {/* n */}
          <span className="label-text-alt">{max}</span>
        </label>
        {/* reset button */}
      </div>
      <div className="mx-auto flex justify-center items-center my-4 gap-4">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => reset_array()}
          disabled={disabled}
        >
          Generate Random Array
        </button>
        {
          is_not_same &&
          <button
            className="btn btn-secondary btn-sm ml-4"
            onClick={() => reload_array()}
            disabled={disabled}
          >
            Reload Previous Array
          </button>
        }
      </div>

    </>
  );
};

ArrayLength.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,
  set_n: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  reset_array: PropTypes.func.isRequired,
  reload_array: PropTypes.func.isRequired,
  is_not_same: PropTypes.bool.isRequired
};

export default ArrayLength;