import classNames from "classnames";
import Notification from "../assets/icons/outline/Notification";
import Header from "../elements/Header";
import Section from "../elements/Section";
import illustration from "../assets/Illustration.png";
import Statistics from "../assets/icons/outline/Statistics";
import { Link } from "react-router-dom";

const notifications = [
  { date: "امروز", unread: true, text: "امکان اضافه کردن کاربان اضافه میشود." },
  {
    date: "دیروز",
    unread: false,
    text: "امکان اضافه کردن کاربان اضافه میشود.",
  },
  {
    date: "10 روز قبل",
    unread: false,
    text: "امکان اضافه کردن کاربان اضافه میشود.",
  },
  {
    date: "5 آذر",
    unread: false,
    text: "امکان اضافه کردن کاربان اضافه میشود.",
  },
];

const menu = [
  {
    icon: <Statistics className="h-16 w-16 text-sky-300" />,
    title: "لورم ایپسوم",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/foo",
  },
  {
    icon: <Statistics className="h-16 w-16 text-[#8A910E]" />,
    title: "لورم ایپسوم",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/foo",
  },
  {
    icon: <Statistics className="h-16 w-16 text-red-300" />,
    title: "لیست کاربران",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/users",
  },
  {
    icon: <Statistics className="h-16 w-16 text-orange-300" />,
    title: "لورم ایپسوم",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/foo",
  },
  {
    icon: <Statistics className="h-16 w-16 text-green-300" />,
    title: "لورم ایپسوم",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/foo",
  },
  {
    icon: <Statistics className="h-16 w-16 text-orange-300" />,
    title: "لورم ایپسوم",
    subtitle: "توضیح مختصر در مورد لورم ایپسوم قرار گیرد",
    to: "/foo",
  },
];

export default function Dashboard() {
  return (
    <div className="flex h-full gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <Section className="gap-5">
          <div className="flex items-center gap-10">
            <img src={illustration} />
            <div className="space-y-5">
              <h2 className="text-[28px]">چینگال چیست؟</h2>
              <div>
                چینگال سامانه‌ایست که برای شما آماده شده است تا با پیاده‌سازی آن
                هم تمرینی کرده باشید و هم اینکه نتیجه‌ی پیاده‌سازی شما مورد
                بررسی تیم کلاینت قرار گیرد.
              </div>
            </div>
          </div>
        </Section>
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-8">
          {menu.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className="flex flex-col items-center justify-center rounded-3xl border border-surface-300 p-4 text-center"
              style={{
                background:
                  "linear-gradient(225deg, rgba(2, 11, 31, 0.50) -0.06%, rgba(24, 32, 64, 0.50) 50%)",
              }}
            >
              {item.icon}
              <div className="mt-4 text-2xl">{item.title}</div>
              <div className="text-surface-500">{item.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex w-[400px] flex-col gap-8">
        <Section className="min-h-0 flex-1 gap-5 pb-4">
          <Header>
            <Notification />
            اعلان‌ها
          </Header>
          <ul className="-mx-10 flex flex-col gap-8 overflow-y-auto px-10">
            {notifications.map((notification) => (
              <li className="relative">
                {notification.unread && (
                  <div className="absolute -start-4 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
                <div>
                  <span
                    className={classNames(
                      !notification.unread
                        ? "text-surface-500"
                        : "text-surface-600",
                      "flex flex-col gap-0.5",
                    )}
                  >
                    {notification.date}
                  </span>
                  <span
                    className={classNames(
                      !notification.unread
                        ? "text-surface-500"
                        : "text-surface-900",
                      "flex flex-col gap-0.5",
                    )}
                  >
                    {notification.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Section>
        <Section className="min-h-0 flex-1 gap-5 pb-4 text-center">
          <div className="text-2xl">آمار ثبت‌نام</div>
          <div className="text-surface-500">
            درصد کاربرانی که در پنل ثبت‌نام کرده‌اند
          </div>
          <div className="flex justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-surface-300">
              <div
                className="absolute h-full w-full rounded-full bg-[conic-gradient(var(--gradient-start),rgba(0,0,0,0)0%)]"
                style={
                  {
                    "--gradient-start": `rgb(5, 89, 253) 75%`,
                    filter: "drop-shadow(0px 0px 8px #033699)",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                }
              />
              <div className="z-10 flex h-28 w-28 items-center justify-center rounded-full bg-surface-100">
                <span className="text-4xl">75</span>
                <span className="text-lg">%</span>
              </div>
            </div>
          </div>
          <div className="text-2xl text-surface-600">کاربران</div>
        </Section>
      </div>
    </div>
  );
}
