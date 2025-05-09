"use client";
import { GetPostResult } from "@/lib/wisp";
import { cp } from "fs";
import Link from "next/link";
import sanitize, { defaults } from "sanitize-html";

export const PostContent = ({ content }: { content: string }) => {
  // Sanitises html content received from Wisp
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "br",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      // tables
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });
  return (
    <div
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

function removeLastPTag(content: string) {
  // Create a new DOMParser instance to parse the HTML string into a document
  const parser = new DOMParser();
  
  // Parse the content into an HTML document
  const doc = parser.parseFromString(content, "text/html");

  // Log the original content before removal for debugging purposes
  console.log("Content before removal:", content);

  // Get all <p> tags in the parsed document
  const paragraphs = doc.querySelectorAll("p");

  // If there are any <p> tags, remove the last one
  if (paragraphs.length > 0) {
    console.log("Removing the last paragraph:", paragraphs[paragraphs.length - 1].outerHTML);
    paragraphs[paragraphs.length - 1].remove();
  }

  // Return the modified HTML content
  return doc.body.innerHTML;
}


export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {

  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags } = post;
  const content_without_last_p_tag = removeLastPTag(content);

  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{title}</h1>
        <PostContent content={content_without_last_p_tag} />

        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="text-primary mr-2"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("en-GB").format(
            new Date(publishedAt || createdAt)
          )}
        </div>
      </div>
    </div>
  );
};
