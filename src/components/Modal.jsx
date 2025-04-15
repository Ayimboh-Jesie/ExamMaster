export default function Modal({ open, onClose, children }) {
    if(!open) return null;
  return (
    <div
    onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center cursor-pointer transition-colors
        ${open ? "visible bg-black/70 z-10" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{padding:'6px'}}
        className={`w-[90%] md:w-1/3 lg:w-1/3 h-[90%] py-12 overflow-auto  px-12 bg-white rounded-xl shadow-lg p-24 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className=" w-6 h-6 flex justify-center items-center cursor-pointer absolute top-2 right-2 p-3 text-sm rounded-full text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
