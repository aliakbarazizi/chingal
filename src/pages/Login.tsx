import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/chingal-logo 1.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignin } from "../features/auth";
import TextInput from "../elements/TextInput";
import Button from "../elements/Button";
import PasswordInput from "../elements/PasswordInput";
import Header from "../elements/Header";
import Section from "../elements/Section";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const signin = useSignin();

  const onSubmit = handleSubmit((data) => {
    signin.mutate(data, {
      onSuccess: () => navigate(from, { replace: true }),
    });
  });

  const disabled = !watch("username") || !watch("password");

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full items-center justify-center"
    >
      <Section className="w-[540px]">
        <div className="flex justify-center">
          <img src={logo} />
        </div>
        <Header>ورود به پنل چینگال</Header>
        <TextInput
          {...register("username")}
          label="نام کاربری"
          placeholder="نام کاربری خود را وارد کنید"
        />
        <PasswordInput
          {...register("password")}
          label="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
        />
        <Button
          variant="primary"
          shadow
          disabled={disabled || signin.isPending}
        >
          ورود به سپهر
        </Button>
      </Section>
    </form>
  );
}
