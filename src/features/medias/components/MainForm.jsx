export default function MainForm({ formData, onChange }) {
    return (
        <div className="card admin-card mb-4">
            <div className="card-body">

                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label text-secondary small">
                            NÚMERO SERIAL
                        </label>
                        <input
                            type="text"
                            value={formData.serial}
                            onChange={(e) => onChange("serial", e.target.value)}
                            className="form-control form-control-dark"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label text-secondary small">
                            TÍTULO
                        </label>
                        <input
                            type="text"
                            value={formData.titulo}
                            onChange={(e) => onChange("titulo", e.target.value)}
                            className="form-control form-control-dark"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label text-secondary small">
                            URL de la Media
                        </label>
                        <input
                            type="text"
                            value={formData.url}
                            onChange={(e) => onChange("url", e.target.value)}
                            className="form-control form-control-dark"
                            placeholder="https://ejemplo.com/media.mp4"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label text-secondary small">
                            Año de Estreno
                        </label>
                        <input
                            type="number"
                            value={formData.anioEstreno}
                            onChange={(e) => onChange("anioEstreno", e.target.value)}
                            className="form-control form-control-dark"
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label text-secondary small">
                            SINOPSIS
                        </label>
                        <textarea
                            rows="4"
                            value={formData.sinopsis}
                            onChange={(e) => onChange("sinopsis", e.target.value)}
                            className="form-control form-control-dark"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}