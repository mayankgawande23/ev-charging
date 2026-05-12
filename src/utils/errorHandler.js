export function getErrorMessage(error) {
  if (error?.response?.status === 404) return "Requested resource was not found.";
  if (error?.response?.status === 403) return "You do not have permission to perform this action.";
  if (error?.response?.status >= 500) return "Server error. Please try again shortly.";
  return error?.message || "Something went wrong. Please try again.";
}
