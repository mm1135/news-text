import { NextRequest, NextResponse } from 'next/server';
import { SearchParams } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const params: SearchParams = {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10
  };
  
  // 正しいエンドポイント
  const url = 'https://newsdata.io/api/1/latest';
  
  // 基本パラメータ
  const queryParams = new URLSearchParams({
    apikey: process.env.NEWSDATA_API_KEY || ''
  });
  
  // サイズパラメータは 'size'
  queryParams.append('size', params.pageSize?.toString() || '10');
  
  // 検索キーワード
  if (params.q) {
    queryParams.append('q', params.q);
  }
  
  // カテゴリ
  if (params.category && params.category !== 'all') {
    queryParams.append('category', params.category);
  }
  
  // 日本の国コードは維持し、言語コードを削除
  queryParams.append('country', 'jp');  // 日本のニュース
  // language パラメータは削除（サポートされていないため）
  
  // ページネーション
  const nextPage = searchParams.get('nextPage');
  if (nextPage) {
    queryParams.append('page', nextPage);
  }
  
  // リクエストURL
  const apiUrl = `${url}?${queryParams.toString()}`;
  const debugUrl = apiUrl.replace(process.env.NEWSDATA_API_KEY || '', '【API KEY】');
  
  try {
    const response = await fetch(apiUrl, {
      signal: AbortSignal.timeout(15000)
    });
    
    const data = await response.json();
    
    // 詳細なAPIレスポンスログ
    console.log('API Response Status:', data.status);
    console.log('API Response Data:', JSON.stringify(data).substring(0, 500) + '...');
    
    // エラー処理を追加
    if (data.status === 'error') {
      console.error('NEWSDATA.IO API Error:', data.results?.message || 'Unknown error');
      // エラー情報をフロントエンドに渡す
      return NextResponse.json({
        status: 'error',
        message: data.results?.message || '不明なエラー'
      });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('NEWSDATA.IO API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'ニュースデータの取得に失敗しました', error: String(error) },
      { status: 500 }
    );
  }
} 