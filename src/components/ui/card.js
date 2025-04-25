export const Card = ({ children, className }) => (
    <div className={`rounded-lg border p-4 bg-white ${className || ""}`}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children, className }) => (
    <div className={className}>{children}</div>
  );
  
  