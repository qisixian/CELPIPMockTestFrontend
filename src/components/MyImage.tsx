import {useEffect, useState } from "react";

interface Props {
    imageUrl: String;
}




function MyImage({imageUrl}: Props) {

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            });

        // 清理 URL，释放内存
        return () => URL.revokeObjectURL(imageSrc);
    }, []);

    return (
        <img src={imageSrc} alt="image" />
    );
}

export default MyImage;