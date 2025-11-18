import { Toast } from "@base-ui-components/react";

export const toastManager = Toast.createToastManager();

export function createToast(message: string) {
  toastManager.add({
    description: message,
  })
}
