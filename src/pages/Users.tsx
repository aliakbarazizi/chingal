import Button from "../elements/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useToggleSearch } from "../hooks/useToggleSearch";
import UserModal from "../features/user/components/UserModal";
import BreadCrumbs from "../elements/Breadcrumbs";
import UsersTable from "../features/user/components/UsersTable";

export default function Users() {
  useToggleSearch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <UserModal isOpen={location.pathname === "/users/create"} />
      <div className="flex flex-col space-y-8 overflow-hidden">
        <div className="flex items-start">
          <BreadCrumbs />
          <Button
            variant="primary"
            className="ms-auto"
            onClick={() => navigate("/users/create")}
          >
            کاربر جدید
          </Button>
        </div>
        <div className="w-full flex-1 overflow-y-auto rounded-2xl border border-surface-300">
          <UsersTable />
        </div>
      </div>
    </>
  );
}
