import { UIArticle } from "@/lib/types";
import { NewsCard } from "@/components/NewsCard";

interface NewsListProps {
  articles: UIArticle[];
  isLoading: boolean;
}

export function NewsList({ articles, isLoading }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">記事が見つかりませんでした</h3>
        <p className="mt-2 text-sm text-gray-500">検索条件を変更してお試しください。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
} 