# SortWave

SortWave is a simple and interactive sorting visualizer built with React and daisyUI. It allows users to visualize various sorting algorithms, including Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort, and Counting Sort.

## Features

- Visualize multiple sorting algorithms.
- Adjustable array size and sorting speed.
- Interactive and user-friendly interface.
- Real-time display of the array being sorted.

## Algorithms Visualized

- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort
- Merge Sort
- Counting Sort

## Algo to be added

- Radix Sort

## Technologies Used

- React: A JavaScript library for building user interfaces.
- daisyUI: A Tailwind CSS component library for designing the UI.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.

## Live Demo

Check out the live demo of the project at [SortWave](https://sortwave.rishabhpanesar.com/).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/shabh2412/sorting-visualizer.git
   ```

2. Navigate to the project directory:

   ```sh
   cd sorting-visualizer
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Project

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Usage

1. Adjust the array size using the slider.
2. Set the sorting speed using the speed control.
3. Select a sorting algorithm by clicking the corresponding button.
4. Watch the array being sorted in real-time!

## Project Structure

```
sorting-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── ArrayLength.jsx
│   │   ├── ArrayVisualizer.jsx
│   │   ├── HeroSection.jsx
│   │   └── Navbar.jsx
│   │   ├── SortButton.jsx
│   │   ├── SortSpeed.jsx
│   │   ├── ThemeController.jsx
│   ├── context/
│   │   └── ThemeContext.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── postcss.config.js
├── README.md
└── tailwind.config.js
└── vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://react.dev/)
- [daisyUI](https://daisyui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
