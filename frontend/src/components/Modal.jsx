// src/components/Modal.jsx
const Modal = ({ message, onClose, type = "error" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center border-l-4 ${
          type === "error" ? "border-red-600" : "border-green-500"
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {type === "error" ? "Erreur" : "Succès"}
        </h2>
        <p className="mb-6 font-semibold">{message}</p>
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded-lg font-medium ${
            type === "error"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
