export const debouncedInsertionSort = async ({ array, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, set_selection_sort_idx, finalised_n, wait, set_array, speed, }) => {
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

export const insertionSort = {
  func: debouncedInsertionSort,
  description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
  name: "Insertion Sort",
  id: "insertion-sort",
  algorithm: "Insertion Sort",
  url: "https://en.wikipedia.org/wiki/Insertion_sort",
  img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif",
  time_complexity: "O(n^2)",
  space_complexity: "O(1)",
  difficulty: "easy",
  tags: ["insertion", "sorting", "algorithm"],
  steps: [
    "Pick the first element as sorted.",
    "Take the next element and compare it with the sorted elements.",
    "Insert the next element into the sorted portion of the array.",
    "Repeat until all elements are sorted."
  ],
  code: `
    // Insertion Sort
    function insertionSort(arr) {
      for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while ((j > -1) && (current < arr[j])) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = current;
      }
      return arr;
    }

    insertionSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "Start from the second element (element at index 1), considering the first element is already sorted.",
    "Compare the current element with the sorted portion of the array.",
    "Shift all elements in the sorted portion that are greater than the current element one position to the right.",
    "Insert the current element at its correct position in the sorted portion of the array.",
    "Repeat the process for all elements until the array is sorted."
  ],
  use_cases: [
    "Insertion Sort is useful for small datasets where the overhead of more advanced sorting algorithms is not justified.",
    "It is efficient for data that is already partially sorted, as it can take advantage of existing order in the data.",
    "Insertion Sort is often used as a building block for more complex sorting algorithms, such as Timsort and IntroSort.",
    "It is simple to implement and understand, making it useful for educational purposes."
  ],
  youtube_tutorial_ids: [
    "oTICKmJhLXI",
    "nKzEJWbkPbQ",
    "JU767SDMDvA",
  ]
};
