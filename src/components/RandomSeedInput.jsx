import { FaRandom } from "react-icons/fa";

function RandomSeedInput({ seedValue, onSeedChange, onGenerateRandomSeed }) {
  return (
    <div className="flex items-center">
      <label
        htmlFor="seed"
        className="block text-sm font-medium text-gray-700 mr-2"
      >
        Seed:
      </label>
      <input
        type="number"
        id="seed"
        value={seedValue}
        onChange={onSeedChange}
        className="input mr-2"
      />
      <button
        onClick={onGenerateRandomSeed}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <FaRandom />
      </button>
    </div>
  );
}

export default RandomSeedInput;
