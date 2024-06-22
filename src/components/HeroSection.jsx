export const HeroSection = () => {
  return (
    <div className="hero min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-tl from-primary to-secondary text-white py-10 rounded">
      <div className="hero-content text-center w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">SortWave</h1>
            <p className="text-xl font-medium">A simple and interactive sorting visualizer</p>
          </div>
          <div className="bg-white text-black p-8 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
            <p className="text-2xl font-bold mb-6 text-center">Available Algorithms:</p>
            <ul className="text-lg space-y-4">
              {/* on clicking any of these, the page will navigate to #array-visualiser */}
              <li onClick={() => window.location.hash = "array-visualiser"} className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Bubble Sort</li>
              <li onClick={() => window.location.hash = "array-visualiser"} className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Insertion Sort</li>
              <li onClick={() => window.location.hash = "array-visualiser"} className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Selection Sort</li>
              <li onClick={() => window.location.hash = "array-visualiser"} className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Quick Sort</li>
              <li onClick={() => window.location.hash = "array-visualiser"} className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Merge Sort</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
