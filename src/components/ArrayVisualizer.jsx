import { useEffect, useRef, useState } from "react";
import ArrayLength from "./ArrayLength";
import { SortSpeed } from "./SortSpeed";
import SortButton from "./SortButton";
import { sortingAlgorithms } from "../sortingAlgorithms";
import AlgorithmDetails from "./AlgorithmDetails";

const generateRandomArrayOfSizeN = (n) => {
  if (n <= 0) return [];

  const array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * 10000);
  }
  return array;
};

export const ArrayVisualiser = () => {

  const [n, set_n] = useState(10);
  const [finalised_n, set_finalised_n] = useState(n);
  const [min] = useState(5);
  const [max] = useState(100);
  const [array, set_array] = useState(generateRandomArrayOfSizeN(n));
  const [prev_array, set_prev_array] = useState(array);

  const [selected_item_idx, set_selected_item_idx] = useState(-1);
  const [selection_sort_idx, set_selection_sort_idx] = useState(-1);

  const [sorting, set_sorting] = useState(false);
  const [is_sorted, set_is_sorted] = useState(false);

  const [speed, set_speed] = useState(10);

  const [stopwatch, set_stopwatch] = useState(0);

  const stopwatch_interval = useRef(null);

  const start_stopwatch = () => {
    set_stopwatch(0);
    if (stopwatch_interval.current) {
      clearInterval(stopwatch_interval.current);
    }
    stopwatch_interval.current = setInterval(() => {
      set_stopwatch((prev) => prev + 1);
    }, 10);
    return () => clearInterval(stopwatch_interval.current);
  };

  const stop_stopwatch = () => {
    clearInterval(stopwatch_interval.current);
  };

  const reset_array = () => {
    set_finalised_n(n);
    const new_array = generateRandomArrayOfSizeN(n);
    set_array(JSON.parse(JSON.stringify(new_array)));
    set_prev_array(JSON.parse(JSON.stringify(new_array)));
    set_is_sorted(false);
    set_sorting(false);
    set_stopwatch(0);
    if (stopwatch_interval.current) {
      clearInterval(stopwatch_interval.current);
    }
  };

  const reload_array = () => {
    const arr = JSON.parse(JSON.stringify(prev_array));
    set_finalised_n(arr.length);
    set_n(arr.length);
    set_array(prev_array);
    set_is_sorted(false);
    set_sorting(false);
    set_stopwatch(0);
    if (stopwatch_interval.current) {
      clearInterval(stopwatch_interval.current);
    }
  };

  const swap = async (a, b, arr) => {
    await new Promise((resolve) => setTimeout(() => {
      console.log("sorting", a, b);
      [arr[a], arr[b]] = [arr[b], arr[a]];
      set_array(JSON.parse(JSON.stringify(arr)));
      resolve();
    }, speed));
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [selected_algorithm, set_selected_algorithm] = useState(null);

  useEffect(() => {
    reset_array();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <div className="w-full min-h-[90dvh]" id="array-visualiser">
      {/* a slider to change the size of the array - daisyUI */}
      <ArrayLength min={min} max={max} n={n} set_n={set_n} disabled={sorting} reset_array={reset_array} reload_array={reload_array} is_not_same={JSON.stringify(array) !== JSON.stringify(prev_array)} />

      {/* an array visualiser */}
      <div className="array-visualiser w-[80dvw] mx-auto flex items-end min-h-[10dvh] max-h-[10dvh] h-[10dvh]">
        {array.map((value, index) => (
          <div
            key={index}
            className="array-visualiser-element bg-primary text-primary-content rounded m-0.5 inline-block"
            style={{
              height: `${(value / 10000) * 100}%`,
              // proportional width, such that when n = 100, then also all the bars are visible in same row.
              width: `${100 / finalised_n}%`,
              // transition: "all 0.5s ease-in-out",
              // if selected_item_idx is -1, then it is not selected
              // if selected_item_idx is index, then it is selected
              backgroundColor: (selected_item_idx === index ? "#ff6347" : selection_sort_idx === index ? "#32cd32" : ""),
            }}
          >
          </div>
        ))}
      </div>
      {/* terminal-like UI to display the array */}
      <div className="w-[80dvw] mx-auto p-4 mt-4 text-sm bg-black text-green-500 font-mono rounded-lg flex flex-wrap">
        [
        {array.map((value, index) => (
          <p key={index} className="overflow-x-hidden break-words">{value},</p>
        ))}
        ]
      </div>

      {/* setting the sorting speed */}
      <SortSpeed speed={speed} set_speed={set_speed} disabled={sorting} stopwatch={stopwatch} />

      {/* sorting options */}
      <div className="w-[80dvw] mx-auto grid grid-cols-2 md:flex justify-center mt-4 gap-4 flex-wrap">
        {
          Object.keys(sortingAlgorithms)?.map((algo) => <SortButton key={algo} array={array} is_sorted={is_sorted} sorting={sorting} sorting_function={() => {
            set_selected_algorithm(sortingAlgorithms[algo]);
            sortingAlgorithms[algo].func(({ array, swap, speed, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, set_selection_sort_idx, finalised_n, wait, set_array, }));
          }} title={algo} />)
        }
      </div>

      {/* if any algorithm is selected, then show it's details */}
      <AlgorithmDetails algorithm={selected_algorithm} />
    </div>
  </>;
};