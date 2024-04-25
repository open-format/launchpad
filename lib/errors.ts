export const ERROR_MESSAGES: ErrorMessages = {
  "gas required exceeds allowance (0)":
    "You need gas to pay for the transaction fees.",
  "Error: App_nameAlreadyUsed()": "App name must be unique.",
};

// Function to get user-friendly error message
export function getErrorMessage(error: string) {
  return ERROR_MESSAGES[error] || "An unexpected error occurred."; // Default message
}
