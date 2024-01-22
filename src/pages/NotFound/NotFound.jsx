import s from "./NotFound.module.css"
import { NavLink } from "react-router-dom"
import Button from "../../components/UI/Button/Button"

export function NotFound() {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.NotFoundBlock}>
          <div className={s.Problem}>
            <div className={s.ProblemDis}>Страница не найдена</div>
          </div>
          <div className={s.GoToMainButton}>
            <NavLink to={`/`}>
            <Button
                    classes="btnAdv"
                >
                   Вернуться на главную
                </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
