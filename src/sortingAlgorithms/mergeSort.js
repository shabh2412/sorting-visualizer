// merge sort
const merge = async ({ arr, l, m, r, wait, set_selected_item_idx, speed, set_array }) => {
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

const mergeSortMain = async ({ arr, l, r, set_array, set_selected_item_idx, speed, wait }) => {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    await Promise.all([
      mergeSortMain({ arr, l, r: m, set_array, set_selected_item_idx, speed, wait }),
      mergeSortMain({ arr, l: m + 1, r, set_array, set_selected_item_idx, speed, wait }),
    ]);
    await merge({ arr, l, m, r, set_array, set_selected_item_idx, speed, wait });
  }
};

// debounced merge sort
export const debouncedMergeSort = async ({ array, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, finalised_n, wait, set_array, speed, }) => {
  try {
    start_stopwatch();
    set_sorting(true);
    if (finalised_n < 1) return;
    const arr = JSON.parse(JSON.stringify(array));
    await mergeSortMain({ arr, l: 0, r: arr.length - 1, set_array, set_selected_item_idx, speed, wait });
  } catch (error) {
    console.error(error);
  } finally {
    set_sorting(false);
    set_is_sorted(true);
    set_selected_item_idx(-1);
    stop_stopwatch();
  }
};

export const mergeSort = {
  func: debouncedMergeSort,
  description: "Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm.",
  name: "Merge Sort",
  id: "merge-sort",
  algorithm: "Merge Sort",
  url: "https://en.wikipedia.org/wiki/Merge_sort",
  img: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif",
  time_complexity: "O(n log n)",
  space_complexity: "O(n)",
  difficulty: "medium",
  tags: ["merge", "sorting", "algorithm"],
  steps: [
    "Divide the unsorted list into n sublists, each containing one element.",
    "Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining."
  ],
  code: `
    // Merge Sort
    function mergeSort(arr) {
      // If the list has only one element, it is already sorted.
      if (arr.length <= 1) {
        return arr;
      }

      // Divide the list into two halves.
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);

      // Recursively sort each half and merge them.
      return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
      let resultArray = [];
      let leftIndex = 0;
      let rightIndex = 0;

      // Compare each element of the two halves and merge them in sorted order.
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          resultArray.push(left[leftIndex]);
          leftIndex++;
        } else {
          resultArray.push(right[rightIndex]);
          rightIndex++;
        }
      }

      // Copy any remaining elements of left half, if any.
      while (leftIndex < left.length) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      }

      // Copy any remaining elements of right half, if any.
      while (rightIndex < right.length) {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }

      return resultArray;
    }

    mergeSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "1. If the list has one or zero elements, it is already sorted.",
    "2. Otherwise, divide the list into two halves.",
    "3. Recursively sort each half using merge sort.",
    "4. Merge the two halves back together in sorted order:",
    "   a. Look at the first element of each half.",
    "   b. Compare these two elements.",
    "   c. Take the smaller element and add it to the sorted list.",
    "   d. Move the pointer in the half that had the smaller element to the next element.",
    "   e. Repeat steps a-d until all elements from both halves are merged into the sorted list."
  ],
  use_cases: [
    "Merge Sort is efficient for large datasets and is used in various applications.",
    "It is stable and guarantees O(n log n) time complexity.",
    "Merge Sort is useful when data cannot fit into memory and needs to be sorted in chunks.",
    "It is commonly used in external sorting, where data is sorted using external storage."
  ],
  youtube_tutorial_ids: [
    "mB5HXBb_HY8",
    "iKGAgWdgoRk",
    "ogjf7ORKfd8",
    "4z9I6ZmeLOQ",
  ]
};