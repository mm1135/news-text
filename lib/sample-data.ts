import { UIArticle } from './types';

export const sampleArticles: UIArticle[] = [
  {
    source: {
      id: 'sample-source-1',
      name: 'サンプルニュース'
    },
    author: 'サンプル著者',
    title: 'これはサンプル記事のタイトルです',
    description: 'これはサンプル記事の説明文です。API接続がうまくいかない場合に表示されます。',
    url: 'https://example.com',
    urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'これはサンプル記事の内容です。実際のAPIからデータが取得できない場合に表示されます。'
  },
  {
    source: {
      id: 'sample-source-2',
      name: '技術ニュース'
    },
    author: '技術ライター',
    title: 'プログラミング言語ランキング2023',
    description: '2023年最も人気のあるプログラミング言語のランキングが発表されました。',
    url: 'https://example.com/tech',
    urlToImage: 'https://via.placeholder.com/800x400?text=プログラミング',
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1日前
    content: 'JavaScriptが引き続き最も人気のあるプログラミング言語となっています。続いてPython、Java、TypeScriptが続きます。'
  },
  {
    source: {
      id: 'sample-source-3',
      name: 'ビジネスニュース'
    },
    author: '経済アナリスト',
    title: '株式市場、先週比3%上昇',
    description: '先週の株式市場は総じて好調でした。主要指数は3%以上の上昇を記録しました。',
    url: 'https://example.com/business',
    urlToImage: 'https://via.placeholder.com/800x400?text=株式市場',
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2日前
    content: '好調な企業業績と景気回復への期待感から、株式市場は先週比で3%以上上昇しました。特にテクノロジーセクターが好調でした。'
  },
  {
    source: {
      id: 'sample-source-4',
      name: 'スポーツニュース'
    },
    author: 'スポーツ記者',
    title: '日本代表、国際大会で金メダル獲得',
    description: '日本代表チームが国際大会で見事金メダルを獲得しました。',
    url: 'https://example.com/sports',
    urlToImage: 'https://via.placeholder.com/800x400?text=日本代表',
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3日前
    content: '日本代表チームは昨日行われた決勝戦で強豪国を破り、見事金メダルを獲得しました。代表選手たちの努力が実を結びました。'
  },
  {
    source: {
      id: 'sample-source-5',
      name: '科学ニュース'
    },
    author: '科学ジャーナリスト',
    title: '新種の深海生物が発見される',
    description: '科学者たちが深海調査で新たな生物種を発見したと発表しました。',
    url: 'https://example.com/science',
    urlToImage: 'https://via.placeholder.com/800x400?text=深海生物',
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4日前
    content: '海洋研究チームは、深さ8,000メートルの海底で、これまで知られていなかった新種の生物を発見しました。この発見は海洋生態系の理解を深める重要な一歩となります。'
  },
  {
    source: {
      id: 'sample-source-6',
      name: 'エンタメニュース'
    },
    author: 'エンタメライター',
    title: '人気映画の続編が来年公開決定',
    description: '大ヒット映画の続編が来年夏に公開されることが決定しました。',
    url: 'https://example.com/entertainment',
    urlToImage: 'https://via.placeholder.com/800x400?text=映画',
    publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5日前
    content: '大ヒット映画の続編が制作されることが正式に発表されました。前作の主要キャストが続投し、来年夏の公開が予定されています。'
  }
]; 