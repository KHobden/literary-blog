import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `
# About Me  

Hi, welcome to my website. My name is Sophie and I’m an aspiring writer. 

After completing a creative writing course earlier this year, I started this website to begin sharing my writing publicly. 

I have always loved the act of writing and storytelling, with my inspiration being planted and watered through books and films as a child. I’m excited to finally be transferring my countless notebooks of writing to this online space. 

Whilst I’ll be reserving some of my book drafts from here, I will be sharing my writing in its varying forms, including book and film reviews, articles and my own fiction pieces. 

I hope you enjoy reading the content I share and if you would like to share your thoughts on my writing; feel free to comment on my posts or contact me through my Instagram page: [@sophieg_writes](https://www.instagram.com/sophieg_writes/).

![Sophie Inside](/images/sophie_bw.jpg)
`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Sophie and her writing",
    openGraph: {
      title: "About Me",
      description: "Learn more about Sophie and her writing",
      images: [
        signOgImageUrl({
          title: "Sophie",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
