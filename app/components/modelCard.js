export default function ModelCard({ name, prompt, modelUrl, creationDate }){
    return(
        <div>
            <h2>Model name: {name}</h2>
            <p>Model prompt: {prompt}</p>
            <p>Creation Date: {creationDate}</p>
            {modelUrl && <a href={modelUrl} target="_blank">Download</a>}
        </div>
    );
}