import Close from "../assets/icons/outline/Close";
import BreadCrumbs from "../elements/Breadcrumbs";
import UserForm from "../features/user/components/UserForm";

export default function EditUser() {
  return (
    <div className="flex flex-col space-y-8 overflow-hidden">
      <div className="flex items-center">
        <BreadCrumbs />
      </div>
      <div className="mx-auto flex w-[540px] flex-col gap-10 rounded-3xl border border-surface-300 bg-surface-100 p-10 shadow">
        <div className="flex items-center gap-2.5 border-b-2 border-surface-300 pb-4 text-2xl">
          <Close />
          ویرایش کاربر
        </div>
        <UserForm />
      </div>
    </div>
  );
}
