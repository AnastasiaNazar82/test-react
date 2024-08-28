import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const handelDelet = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <div className={css.contact_info}>
        <p className={css.contact_infoItem}>
          <BsFillPersonFill size={12} />
          {name}
        </p>

        <p className={css.contact_infoItem}>
          <BsFillTelephoneFill size={12} />
          {number}
        </p>
      </div>

      <button className={css.btn} onClick={handelDelet}>
        Delete
      </button>
    </div>
  );
}
