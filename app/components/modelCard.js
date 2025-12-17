export default function ModelCard({ name, prompt, modelUrl, creationDate }) {
  return (
    <div className="max-w-sm mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden p-5 my-4 text-center">
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <p className="text-sm text-white mt-2">Model prompt: <span className="font-medium">{prompt}</span></p>
      <p className="text-sm text-white mt-2">Creation Date: <span className="font-medium">{creationDate}</span></p>
      {modelUrl && (
        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Download this model
        </a>
      )}
    </div>
  );
}
