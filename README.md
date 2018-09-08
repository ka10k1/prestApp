# prestApp
macとwindowsの共通化を行うにあたっての注意点
・gitについて
	.git/configの設定は[core]に下記追記しておくように
		autoCRLF = false
		longpaths  = true　(※macであれば不要)
		
・moduleの追加について
	ReactNativeを使うにあたって様々なライブラリをインストールすると思いますが、その場合は「ライブラリ一覧.xlsx」の内容を変更すること。
	またライブラリを追加する際にはmac系はmacで、win系はwindowsでインストールすること
