import { NextResponse, NextRequest } from 'next/server';
import { createContact } from '@/libs/microcms';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// レートリミッターを初期化
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  // 60秒（1分）に3回までのリクエストを許可
  limiter: Ratelimit.slidingWindow(3, '60 s'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: '1分間の送信上限に達しました。時間をおいて送信をお願いいたします。' },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();


    // ↓↓↓ ここから日本語チェックのロジックを追加 ↓↓↓
    const message = json.message as string;
    // 日本語（ひらがな、カタカナ、漢字）が含まれているかチェックする正規表現
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;

    if (!japaneseRegex.test(message)) {
      return NextResponse.json(
        { error: 'お問い合わせは日本語でお願いいたします。Please write your inquiry in Japanese.' },
        { status: 400 }
      );
    }
    // ↑↑↑ ここまで追加 ↑↑↑

    const data = await createContact({
      name: json.name,
      email: json.email,
      message: message, // チェック済みのメッセージを使用
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}