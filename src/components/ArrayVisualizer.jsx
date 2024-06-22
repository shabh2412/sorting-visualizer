import { useEffect, useRef, useState } from "react";
import ArrayLength from "./ArrayLength";
import { SortSpeed } from "./SortSpeed";
import SortButton from "./SortButton";

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

  useEffect(() => {
    set_array(generateRandomArrayOfSizeN(n));
    set_finalised_n(n);
    set_is_sorted(false);
    set_sorting(false);
    set_stopwatch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // debounced bubble sort
  const debounced_bubble_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      // implement each swap after delay of 2000ms
      console.log("sorting", arr);
      for (let i = 0; i < finalised_n - 1; i++) {
        for (let j = 0; j < finalised_n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            set_selected_item_idx(j);
            console.log("swapping", j, j + 1);
            await swap(j, j + 1, arr);
          }
        }
      }
      console.log("sorted", arr);
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      stop_stopwatch();
    }
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // debounced selection sort
  const debounced_selection_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      for (let i = 0; i < finalised_n; i++) {
        let position = i;
        wait(speed);
        set_selection_sort_idx(position);
        for (let j = i + 1; j < finalised_n; j++) {
          if (arr[j] < arr[position]) {
            set_selection_sort_idx(position);
            position = j;
          }
          // set_selected_item_idx();
        }
        set_selected_item_idx(i);
        set_selection_sort_idx(position);
        await swap(i, position, arr);
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      set_selection_sort_idx(-1);
      stop_stopwatch();
    }
  };

  // debounded insertion sort
  const debounced_insertion_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      for (let i = 1; i < finalised_n; i++) {
        let x = arr[i];
        set_selected_item_idx(i);
        let j = i - 1;
        while (j >= 0 && arr[j] > x) {
          set_selection_sort_idx(j);
          arr[j + 1] = arr[j];
          j--;
          await wait(speed);
        }
        arr[j + 1] = x;
        set_array(JSON.parse(JSON.stringify(arr)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      stop_stopwatch();
      set_selection_sort_idx(-1);
    }
  };

  // quick sort

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      set_selected_item_idx(j);
      await wait(speed);
      if (arr[j] < pivot) {
        set_selection_sort_idx(j);
        i++;
        await swap(i, j, arr);
        set_selected_item_idx(i);
      }
    }
    await swap(i + 1, high, arr);
    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const partitionIndex = await partition(arr, low, high);
      await Promise.all([
        quickSort(arr, low, partitionIndex - 1),
        quickSort(arr, partitionIndex + 1, high),
      ]);
    }
  };

  // debounced quick sort
  const debounced_quick_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      await quickSort(arr, 0, arr.length - 1);
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      set_selection_sort_idx(-1);
      stop_stopwatch();
    }
  };

  // merge sort
  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    let i = 0;
    let j = 0;
    let k = l;
    while (i < n1 && j < n2) {
      set_selected_item_idx(k);
      await wait(speed);
      if (L[i] <= R[j]) {
        set_selected_item_idx(k);
        arr[k] = L[i];
        i++;
      } else {
        set_selected_item_idx(k);
        arr[k] = R[j];
        j++;
      }
      k++;
    }
    while (i < n1) {
      await wait(speed);
      set_selected_item_idx(k);
      arr[k] = L[i];
      i++;
      k++;
    }
    while (j < n2) {
      await wait(speed);
      set_selected_item_idx(k);
      arr[k] = R[j];
      j++;
      k++;
    }
    set_array(JSON.parse(JSON.stringify(arr)));
  };

  const mergeSort = async (arr, l, r) => {
    if (l < r) {
      const m = l + Math.floor((r - l) / 2);
      await Promise.all([
        mergeSort(arr, l, m),
        mergeSort(arr, m + 1, r),
      ]);
      await merge(arr, l, m, r);
    }
  };

  // debounced merge sort
  const debounced_merge_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      await mergeSort(arr, 0, arr.length - 1);
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      stop_stopwatch();
    }
  };

  // counting sort
  const counting_sort = async (arr) => {
    const max = Math.max(...arr);
    const count_arr = new Array(max + 1).fill(0);
    for (let val of arr) {
      count_arr[val]++;
    }
    let idx = 0;
    for (let i = 0; i < count_arr.length; i++) {
      while (count_arr[i] > 0) {
        set_selected_item_idx(idx);
        arr[idx] = i;
        idx++;
        count_arr[i]--;
        set_array(JSON.parse(JSON.stringify(arr)));
        await wait(speed);
      }
    }
  };

  // counting sort
  const debounced_counting_sort = async (array) => {
    try {
      start_stopwatch();
      set_sorting(true);
      if (finalised_n < 1) return;
      const arr = JSON.parse(JSON.stringify(array));
      await counting_sort(arr);
    } catch (error) {
      console.error(error);
    } finally {
      set_sorting(false);
      set_is_sorted(true);
      set_selected_item_idx(-1);
      stop_stopwatch();
      set_selection_sort_idx(-1);
    }
  };

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
      <div className="w-[80dvw] mx-auto flex justify-center mt-4 gap-4">
        {/* tooltip - tell the user which sorting will be performed, if is_sorted is true then tell the user that the array is sorted */}
        <SortButton title="Bubble Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_bubble_sort} />
        <SortButton title="Selection Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_selection_sort} />
        <SortButton title="Insertion Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_insertion_sort} />
        <SortButton title="Quick Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_quick_sort} />
        <SortButton title="Merge Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_merge_sort} />
        <SortButton title="Counting Sort" is_sorted={is_sorted} sorting={sorting} array={array} sorting_function={debounced_counting_sort} />
      </div>
    </div>
  </>;
};