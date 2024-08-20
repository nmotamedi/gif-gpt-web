import './index.css';
import { FileUploader } from './Components/FileUploader';
import { onSearch } from './data';

export default function App() {
  return (
    <div className="w-full">
      <div className="m-auto w-fit">
        <FileUploader />
        <button onClick={onSearch}>Search Gifs</button>
      </div>
    </div>
  );
}
