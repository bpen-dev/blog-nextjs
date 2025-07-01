import { formatInTimeZone } from 'date-fns-tz';
import { load } from 'cheerio';
import hljs from 'highlight.js';
// 読み込むCSSを 'a11y-light.css' に変更
import 'highlight.js/styles/a11y-light.css';

export const formatDate = (date: string) => {
  return formatInTimeZone(new Date(date), 'Asia/Tokyo', 'd MMMM, yyyy');
};

/**
 * 目次の各項目の型定義
 */
export type TocItem = {
  text: string;
  id: string;
  level: 'h1' | 'h2' | 'h3';
};

/**
 * リッチテキストを処理し、目次とシンタックスハイライト適用後のHTMLを生成する
 * @param richText microCMSから取得したリッチテキストHTML
 * @returns { body: string, toc: TocItem[] }
 */
export const processRichText = (richText: string): { body: string; toc: TocItem[] } => {
  const $ = load(richText, { xmlMode: false });
  const toc: TocItem[] = [];

  // h2, h3 タグを検索してIDを付与し、目次リストを生成
  // （h1は記事タイトルとして使用されるため、通常は目次に含めません）
  $('h2, h3').each((index, element) => {
    const $element = $(element);
    const text = $element.text();
    // ページ内リンク用のユニークなIDを生成
    const id = `toc-${index}`;
    $element.attr('id', id);

    const tagNameProp = $element.prop('tagName');
    const tagName = typeof tagNameProp === 'string' ? tagNameProp.toLowerCase() : '';
    // 型安全のためのチェック
    if (tagName === 'h2' || tagName === 'h3') {
      toc.push({
        id,
        text,
        level: tagName as 'h2' | 'h3',
      });
    }
  });

  // シンタックスハイライト
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, '') || '' });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $('pre code').each((_, elm) => {
    const lang = $(elm).attr('class');
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });

  return {
    body: $.html(),
    toc,
  };
};