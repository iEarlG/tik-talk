"use client";

import Image from "next/image";

import Modal from "@/app/Components/Modal";

interface ImageModalsProps {
    src?: string | null;
    isOpen?: boolean;
    onClose: () => void;
}

const ImageModals: React.FC<ImageModalsProps> = ({
    src,
    isOpen,
    onClose
}) => {
    if (!src) return null;

    return ( 
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <Image 
                    alt="Image"
                    src={src}
                    className="object-cover"
                    fill
                />
            </div>
        </Modal>
    );
}
 
export default ImageModals;