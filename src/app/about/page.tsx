import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `
# About Me  

Hi, I'm Sophie—an aspiring writer with a passion for storytelling in all its forms. I love diving deep into the worlds of books and films, analyzing the intricacies of character, plot, and theme. When I’m not reviewing the latest releases, I’m crafting my own short stories—blending vivid characters, evocative settings, and thought-provoking narratives.  

Exploring the human experience, capturing fleeting moments, and building immersive worlds drive my writing. I believe that a great story lingers long after the final page or credits roll.  

![Sophie Inside](/images/sophie-inside.jpg)

---

📫 **Get in Touch**  
I'd love to connect! Whether you want to chat about a recent review, discuss writing, or just say hi, feel free to reach out:  

- **Email:** [sophie.e.grubb@gmail.com](mailto:sophie.e.grubb@gmail.com)  
- **LinkedIn:** [@sophie-grubb](https://www.linkedin.com/in/sophie-grubb-5b272518b/)  
- **Instagram:** [@sophie_grubbbb](https://www.instagram.com/sophie_grubbbb/)  

`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Samantha and her travel adventures",
    openGraph: {
      title: "About Me",
      description: "Learn more about Samantha and her travel adventures",
      images: [
        signOgImageUrl({
          title: "Samantha",
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
