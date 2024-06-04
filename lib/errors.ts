export const ERROR_MESSAGES: ErrorMessages = {
  "gas required exceeds allowance (0)":
    "You do not have enough gas to cover this transaction. You can obtain gas from a faucet, or contact us on Discord.",
  "Error: App_nameAlreadyUsed()": "dApp name must be unique.",
};

// Function to get user-friendly error message
export function getErrorMessage(error: string) {
  return ERROR_MESSAGES[error] || "An unexpected error occurred."; // Default message
}
