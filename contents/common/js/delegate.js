/**
 * スコープの委譲を処理するユーティリティークラス
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 * http://clockmaker.jp/labs/120203_html5_shuffletext/ShuffleText.js
 */
var Delegate = {
  /**
   * スコープを移譲した関数を作成します。
   * @param func 実行したい関数
   * @param thisObj 移譲したいスコープ
   * @return Function 移譲済みの関数
   */
  create:function (func, thisObj) {
    var del = function () {
      return func.apply(thisObj, arguments);
    };
    //情報は関数のプロパティとして定義する
    del.func = func;
    del.thisObj = thisObj;
    return del;
  }
};
window.Delegate = Delegate;
