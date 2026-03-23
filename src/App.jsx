import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MediaEditorPage from "./features/medias/pages/MediaEditorPage";
import CatalogoPage from "./features/medias/pages/CatalogoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MediaEditorPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
      </Routes>
    </Router>
  );
}

export default App;