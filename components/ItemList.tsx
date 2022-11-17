/*
商品一覧画面	
APIから取得した商品一覧を表示する。商品ごとに詳細画面/更新画面へのリンクと削除ボタンを用意する。
表示項目は ID と 名前、説明の 3 つとする。削除ボタンが押されたときは、対象の商品を削除して一覧画面を再描画する。
*/

import useSWR from 'swr';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from 'next';

const fetcher = (resource: string, init: any) =>
fetch(resource, init).then((res) => res.json());

function ItemList() {
  // 商品一覧をJSON Serverから取得
  const router = useRouter();
  const { data, error } = useSWR(
    'http://localhost:8000/items',
    fetcher
  );

  // エラーになった場合は一覧は表示できないのでここで終わり
  if (error) return <div>failed to load</div>;

  // データ取得が完了していないときはローディング画面
  if (!data) return <div>loading...</div>;
  // 取得したdataは Item[] なので、一行に一件ずつ表示
  // console.log(data)

  function deleteTask(e: any) {
    const id = e.target.id
    console.log(id);
    fetch(`http://localhost:8000/items/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(router.reload() as any) // .reloaded()
  }
  


  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link href={`/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.description}</td>
              <td>
                <input id ={`${item.id}`}
                  type="submit"
                  value="削除"
                  onClick={deleteTask}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default ItemList;

/*
 削除ボタン
onclickでbooleanフラッグを反転させる
booleanが'true'のものを非表示にする

*/



// const uni= document.getElementById("main").addEventListener('click', hoge, false)
// function hoge(e: any){
//   console.log(e.target.id)
// }
