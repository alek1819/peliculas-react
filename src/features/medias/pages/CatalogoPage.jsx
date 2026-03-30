import { useEffect, useState } from "react";
import mediaService from "../services/mediaService";

export default function CatalogoPage() {
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMedias = async () => {
        try {
            const data = await mediaService.getAll();
            setMedias(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedias();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta media?")) return;
        try {
            await mediaService.remove(id);
            setMedias(prev => prev.filter(media => media._id !== id));
        } catch (err) {
            console.error(err);
            alert("Error al eliminar la media");
        }
    };

    if (loading) return <p className="catalogo-netflix-loading text-center mt-5">Cargando catálogo...</p>;

    return (
        <div className="catalogo-netflix-bg py-5">
            <div className="container">
                <h2 className="catalogo-netflix-title mb-4">Catálogo de Películas</h2>
                <div className="catalogo-netflix-grid">
                    {medias.map(media => (
                        <div key={media._id} className="catalogo-netflix-card">
                            <div className="catalogo-netflix-img-wrapper">
                                <img src={media.imagen || media.url} alt={media.titulo} />
                            </div>
                            <div className="catalogo-netflix-info">
                                <h5 className="catalogo-netflix-card-title">{media.titulo}</h5>
                                <p className="catalogo-netflix-card-text">{media.sinopsis}</p>
                                <p className="catalogo-netflix-card-meta">
                                    Género: {media.genero?.nombre} <br/>
                                    Director: {media.director?.nombres} <br/>
                                    Productora: {media.productora?.nombre}
                                </p>
                                <button
                                    className="catalogo-netflix-delete-btn"
                                    onClick={() => handleDelete(media._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}