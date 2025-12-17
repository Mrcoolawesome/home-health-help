import { Toast } from "@base-ui-components/react";

export default function GlobalToast() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed z-10 top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            className=" absolute right-0 bottom-0 bg-background-alt text-foreground border border-foreground rounded-lg p-4 data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2 data-[ending-style]:opacity-0 data-[ending-style]:translate-y-2 transition-all "
          >
            <Toast.Content>
              <Toast.Close>
                <Toast.Description className="text-left" />
              </Toast.Close>
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal >
  )
}
