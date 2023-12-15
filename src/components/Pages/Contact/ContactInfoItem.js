import classNames from "classnames";
import Link from "next/link";

export default function ContactInfoItem({ iconClass, title, detail }) {
  return (
    <div className="contact-info__item">
      <div className="contact-info__item__icon">
        <i className={classNames(iconClass)} />
      </div>
      <div className="contact-info__item__detail">
        <h3>{title}</h3>
        <p>{detail}</p>
      </div>
    </div>
  );
}
