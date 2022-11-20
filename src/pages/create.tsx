/*
商品登録画面	
商品 1 件の情報を登録する。ID を入力する必要はない(自動で採番される)。

HTTPメソッド
> GET データの取得
> POST　新規作成系
> PUT　編集・更新
> DELETE　削除
req.method
*/

import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
// import { useRouter } from 'next/router'; 
// const router = useRouter();

const Create = () => {
  const router = useRouter()
  // submit したときにdbに追加する
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [deleted, setDeleted] = useState(false);

  function command () {
    if (!name || !description) {
      alert('商品名、説明は入力して');
      router.reload() as any; // .reloaded()
    } else {
      submitTask()
    }
  }

  function submitTask() {
    const data = { name, price, description, deleted, file };
    fetch('http://localhost:8000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
      })
      .then(router.push("/")as any) // .reloaded()
  }
  // console.log(name);

  return (
    <div>
      <Head>
        <title>商品登録</title>
      </Head>
      <Link href="/">トップに戻る</Link>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="">商品*</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">価格</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">説明*</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">画像</label>
          <input
            type="file"
            name="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="追加"
          onClick={ command }
        />

        <input
          type="submit"
          value="削除"
          onClick={ command }
        />
      </form>

      <App />
    </div>
  );
};
export default Create;

/*
商品一覧画面	
APIから取得した商品一覧を表示する。商品ごとに詳細画面/更新画面へのリンクと削除ボタンを用意する。
表示項目は ID と 名前、説明の 3 つとする。削除ボタンが押されたときは、対象の商品を削除して一覧画面を再描画する。
*/

// データ取得表示用　後で消す
const fetcher = (resource :any, init :any) =>
  fetch(resource, init).then((res) => res.json());

function App() {
  // 商品一覧をJSON Serverから取得
  const { data, error } = useSWR('/api/items', fetcher);

  // エラーになった場合は一覧は表示できないのでここで終わり
  if (error) return <div>failed to load</div>;

  // データ取得が完了していないときはローディング画面
  if (!data) return <div>loading...</div>;

  // 取得したdataは Item[] なので、一行に一件ずつ表示
  return (
    <table>
      <tbody>
        {data.map((item :any) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}



/*
if (!name || !description) {
  alert('商品名、説明は入力して');
  data.abort();
  router.reload() as any // .reloaded()
}
*/
