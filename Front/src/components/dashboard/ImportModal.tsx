import React, { useState } from "react";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleImport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      console.log("Fichier importé :", file.name);
      onClose();
    } else {
      alert("Veuillez sélectionner un fichier.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Importer un fichier</h2>
        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <input
              type="file"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-8 bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold "
              onClick={() => alert('Option depuis Google Drive sélectionnée')}
            >
              <img src="/google-drive-icon.svg.png" className="h-5 w-5 mr-2" alt="Google Drive" />
              Depuis Google Drive
            </button>
          </div>
          {file && (
            <div className="text-sm text-green-700">Sélectionné : {file.name}</div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Importer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportModal;

