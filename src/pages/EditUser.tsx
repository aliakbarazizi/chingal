import BreadCrumbs from "../elements/Breadcrumbs";
import Header from "../elements/Header";
import Section from "../elements/Section";
import UserForm from "../features/user/components/UserForm";

export default function EditUser() {
  return (
    <div className="flex flex-col space-y-8 overflow-hidden">
      <div className="flex items-center">
        <BreadCrumbs />
      </div>
      <Section className="mx-auto w-[540px]">
        <Header>ویرایش کاربر</Header>
        <UserForm />
      </Section>
    </div>
  );
}
