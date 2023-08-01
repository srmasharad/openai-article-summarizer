import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

import {
  AlertCircle,
  CheckCheck,
  Copy,
  CornerDownLeft,
  Link2,
  Loader,
  Trash2,
} from 'lucide-react';

import { useLazyGetSummaryQuery } from '@/redux/article';

import Skeleton from './Skeleton';

interface SummaryProps {
  url: string;
  summary: string;
}

const Demo = () => {
  const [article, setArticle] = useState<SummaryProps>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<SummaryProps[]>([]);
  const [copied, setCopied] = useState<string | null>("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("articles") as string);

    if (articles) {
      setAllArticles(articles);
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data?.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (e: MouseEvent<SVGSVGElement>, url: string) => {
    e.stopPropagation();

    setCopied(url);
    navigator.clipboard.writeText(url);

    setTimeout(() => {
      setCopied(null);
    }, 3000);
  };

  const handleDelete = (e: MouseEvent<SVGSVGElement>, index: number) => {
    e.stopPropagation();
    const updatedAllArticles = [...allArticles];
    updatedAllArticles.splice(index, 1);

    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
  };

  return (
    <section className="flex justify-center mt-6">
      <div className="flex flex-col w-full gap-6 xl:w-2/4 md:w-3/4">
        <form onSubmit={onSubmit} className="relative">
          <Link2
            size={18}
            strokeWidth={1.75}
            className="text-slate-400 absolute top-0 left-0 h-full w-12 p-3.5"
          />
          <input
            type="url"
            value={article.url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, url: e.currentTarget.value })
            }
            placeholder="Enter a URL"
            className="w-full rounded-lg border py-3.5 px-12 text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 peer"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-sm font-medium text-slate-400 focus-visible:text-slate-900 focus-visible:outline-none peer-focus:text-slate-900"
          >
            {isFetching ? (
              <Loader size={18} className="text-slate-400 animate-spin" />
            ) : (
              <CornerDownLeft strokeWidth={1.75} size={18} />
            )}
          </button>
        </form>

        <div className="flex flex-col gap-1.5 overflow-y-auto max-h-60">
          {allArticles.map((article, index) => (
            <div
              key={`article-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                setArticle(article);
              }}
              className="flex flex-row items-center justify-between gap-2 px-5 py-2.5 text-sm border rounded-md border-orange-300/10 bg-orange-50 group/url cursor-pointer hover:bg-orange-100"
            >
              <p className="text-orange-600 truncate">{article.url}</p>
              <div className="flex flex-row gap-1.5 items-center">
                {copied !== article.url ? (
                  <Copy
                    onClick={(e) => handleCopy(e, article.url)}
                    size={16}
                    className="invisible cursor-pointer text-orange-500/60 group-hover/url:visible"
                  />
                ) : (
                  <CheckCheck
                    size={16}
                    className="cursor-pointer text-orange-500/60"
                  />
                )}
                <Trash2
                  onClick={(e) => handleDelete(e, index)}
                  size={16}
                  className="invisible cursor-pointer text-orange-500/60 group-hover/url:visible"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 mb-10">
          {isFetching && <Skeleton />}

          {article.summary && !error && !isFetching && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Article <span className="text-orange-500">Summary</span>
              </h2>
              <div className="py-6 rounded-md px-7 bg-slate-100/60">
                <p className="text-sm leading-6 text-slate-600">
                  {article.summary}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex gap-3 px-5 py-4 text-sm rounded-md text-rose-500 bg-rose-50">
              <div className="mt-0.5 w-4">
                <AlertCircle size={16} />
              </div>
              <div className=" flex flex-col gap-1.5">
                <h4 className="font-semibold">Oops! Something went wrong</h4>
                <p>
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    error?.data?.error
                  }
                </p>
              </div>
            </div>
          )}

          <p className="max-w-lg mx-auto mt-5 text-xs leading-5 text-center text-slate-400">
            Free summarize articles preview. Extract text corpus from the page.
            Make sure you try to summarize a news article or another page with
            clearly defined blocks of text.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Demo;
