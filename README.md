# bitflyer_logger
bitFlyerのログを保存するだけのNodejsスクリプト
ticker/board/board_snapshot/executions を現物とFX全て、受信時刻と共に日付毎に保存します。

# 使い方
start.jsを実行するだけ。
socket-io.clientとfsはnpmなりyarnなりで入れて下さい。
pm2なりforeverなりで常時起動してあげたほうが良いかもしれない。
エラーチェックとかはサボってるので、そのあたりは各自で弄ったほうがいいかも。
