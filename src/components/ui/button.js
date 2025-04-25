export const Button = ({ children, ...props }) => (
    <button
      {...props}
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );