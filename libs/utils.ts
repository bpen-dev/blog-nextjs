import { formatInTimeZone } from 'date-fns-tz';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';

export const formatDate = (date: string) => {
  // 日付のフォーマットを 'yyyy.MM.dd' に変更
  return formatInTimeZone(new Date(date), 'Asia/Tokyo', 'yyyy.MM.dd');
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

  $('h2, h3').each((index, element) => {
    const $element = $(element);
    const text = $element.text();
    const id = `toc-${index}`;
    $element.attr('id', id);

    const tagNameProp = $element.prop('tagName');
    const tagName = typeof tagNameProp === 'string' ? tagNameProp.toLowerCase() : '';
    if (tagName === 'h2' || tagName === 'h3') {
      toc.push({
        id,
        text,
        level: tagName as 'h2' | 'h3',
      });
    }
  });

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

  $('pre').each((_, pre) => {
    const $pre = $(pre);
    if (!$pre.parent().hasClass('code-block-wrapper')) {
      $pre.wrap('<div class="code-block-wrapper"></div>');
      const wrapper = $pre.parent();
      wrapper.prepend('<button class="copy-code-button">コピー</button>');
    }
  });

  return {
    body: $.html(),
    toc,
  };
};