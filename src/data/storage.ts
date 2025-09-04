import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

export type UploadOpts = {
    folder?: string;
    onProgress?: (pct: number) => void;
}

export type UploadImage = {url: string, path: string};

export async function uploadImageFile(
    file: File,
    opts?: UploadOpts): Promise<UploadImage> {

        const storage = getStorage();
        const folder = opts?.folder ?? "images";
        const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
        const path = `${folder}/${Date.now()}-${safeName}`;

        const task = uploadBytesResumable(ref(storage, path), file);

        await new Promise<void>((resolve, reject) => {
            task.on(
                 "state_changed",
                    (s) => {
                        const pct = (s.bytesTransferred / s.totalBytes) * 100;
                        opts?.onProgress?.(Math.round(pct));
                    },
                    reject,
                    () => resolve()
            );
            
        });
    const url = await getDownloadURL(task.snapshot.ref);
    return { url, path }
}

export async function deleteImageByPath(path: string) {
  const storage = getStorage();
  await deleteObject(ref(storage, path));
}
