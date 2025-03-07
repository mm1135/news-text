export interface Article {
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[] | null;
  video_url?: string | null;
  description: string;
  content?: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_priority?: number;
  country?: string[];
  category?: string[];
  language?: string;
}

// 内部使用のためのUIで使用する型定義
export interface UIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage?: string;
}

export interface SearchParams {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
} 