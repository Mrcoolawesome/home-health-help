import { Toast } from "@base-ui-components/react";

export const toastManager = Toast.useToastManager();

export function createToast(message: string) {
  toastManager.add({
    description: message,
  })
}
