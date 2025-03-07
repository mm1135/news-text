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
  
  // 日本のニュースに特化した設定
  const url = 'https://newsdata.io/api/1/latest';
  
  const queryParams = new URLSearchParams({
    apikey: process.env.NEWSDATA_API_KEY || '',
    country: 'jp',  // 日本のニュースソース
    size: params.pageSize?.toString() || '10'
  });
  
  // 検索キーワードがある場合は日本語キーワード優先
  if (params.q) {
    queryParams.append('q', params.q);
  } else {
    // デフォルトで日本に関連するキーワードを追加するオプション
    // queryParams.append('q', '日本 OR Japan');
  }
  
  // カテゴリ
  if (params.category && params.category !== 'all') {
    queryParams.append('category', params.category);
  }
  
  // ページネーション
  const nextPage = searchParams.get('nextPage');
  if (nextPage) {
    queryParams.append('page', nextPage);
  }
  
  // リクエストURL
  const apiUrl = `${url}?${queryParams.toString()}`;
  
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