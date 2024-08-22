import { FormEvent, useState } from 'react';
import '../index.css';

export function FileUploader() {
  async function onUpload(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const eventTarget = event.target as HTMLFormElement;
      const formData = new FormData(eventTarget);
      const ops = { method: 'POST', body: formData };
      const resp = await fetch('/api/openAI/upload', ops);
      if (!resp.ok) throw new Error('Upload failed');
      const aiResponse = await resp.json();
      setFile(`http://localhost:8080/images/${aiResponse.fileName}`);
      console.log(aiResponse.aiResponse);
      eventTarget.reset();
    } catch (err) {
      console.error(err);
    }
  }

  const [file, setFile] = useState<string>();

  return (
    <>
      {file ? (
        <div className="w-1/2 self-center">
          <img src={file} className="w-full" />
        </div>
      ) : (
        <form onSubmit={onUpload} className="w-full">
          <input type="file" accept=".png, .jpeg, .jpg" name="image" required />
          <button>Submit</button>
        </form>
      )}
    </>
  );
}
