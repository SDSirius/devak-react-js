import { useEffect, useRef } from "react";

type UploadImageProps = {
    className?: string;
    image: {
        preview: string;
        file: File | null;
    };
    alt?: string;
    setImage(s: { preview: string; file: File | null }): void;
    imagemPreview?: string;
    imagemPreviewClassName?: string;
    aoSetarAReferencia?: (ref: HTMLInputElement | null) => void;
};


export const UploadImage: React.FC<UploadImageProps> = ({
    className = '',
    setImage,
    imagemPreview,
    imagemPreviewClassName = '',
    aoSetarAReferencia
}) => {

    const referenciaInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!aoSetarAReferencia){
            return;
        }

        aoSetarAReferencia(referenciaInput?.current);
    }, [referenciaInput?.current]);

    const abrirSeletorArquivos = () => {
        referenciaInput?.current?.click();
    }

    const aoAlterarImagem = async () =>{
        if(!referenciaInput?.current?.files?.length ){
           return;
        }
        const file = referenciaInput?.current?.files[0];
        getImgUrlAndUpdateState(file);

    }


    const releasingImage = (e:any) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const file = e.dataTransfer.files[0];
            getImgUrlAndUpdateState(file);
        }
    }

    const getImgUrlAndUpdateState = (file: File) => {
        if (!file) {
            return;
        }
    
        const leitorDoc = new FileReader();
        leitorDoc.readAsDataURL(file);
    
        leitorDoc.onloadend = () => {
            setImage({
                preview: leitorDoc.result as string,
                file: file
            });
        };
    };
    

    return (
        <div className={`uploadImagemContainer ${className}`} 
        onClick={abrirSeletorArquivos}
        onDragOver={e => e.preventDefault()}
        onDrop={releasingImage}
        >
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img 
                        src={imagemPreview}
                        alt='imagem Preview'
                        className={imagemPreviewClassName}
                        />
                </div>
            )}

            <input 
                type='file' 
                className="oculto" 
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAlterarImagem}
            />
        </div>
    );
}