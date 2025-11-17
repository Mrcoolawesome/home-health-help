import { Toast } from "@base-ui-components/react";

export default function GlobalToast() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed z-10 top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]">
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast} className="bg-background text-foreground outline outline-foreground">
            <Toast.Content>
              <Toast.Close>
                <Toast.Description />
              </Toast.Close>
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}
