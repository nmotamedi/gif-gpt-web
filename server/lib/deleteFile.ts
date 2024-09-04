import { unlink } from 'fs';

export async function deleteFile(path: string): Promise<void> {
  unlink(path, (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
}
