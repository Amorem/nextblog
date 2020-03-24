import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";

const Post = ({ content, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        <div>Content below</div>
        <pre>{content}</pre>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace(".md", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();
  const parsedMarkdown = matter(markdownWithMetadata);
  return {
    props: {
      content: parsedMarkdown.content,
      data: parsedMarkdown.data
    }
  };
};

export default Post;
