export const debouncedSelectionSort = async ({ array, swap, speed, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, set_selection_sort_idx, finalised_n, wait }) => {
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

export const selectionSort = {
  func: debouncedSelectionSort,
  description: "Selection Sort is a simple sorting algorithm that selects the smallest element from the array and swaps it with the element at the beginning of the array.",
  name: "Selection Sort",
  id: "selection-sort",
  algorithm: "Selection Sort",
  url: "https://en.wikipedia.org/wiki/Selection_sort",
  img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif",
  time_complexity: "O(n^2)",
  space_complexity: "O(1)",
  difficulty: "easy",
  tags: ["selection", "sorting", "algorithm"],
  steps: [
    "Find the minimum element in the unsorted part of the array",
    "Swap the found minimum element with the first element of the unsorted part",
    "Move the boundary of the unsorted part one element to the right",
    "Repeat the process until the entire array is sorted"
  ],
  code: `
    // Selection Sort
    function selectionSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          let temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
        }
      }
      return arr;
    }

    selectionSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "1. Start at the first position in the list (index 0).",
    "2. Assume the current position is the minimum position.",
    "3. Look through the rest of the list to find the smallest number.",
    "4. When you find a number smaller than the number at the minimum position, update the minimum position to this new position.",
    "5. After you have checked the whole list, swap the number at the minimum position with the number at the starting position.",
    "6. Move to the next position in the list (index 1) and repeat steps 2-5.",
    "7. Continue this process for each position in the list until you reach the last position.",
    "8. The list is now sorted from smallest to largest."
  ],
  use_cases: [
    "Selection Sort is useful for small datasets where the simplicity of the algorithm outweighs its inefficiency.",
    "It is helpful in educational contexts for teaching basic sorting concepts and algorithm design.",
    "Selection Sort can be useful when the cost of writing to memory is high, as it makes fewer writes compared to algorithms like Bubble Sort.",
    "It is simple to implement and understand, making it a good choice for introductory programming courses."
  ],
  youtube_tutorial_ids: [
    "Nd4SCCIHFWk",
    "Lrd1QaKyok4",
    "dQa4A2Z0_Ro",
  ],
};