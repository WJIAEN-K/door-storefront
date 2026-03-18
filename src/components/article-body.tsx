import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-md space-y-4 text-base leading-7 text-stone-700 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-stone-950 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-stone-950 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-7 [&_strong]:font-semibold [&_strong]:text-stone-900 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:font-medium [&_a]:text-[#9a6a43] [&_a]:underline-offset-2 hover:[&_a]:underline">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{markdown}</ReactMarkdown>
    </div>
  );
}
