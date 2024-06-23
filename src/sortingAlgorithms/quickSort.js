const partition = async ({ arr, low, high, swap, set_selected_item_idx, set_selection_sort_idx, speed, wait }) => {
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

const quickSortMain = async ({ arr, low, high, swap, set_selected_item_idx, set_selection_sort_idx, speed, wait }) => {
  if (low < high) {
    const partitionIndex = await partition({ arr, low, high, swap, set_selected_item_idx, set_selection_sort_idx, speed, wait });
    await Promise.all([
      quickSortMain({ arr, low, high: partitionIndex - 1, set_selected_item_idx, set_selection_sort_idx, speed, swap, wait }),
      quickSortMain({ arr, low: partitionIndex + 1, high, set_selected_item_idx, set_selection_sort_idx, speed, swap, wait }),
    ]);
  }
};

export const debouncedQuickSort = async ({ array, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, set_selection_sort_idx, finalised_n, wait, swap, speed, }) => {
  try {
    start_stopwatch();
    set_sorting(true);
    if (finalised_n < 1) return;
    const arr = JSON.parse(JSON.stringify(array));
    await quickSortMain({ arr, low: 0, high: arr.length - 1, set_selected_item_idx, set_selection_sort_idx, speed, swap, wait });
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

export const quickSort = {
  func: debouncedQuickSort,
  description: "Quick Sort is an efficient sorting algorithm that uses a divide-and-conquer approach to sort elements by partitioning the array around a pivot element.",
  name: "Quick Sort",
  id: "quick-sort",
  algorithm: "Quick Sort",
  url: "https://en.wikipedia.org/wiki/Quicksort",
  img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif",
  time_complexity: "O(n log n)",
  space_complexity: "O(log n)",
  difficulty: "medium",
  tags: ["quick", "sorting", "algorithm"],
  steps: [
    "Select a pivot element from the array.",
    "Partition the array into two subarrays: elements less than the pivot and elements greater than or equal to the pivot.",
    "Recursively apply the above steps to the subarrays.",
    "Combine the subarrays to get the sorted array."
  ],
  code: `
    // Quick Sort
    function quickSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];

      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }

      return [...quickSort(left), pivot, ...quickSort(right)];
    }

    quickSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "Select a pivot element from the array.",
    "Partition the array into two subarrays: elements less than the pivot and elements greater than or equal to the pivot.",
    "Recursively apply the above steps to the subarrays.",
    "Combine the subarrays to get the sorted array."
  ],
  use_cases: [
    "Quick Sort is efficient for large datasets due to its average-case time complexity of O(n log n).",
    "It is often used in systems where space is at a premium, as it has a low space complexity of O(log n).",
    "Quick Sort is a good choice for arrays that are not too large and not too small.",
    "It is widely used in practical implementations of efficient sorting algorithms, such as in the standard libraries of many programming languages."
  ],
  youtube_tutorial_ids: [
    "7h1s2SojIRw",
    "Dl6HT-NM_q4",
    "Z8svOqamag8",
  ],
};
