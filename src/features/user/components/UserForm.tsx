import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOrUpdate, useDeleteUser, useUserDetail } from "..";
import ServiceVerification from "../../../assets/icons/outline/ServiceVerification";
import Button from "../../../elements/Button";
import TextInput from "../../../elements/TextInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.string(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    zipcode: yup.string().required(),
    company: yup.string().required(),
    avatar: yup.mixed<File[]>().required(),
  })
  .required();

export default function UserForm() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const { data } = useUserDetail(userId);

  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    values: data ? { ...data, avatar: [] } : undefined,
  });

  const update = useCreateOrUpdate(userId);
  const deleteUser = useDeleteUser(userId);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      formData.append(key, key === "avatar" ? data[key][0] : data[key]!);
    });

    update.mutate(formData, {
      onSuccess: (res) => {
        toast("تغییرات ذخیره شد", {
          position: "bottom-center",
          theme: "dark",
        });
        if (!userId) navigate(`/users/${res.id}`);
      },
    });
  });

  const avatar = watch("avatar");

  return (
    <form className="flex flex-col gap-10" onSubmit={onSubmit}>
      <label className="h-[120px] w-[120px] self-center rounded-full border-2 border-primary-500 p-2">
        {avatar?.[0] || data?.avatar ? (
          <img
            src={avatar?.[0] ? URL.createObjectURL(avatar[0]) : data?.avatar}
            className="h-full w-full rounded-full"
          />
        ) : (
          <ServiceVerification />
        )}
        <input type="file" className="hidden" {...register("avatar")} />
      </label>
      <div className="flex gap-7">
        <TextInput
          label="نام کاربر"
          placeholder="نام کاربر جدید را وارد کنید"
          {...register("name")}
        />
        <TextInput
          label="سن"
          placeholder="سن کاربر جدید را وارد کنید"
          {...register("age")}
        />
      </div>
      <div className="flex gap-10">
        <TextInput
          label="ایمیل"
          placeholder="ایمیل جدید را وارد کنید"
          {...register("email")}
        />
        <TextInput
          label="شماره"
          placeholder="شماره جدید را وارد کنید"
          {...register("phoneNumber")}
          readOnly={!!userId}
        />
      </div>
      <div className="flex gap-10">
        <TextInput
          label="نام کشور"
          placeholder="کشور"
          {...register("country")}
        />
        <TextInput label="نام شهر" placeholder="شهر" {...register("city")} />
        <TextInput
          label="نام خیابان"
          placeholder="خیابان"
          {...register("street")}
        />
        <TextInput label="کد پستی" placeholder="کد" {...register("zipcode")} />
      </div>
      <TextInput
        label="شرکت"
        placeholder="نام شرکت کاربر جدید را وارد کنید"
        {...register("company")}
      />
      <div className="flex gap-4">
        {!userId && (
          <Button
            variant="outline-primary"
            className="w-full"
            type="button"
            onClick={() => navigate("/users")}
          >
            لغو
          </Button>
        )}
        <Button
          variant="primary"
          className="w-full"
          disabled={update.isPending}
        >
          تایید
        </Button>
        {userId && (
          <Button
            variant="danger"
            className="w-full"
            type="button"
            onClick={() =>
              deleteUser.mutate(undefined, {
                onSuccess: () => {
                  toast("کاربر حذف شد", {
                    position: "bottom-center",
                    theme: "dark",
                  });
                  navigate("/users");
                },
              })
            }
          >
            حذف
          </Button>
        )}
      </div>
    </form>
  );
}
