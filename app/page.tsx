'use client';

import { useState, useEffect } from 'react';
import {  UIArticle } from '@/lib/types';
import { NewsList } from '@/components/NewsList';
import { SearchForm } from '@/components/SearchForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sampleArticles } from '@/lib/sample-data';

// 型定義を明示的に追加
interface NewsDataItem {
  source_id: string;
  creator?: string[] | null;
  title: string;
  description: string;
  link: string;
  image_url: string | null;
  pubDate: string;
  content?: string | null;
}

// インライン・ページネーションコンポーネント
const SimplePagination = ({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPrevious: () => void; 
  onNext: () => void; 
}) => {
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button 
        onClick={onPrevious} 
        disabled={currentPage <= 1}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          "flex items-center gap-1"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>前へ</span>
      </button>
      
      <span className="mx-4 text-sm font-medium">
        {currentPage} / {totalPages}
      </span>
      
      <button 
        onClick={onNext} 
        disabled={currentPage >= totalPages}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          "flex items-center gap-1"
        )}
      >
        <span>次へ</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function Home() {
  const [articles, setArticles] = useState<UIArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    q: '',
    category: '',
    pageSize: 9,
  });
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        pageSize: searchParams.pageSize.toString(),
      });
      
      if (searchParams.q) {
        queryParams.append('q', searchParams.q);
      }
      
      if (searchParams.category) {
        queryParams.append('category', searchParams.category);
      }
      
      if (nextPageToken) {
        queryParams.append('nextPage', nextPageToken);
      }
      
      console.log('フロントエンドからのリクエスト:', `/api/news?${queryParams.toString()}`);
      
      const response = await fetch(`/api/news?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(`NEWSDATA.IO API エラー: ${data.message || '不明なエラー'}`);
      }
      
      if (!data.results || data.results.length === 0) {
        console.warn('APIからの記事データが空です', data);
        
        if (searchParams.q || searchParams.category) {
          setArticles([]);
          setTotalResults(0);
        } else {
          console.log('サンプルデータを使用します');
          setArticles(sampleArticles);
          setTotalResults(sampleArticles.length);
        }
      } else {
        const formattedArticles = data.results.map((item: NewsDataItem) => ({
          source: {
            id: item.source_id,
            name: item.source_id
          },
          author: item.creator ? item.creator.join(', ') : null,
          title: item.title,
          description: item.description || '',
          url: item.link,
          urlToImage: item.image_url,
          publishedAt: item.pubDate,
          content: item.content || item.description
        }));
        
        setArticles(formattedArticles);
        setTotalResults(data.totalResults || formattedArticles.length);
        
        if (data.nextPage) {
          setNextPageToken(data.nextPage);
        } else {
          setNextPageToken(null);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      console.error('ニュースデータ取得エラー:', err);
      
      console.log('サンプルデータを使用します');
      setArticles(sampleArticles);
      setTotalResults(sampleArticles.length);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams]);

  const handleSearch = (values: { q?: string; category?: string }) => {
    setPage(1); // 検索時にページをリセット
    setSearchParams({
      ...searchParams,
      q: values.q || '',
      category: values.category || '',
    });
  };

  const totalPages = Math.ceil(totalResults / searchParams.pageSize);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">最新ニュース</h1>
      
      <div className="mb-8">
        <SearchForm 
          onSearch={handleSearch} 
          defaultValues={{ q: searchParams.q, category: searchParams.category }}
        />
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <NewsList articles={articles} isLoading={isLoading} />
      
      {totalPages > 1 && (
        <SimplePagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPrevious={() => {
            if (page > 1) {
              setPage(prev => prev - 1);
            }
          }}
          onNext={() => {
            if (nextPageToken) {
              setPage(prev => prev + 1);
            }
          }}
        />
      )}
    </main>
  );
}
