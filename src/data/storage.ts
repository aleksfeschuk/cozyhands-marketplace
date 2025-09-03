import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

export async function uploadImageFile(
    file: File,
    opts?: { 
        folder?: string;
        onProgress?: (pct: number) => void
    }
): Promise<{ url: string; path: string}> {
    const storage = getStorage();
    const folder = opts?.folder ?? "images";
    const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
    const path = `${folder}/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(storageRef, file);

    await new Promise<void>((resolve, reject) => {
        task.on(
            "state_changed",
            (snap) => {
                const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
                opts?.onProgress?.(Math.round(pct));
            },
            (err) => reject(err),
            () => resolve()
        );
    });

    const url = await getDownloadURL(task.snapshot.ref);
    return {url, path};
}

export async function deleteImageByPath(path: string) {
    const storage = getStorage();
    await deleteObject(ref(storage, path));
}