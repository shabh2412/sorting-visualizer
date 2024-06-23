import { bubbleSort, } from "./bubbleSort";
import { countingSort } from "./countingSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { selectionSort } from "./selectionSort";

export const sortingAlgorithms = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort,
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
  "Counting Sort": countingSort,
};