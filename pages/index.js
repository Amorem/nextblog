import Link from "next/link";
import fs from "fs";

const Home = ({ slugs }) => (
  <div>
    {slugs.map(slug => (
      <div key={slug}>
        <Link href={`/blog/${slug}`}>
          <a>{slug}</a>
        </Link>
      </div>
    ))}
  </div>
);

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  return {
    props: {
      slugs: files.map(filename => filename.replace(".md", ""))
    }
  };
};

export default Home;
