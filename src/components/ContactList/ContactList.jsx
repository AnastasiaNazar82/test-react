import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const filtereContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filtereContacts.map((contact) => {
        return (
          <li className={css.listItem} key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
}
