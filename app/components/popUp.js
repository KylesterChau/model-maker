export default function Popup({ isOpen, onClose, onConfirm, modelName, setModelName, savedModel }) {
  function handleConfirm() {
    if (!modelName.trim() || !savedModel || !savedModel.modelUrl) return;
    onConfirm(modelName, savedModel);
    setModelName("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-4 text-white">Enter Model Name</h2>
        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Model Name"
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
