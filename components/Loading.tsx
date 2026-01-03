type LoadingProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

export default function Loading({
  text = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}
