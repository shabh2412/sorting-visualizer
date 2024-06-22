import PropTypes from 'prop-types';
const SortButton = ({ title, is_sorted, sorting, array, sorting_function }) => {
  return (
    <div className="tooltip tooltip-bottom" data-tip={is_sorted ? "Array is sorted" : sorting ? "Sorting..." : title}>
      <button
        className="btn btn-primary btn-md"
        onClick={() => sorting_function(array)}
        disabled={sorting || is_sorted}
      >
        {title}
      </button>
    </div>
  );
};

SortButton.propTypes = {
  title: PropTypes.string.isRequired,
  is_sorted: PropTypes.bool.isRequired,
  sorting: PropTypes.bool.isRequired,
  array: PropTypes.array.isRequired,
  sorting_function: PropTypes.func.isRequired
};

export default SortButton;