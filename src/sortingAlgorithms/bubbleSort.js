export const debouncedBubbleSort = async ({ array, swap, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, finalised_n, }) => {
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

// description of bubble sort which will be displayed on the UI


export const bubbleSort = {
  func: debouncedBubbleSort,
  description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
  name: "Bubble Sort",
  id: "bubble-sort",
  algorithm: "Bubble Sort",
  url: "https://en.wikipedia.org/wiki/Bubble_sort",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bubblesort_Animation.gif/640px-Bubblesort_Animation.gif",
  time_complexity: "O(n^2)",
  space_complexity: "O(1)",
  difficulty: "easy",
  tags: ["bubble", "sorting", "algorithm"],
  steps: ["Compare two adjacent elements and swap if they are in wrong order", "Repeat the same process for remaining elements", "If no swaps are done, the array is sorted"],
  code: `
    // Bubble Sort
    function bubbleSort(arr) {
      for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr;
    }
    
    bubbleSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "Start with your list of numbers.",
    "Repeat the following steps until the list is sorted:",
    "1. Look at the first number in the list.",
    "2. Compare it with the next number.",
    "3. If the first number is bigger than the second number, swap them.",
    "4. Move to the next number in the list and repeat steps 2 and 3 until you reach the end of the list.",
    "5. After you reach the end of the list, start over from the beginning.",
    "6. This time, you don't need to go as far because the last number is already in its correct place.",
    "7. Keep repeating these steps, each time going one less step, until no more swaps are needed."
  ],
  use_cases: [
    "Bubble Sort is useful for small datasets where the simplicity of the algorithm outweighs its inefficiency.",
    "It is helpful in educational contexts for teaching basic sorting concepts and algorithm design.",
    "Bubble Sort can be useful when the data is already nearly sorted, as it can quickly identify and fix small out-of-order elements.",
    "It is simple to implement and understand, making it a good choice for introductory programming courses."
  ],
  youtube_tutorial_ids: [
    "p__ETf2CKY4",
    "F5MZyqRp_IM",
    "xcPFUCh0jT0",
    "Dv4qLJcxus8",
  ],
};
