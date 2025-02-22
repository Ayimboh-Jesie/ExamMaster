export default function Modal({ open, onClose, children }) {
  return (
    <div
    onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center cursor-pointer transition-colors
        ${open ? "visible bg-black/70" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{padding:'6px'}}
        className={`w-[90%] md:w-1/2 lg:w-2/4 px-6 bg-white rounded-xl shawdow-lg p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className=" w-[4%] cursor-pointer absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-red-500 hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
