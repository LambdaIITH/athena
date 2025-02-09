import { UserAuthForm } from "./user-auth-form";
import logo from "../../assets/logo.png";

export default function SignIn() {
  return (
    <>
      <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-[url('/image.png')] bg-cover bg-center"
          />
          <div className="relative z-20 flex items-center gap-3 text-xl font-semibold">
            <img
              src={logo}
              width={75}
              height={75}
              alt="Athena"
              className="rounded-lg shadow-md"
            />
            <span className="tracking-wide text-gray-900 dark:text-white text-2xl">Athena</span>
          </div>

        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground"></p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
