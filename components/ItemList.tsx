/*
商品一覧画面	
APIから取得した商品一覧を表示する。商品ごとに詳細画面/更新画面へのリンクと削除ボタンを用意する。
表示項目は ID と 名前、説明の 3 つとする。削除ボタンが押されたときは、対象の商品を削除して一覧画面を再描画する。
*/

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

function ItemList() {
  // 商品一覧をJSON Serverから取得
  const { data, error } = useSWR('/api/items', fetcher);

  // エラーになった場合は一覧は表示できないのでここで終わり
  if (error) return <div>failed to load</div>;

  // データ取得が完了していないときはローディング画面
  if (!data) return <div>loading...</div>;

  // 取得したdataは Item[] なので、一行に一件ずつ表示
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>説明</th>
          <th>画像</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link href={`api/items/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.description}</td>
              <td>
                <button>削除</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default ItemList;
