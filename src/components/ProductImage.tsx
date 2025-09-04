import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

type Props = {
    imageUrl?: string;
    imagePath?: string;
    alt: string;
    className?: string;
};

export function ProductImage({ imageUrl, imagePath, alt, className}: Props) {
    const [src, setSrc] = useState<string>("");

    useEffect(() => {
       if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
            setSrc(imageUrl);
            return;
       }

       if (typeof imagePath === "string" && imagePath.trim() !== "") {
            getDownloadURL(ref(getStorage(), imagePath))
                .then(setSrc)
                .catch(() => setSrc(""));
            return;
       }
       setSrc("")
    }, [imageUrl, imagePath]);

    return (
        <img 
            src={src || "/placeholder.svg"}
            alt={alt || ""}
            className={className || undefined}
            loading="lazy"
            onError={(e) => {
                (e.currentTarget as HTMLImageElement).src ="/placeholder.svg";
            }}
        />
    );
}