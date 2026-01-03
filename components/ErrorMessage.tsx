type ErrorMessageProps = {
  title?: string;
  message?: string;
};

export default function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-700">{title}</h2>

      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
