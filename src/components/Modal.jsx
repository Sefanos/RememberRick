import React from 'react';

const Modal = ({ onClose, message, bestScore }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-75"></div>
      <div className="modal-container bg-white w-96 p-6 rounded-lg z-50 shadow-lg">
  <img src="/images/YouLost.png" alt="You Lost" className="mx-auto mb-4" />


  <div className="text-center text-lg font-bold mb-4">{message}</div>
  
  {bestScore > 0 && (
    <div className="text-center mb-4">
      <span className="text-gray-600">Best Score:</span> {bestScore}
    </div>
  )}

  <div className="modal-actions flex justify-center">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClose}
    >
      Reset
    </button>
  </div>
</div>

    </div>
  );
};

export default Modal;
