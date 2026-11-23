# UTokyo OA

デスクトップ版 Chrome のツールバーから、論文ページを東京大学の OpenAthens 経由で開き直す拡張機能です。

## インストール

1. [GitHub Releases](https://github.com/rtr-dnd/openathens-extension/releases/latest) から `utokyo-oa.zip` をダウンロードして解凍し、`utokyo-oa` フォルダを保管します。
2. Chrome のアドレスバーに `chrome://extensions` と入力し、右上の「デベロッパー モード」をオンにします。
3. 「パッケージ化されていない拡張機能を読み込む」を押し、`manifest.json` が入っている `utokyo-oa` フォルダを選びます。
4. Chrome のパズルピースのアイコンから「UTokyo OA」をピン留めします。

[Chrome 公式の読み込み手順](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)

## 使い方

- **現在のページ**を開き直すには、ツールバーのアイコンをクリックします。同じタブで開き直します。
- **Web ページ上の DOI** を開くには、`10.…/…` の DOI 全体、または `https://doi.org/…` を選択してアイコンをクリックします。選択が DOI の形式に合わないときは、現在のページを開き直します。
- **PDF や埋め込みフレーム上の DOI** は、文字列を選択して右クリックし、「選択した DOI を UTokyo OA で開く」を選びます。項目が表示されない場合は、DOI をコピーし、ツールバーのアイコンを右クリックして「DOI を貼り付けて開く」を選びます。新しいタブの入力欄に貼り付けて開きます。

UTokyo VPN をオフにし、求められたら UTokyo Account でサインインしてください。リダイレクタ経由でアクセスできない場合は、出版社サイトの機関ログインから「The University of Tokyo (東京大学) - OpenAthens」を選んでください。[東京大学附属図書館の案内](https://www.lib.u-tokyo.ac.jp/ja/library/literacy/user-guide/campus/offcampus)・[出版社別のアクセス手順](https://www.ms.u-tokyo.ac.jp/library/remote.html)
