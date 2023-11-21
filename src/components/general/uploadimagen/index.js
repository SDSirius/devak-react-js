import { useEffect, useRef } from "react";

export default function UploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName= '',
    aoSetarAReferencia
}) {

    const referenciaInput = useRef(null);

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
        const arquivo = referenciaInput?.current?.files[0];
        getImgUrlAndUpdateState(arquivo);

    }


    const releasingImage = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const arquivo = e.dataTransfer.files[0];
            getImgUrlAndUpdateState(arquivo);
        }
    }

    const getImgUrlAndUpdateState = (arquivo)  => {
        const leitorDoc = new FileReader();
        leitorDoc.readAsDataURL(arquivo);
        leitorDoc.onloadend =() => {
            setImagem({
                preview: leitorDoc.result,
                arquivo
            });
        }
    }

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