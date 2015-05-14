# 参照URL
# http://morizyun.github.io/blog/ruby-nokogiri-scraping-tutorial/
# http://himaratsu.hatenablog.com/entry/2013/04/27/002249

require 'cgi'
require 'open-uri'
require 'nokogiri'

issues = [
  # 制作のテーマ
  'Poetic Computation',
  'アルゴリズム',
  '偶発性',
  'テレプレゼンス',
  '共感覚',
  '学びのプロセス',
  '方法論を作る',
  '実験的',
  '構造を発見する',
  'Playful Learning',
  '魔法',
  'コミュニティを作る',
  'ワンアイディア',
  'シンクロ',
  '保育園',
  '身の周りにある数理',
  '枯れた技術の水平思考',
  '問題意識',
  'プライバシー',
  'プロレス',
  'これでいいのだ',

  # デザインに関連する言葉 
  'Openness',
  'Generative',
  'アーキテクチャ',
  'インタラクション',
  'デザイン',
  'プログラミング',
  'インキュベーション',
  'インターフェイスデザイン',
  '美学',
  '思想',
  'ハック',
  'デジタル',
  'センサー',
  '表象',
  '物理シミュレーション',

  # テクノロジー
  'Web',
  'インターネット',
  'CG',

  # カメラ
  '70D',

  # 事務所
  'co-ba',
  '赤坂',
  'EKRITS',

  # 趣味
  '仏教',

  # 人
  'タモリ',
  'Alan kay',
  'Hiroshi Ishii',
  'yugop',

  # 表現手法
  'サブピクセルレンダリング',
  'グリッチ',
  'swiss style design',
  'アスキーアート',
  '光',

  # ゲーム
  'Rez',

  # テレビ
  'ピタゴラスイッチ',
  'コイケヤ スコーン',
  'デザインあ',

  # タモリネタ
  '偽善',
  'マナー',
  '様式',
  'Y字路',
  '無意味',
  '生理的に',
  '怠けたい',
  '詐欺師',
  'ジャズな人',
  'ギャグ',
  'ハプニング',
  '素人芸',
  'パロディ',

  # 鉄道関連
  'JR-SH9',

  # その他
  '活きて生きる'
]



# 日本語のみURLエンコード
def encode_ja(url)
  ret = ""
  url.split(//).each do |c|
    if /[-_.!~*'()a-zA-Z0-9;\/\?:@&=+$,%#]/ =~ c      
      ret.concat(c)
    else
      ret.concat(CGI.escape(c))
    end
  end
  p ret
end

# 画像検索する処理
def get_image(query)
  url = encode_ja('http://image.search.yahoo.co.jp/search?p=' + query + '&ei=UTF-8&rkf=1') # Yahoo
  charset = nil
  html = open(url) do |f|
    charset = f.charset #文字種別を取得
    f.read #htmlを読み込んで変数htmlに渡す
  end

  # htmlをパース（解析）してオブジェクトを生成
  doc = Nokogiri::HTML.parse(html, nil, charset)

  # ノードのデータを取得（Yahoo）
  node = doc.xpath('//div[@class="gridmodule"]/div/p')
  node.css('a').attribute('href').value
end  


# 外部ファイルに書き込む処理
io = File.open("js/issues.js", "w")
  io.print "var ISSUES = ["

  # issues変数からデータを移す
  last_issue = issues[issues.size - 1]
  issues.each do |issue|
    if issue != last_issue
      io.print "'#{issue}', '#{get_image(issue)}', "
    else
      io.print "'#{issue}', '#{get_image(issue)}'"
    end
  end

  io.print "];"
io.close

