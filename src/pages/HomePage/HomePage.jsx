import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      <PageTitle>
        <p className={css.text}>
          Hello! You are on the main page of your Contact Book.
        </p>
      </PageTitle>
    </div>
  );
}
