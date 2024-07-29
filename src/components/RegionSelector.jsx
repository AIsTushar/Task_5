function RegionSelector({ selectedRegion, onRegionChange }) {
  const regions = ["USA", "Poland", "Georgia"];

  return (
    <div className="flex items-center">
      <label
        htmlFor="region"
        className="block text-sm font-medium text-gray-700 mr-2"
      >
        Region:
      </label>
      <select
        id="region"
        value={selectedRegion}
        onChange={onRegionChange}
        className="input"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
