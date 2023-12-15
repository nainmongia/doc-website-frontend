import Link from "next/link";

export default function PostCardTwo({ data }) {
  return (
    <div className="post-card-two">
      <div className="post-card-two__image">
        <img src={data.thumbImage} alt={data.title} />
        <div className="post-card-two__info">
          <div className="post-card-two__info__date">
            <h5>05</h5>
            <p>Feb</p>
          </div>
          <div className="post-card-two__info__detail">
            <p>
              by <span>{data.author}</span>
            </p>
            <Link href="#">
              <a>{data.category}</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="post-card-two__content">
        <Link
          href={process.env.PUBLIC_URL + "/blog/post/[slug]"}
          as={process.env.PUBLIC_URL + "/blog/post/" + data.slug}
        >
          <a>{data.title}</a>
        </Link>
        <p>{data.description}</p>
      </div>
    </div>
  );
}
