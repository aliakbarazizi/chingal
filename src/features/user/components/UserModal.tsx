import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Close from "../../../assets/icons/outline/Close";
import UserForm from "./UserForm";

export default function UserModal({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={isOpen}
      onClose={() => navigate("/users")}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-surface-100/50 backdrop-blur-[6px]"
        aria-hidden="true"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto flex w-[540px] flex-col gap-10 rounded-3xl bg-surface-100 p-10 shadow">
            <Dialog.Title className="flex items-center gap-2.5 border-b-2 border-surface-300 pb-4 text-2xl">
              <Close />
              کاربر جدید
            </Dialog.Title>
            <UserForm />
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
