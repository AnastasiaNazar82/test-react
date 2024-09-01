import LoginForm from "../../components/LoginForm/LoginForm";
import AuthMainPage from "../../components/AuthMain/AuthMain";

export default function LoginPage() {
  return (
    <>
      <title>Sign in page</title>

      <AuthMainPage>
        <LoginForm />
      </AuthMainPage>
    </>
  );
}
