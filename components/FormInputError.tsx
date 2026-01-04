function ErrorMessage({ message }: { message?: string }) {
  return message ? (
    <p className="mt-1 text-xs text-red-500">{message}</p>
  ) : null;
}

export default ErrorMessage;
