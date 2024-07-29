function ErrorSlider({ errorValue, onErrorChange }) {
  return (
    <div className="flex items-center">
      <label
        htmlFor="error-slider"
        className="block text-sm font-medium text-gray-700 mr-2"
      >
        Errors:
      </label>

      <input
        type="range"
        id="error-slider"
        min="0"
        max="10"
        value={errorValue}
        onChange={onErrorChange}
        className="mr-4"
      />

      <input
        type="number"
        value={errorValue}
        onChange={onErrorChange}
        className="input w-20"
        min={0}
        max={1000}
      />
    </div>
  );
}

export default ErrorSlider;
