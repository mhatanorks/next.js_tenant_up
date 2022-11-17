/*
商品一覧画面	
APIから取得した商品一覧を表示する。商品ごとに詳細画面/更新画面へのリンクと削除ボタンを用意する。
表示項目は ID と 名前、説明の 3 つとする。削除ボタンが押されたときは、対象の商品を削除して一覧画面を再描画する。
*/


import Head from "next/head";
import Link from "next/link";
import ItemList from "../../components/ItemList";


const ItemListPage = (context: string) => {
  return (
      <>
        <Head>
          <title>商品一覧</title>
        </Head>
        <Link href="/"><h1 >商品一覧</h1></Link>
        <ItemList />
        <Link href="./create"><button>登録/編集</button></Link>
        <Link href='./login'><button>ログイン</button></Link>

      </>
  );
};
export default ItemListPage;
