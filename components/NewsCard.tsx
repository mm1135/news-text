import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UIArticle } from "@/lib/types";
import Image from "next/image";
import { Calendar, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface NewsCardProps {
  article: UIArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const [imageError, setImageError] = useState(false);
  const [isValidHostname, setIsValidHostname] = useState(false);
  
  // 許可されたホスト名リスト
  const validHostnames = [
    'via.placeholder.com',
    'media.istockphoto.com',
    'images.unsplash.com'
  ];
  
  useEffect(() => {
    if (article.urlToImage) {
      try {
        const url = new URL(article.urlToImage);
        setIsValidHostname(validHostnames.includes(url.hostname));
      } catch {
        setIsValidHostname(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.urlToImage]);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        {article.urlToImage && !imageError && isValidHostname ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
            priority={true}
          />
        ) : article.urlToImage && !imageError ? (
          <div className="relative h-full w-full">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              onError={() => setImageError(true)}
              unoptimized={!isValidHostname}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center flex-col">
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-gray-500">{article.source.name}</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {article.description || '説明はありません'}
        </p>
      </CardContent>
      <CardFooter>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          続きを読む →
        </a>
      </CardFooter>
    </Card>
  );
} 