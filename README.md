# 管理者向け情報

## イベントページの作成方法

### おことわり

[mustache構文](http://mustache.github.io/)を用いることがある。

### 記事の作成

`src/events/{{西暦}}/{{イベントid}}.md`を作成する。
内容は以下のcode blockをコピペする。時刻は[RFC3339](https://www.rfc-editor.org/rfc/rfc3339.html)で記述する。
イベントidは[URL](https://datatracker.ietf.org/doc/html/rfc1738)で使える文字である必要がある。

`title`、`dtstart`、`dtend`、`location`、`summary`、`datePublished`は機械可読性を上げるために（[RSS](https://ja.wikipedia.org/wiki/RSS)や[iCalendar](https://ja.wikipedia.org/wiki/ICalendar)）、あえて文章の中に書くことはせず、pageのparameterとして与える方式にしている。`until-lt0x02`の[Markdown](https://github.com/until-tsukuba/until-tsukuba.github.io/blob/master/src/events/2023/until-lt0x02.md)と[HTML](https://until-tsukuba.github.io/events/2023/until-lt0x02/)を見比べるとわかるように、これら全てはHTMLにも出力される。

```md
---json
{
    "layout": "event",
    "tags": "event",
    "title": "{{イベント名}}",
    "dtstart": "{{イベント開始時間}}",
    "dtend": "{{イベント終了時間}}",
    "location": "`{{場所}}",
    "summary": "{{概要}}",
    "datePublished": "{{公開日時}}",

    "ogp_type": "article"
}
---

（ここに概要を入力する。見出しは極力使わないようにする。この括弧書きは削除する）
```