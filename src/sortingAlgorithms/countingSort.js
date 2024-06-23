// counting sort
const counting_sort = async ({ arr, set_array, set_selected_item_idx, speed, wait }) => {
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
export const debouncedCountingSort = async ({ array, start_stopwatch, stop_stopwatch, set_sorting, set_is_sorted, set_selected_item_idx, set_selection_sort_idx, finalised_n, wait, set_array, speed, }) => {
  try {
    start_stopwatch();
    set_sorting(true);
    if (finalised_n < 1) return;
    const arr = JSON.parse(JSON.stringify(array));
    await counting_sort({ arr, set_array, set_selected_item_idx, speed, wait });
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

export const countingSort = {
  func: debouncedCountingSort,
  description: "Counting Sort is an integer sorting algorithm that sorts elements by counting the occurrences of each element.",
  name: "Counting Sort",
  id: "counting-sort",
  algorithm: "Counting Sort",
  url: "https://en.wikipedia.org/wiki/Counting_sort",
  img: "https://upload.wikimedia.org/wikipedia/commons/7/76/Counting_sort_animation.gif",
  time_complexity: "O(n + k)",
  space_complexity: "O(k)",
  difficulty: "medium",
  tags: ["counting", "sorting", "algorithm"],
  steps: [
    "Count the number of occurrences of each element in the array.",
    "Reconstruct the array by placing each element the number of times it occurs."
  ],
  code: `
    // Counting Sort
    function countingSort(arr) {
      const max = Math.max(...arr);
      const count = new Array(max + 1).fill(0);

      // Count each element in the array.
      for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
      }

      let index = 0;

      // Reconstruct the array using the count array.
      for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
          arr[index] = i;
          count[i]--;
          index++;
        }
      }

      return arr;
    }

    countingSort([8, 5, 2, 9, 5, 6, 3]);
  `,
  algorithm_in_english: [
    "1. Find the largest number (MAX) in the list to know the range of counts needed.",
    "2. Create an empty array of size MAX + 1. Fill the array with 0.",
    "3. Now iterate over the original array and count each number in the original list.",
    "4. For each number, increment the value of the corresponding index in the count array.",
    "  Ex: if [1,2,2] is original array then [0,1,2] will be the count array.",
    "5. Iterate over the count array.",
    "6. Create an empty array to store the sorted list.",
    "7. For each index, if the value is > 0, then keep on pushing that index in the original list & decrement the value of that index in the count array.",
    "8. Repeat 6 till the value of that index in the count array becomes 0.",
    "9. Return the sorted list.",
  ],
  use_cases: [
    "Counting Sort is efficient for sorting lists of integers where the range of elements (k) is not significantly greater than the number of elements (n).",
    "It is used in scenarios where the data distribution is known and limited.",
    "Counting Sort is useful in applications like sorting grades, votes, and other discrete integer datasets.",
    "It is also a subroutine in other algorithms like radix sort."
  ],
  youtube_tutorial_ids: [
    "mowMVn9wTnE",
    "FOo820lJV1Y",
  ]
};
