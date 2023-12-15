import classNames from "classnames";

export default function SocialIcons({ className, colored }) {
  return (
    <ul className={`${classNames(className)} social-icons`}>
      <li>
        <a
          style={{ color: colored && "#2463ac" }}
          href="https://www.facebook.com/profile.php?id=100094981643316&mibextid=ZbWKwL"
        >
          <i className="fab fa-facebook-f" />
        </a>
      </li>
      {/* <li>
        <a style={{ color: colored && "#00c4fc" }} href="https://twitter.com">
          <i className="fab fa-twitter" />
        </a>
      </li> */}
      <li>
        <a
          style={{ color: colored && "#dd34c1" }}
          href="https://instagram.com/dochomoeo?igshid=OGQ5ZDc2ODk2ZA=="
        >
          <i className="fab fa-instagram" />
        </a>
      </li>
      {/* <li>
        <a
          style={{ color: colored && "#ff081c" }}
          href="https://www.youtube.com/"
        >
          <i className="fab fa-youtube" />
        </a>
      </li> */}
    </ul>
  );
}
