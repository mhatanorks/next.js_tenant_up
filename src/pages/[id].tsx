/*
商品詳細画面
商品 1 件の情報を表示する。商品のすべてのプロパティを表示する。
商品の情報を編集することもできる。ただし、ID は変更できない。

編集(更新) HTTPメソッド `PUT`
*/
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from 'next';


function Post({
  postData,
}: {
  postData: {
    name: string;
    id: number;
    price: number;
    description: string;
  };
}) {
  const router = useRouter();
  const [name, setName] = useState('');

  function submitProduct() {
    const data = { name };
    fetch(`http://localhost:8000/items/${postData.id}`, {
      method: 'PATCH',
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
      .then(router.reload() as any); // .reloaded()
  }
  return (
    <div>
      <Head>{postData.name}</Head>
      <article>
        <div>識別番号:{postData.id}</div>
        <div>
          商品名:{postData.name}
          <input
            type="text"
            name="price"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" value="更新" onClick={submitProduct} />
        </div>

        <div>価格:{postData.price}</div>
        <div>説明:{postData.description}</div>
        <div>
          画像:
          <Image src='' width={500} height={500} alt='pic'/>
        </div>
      </article>
      <Link href="/">トップへ戻る</Link>
    </div>
  );
}
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:8000/items');
  const jsonData = await res.json();
  const paths = jsonData.map((item: any) => ({
    params: {
      id: item.id.toString() as string,
    } as any,
  }));
  return {
    //pathsの中 params: {id: '1'} ......
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uni = params as any;
  const res = await fetch(`http://localhost:8000/items/${uni.id}`);
  const postData = await res.json();
  return {
    props: {
      postData,
    },
  };
};

// 更新

// ver.修平さん
// export async function getStaticPaths() {
//   //ここが問題↓
//   const response = await fetch("http://localhost:8000/items/")
//   const jsonData = await response.json()
//   const paths = jsonData.map((db) => ({
//       params: { id: db.id.toString() }
//   }))
//   return {
//       //pathsの中 params: {id: '1'} ......
//       paths: paths,
//       fallback: false,
//   }
// }

// export async function getStaticProps({ params }) {
//   const res = await fetch(`http://localhost:8000/items/${params.id}`)
//   const post = await res.json()
//   return {
//       props: {
//           post: {
//               id: post.id,
//               name: post.name,
//               description:post.description
//           }
//       }
//   }
// }

// export default function Page({ post }) {
//   return (
//       <dl>
//           <dt>ID:{post.id}</dt>
//           <dt>商品名:{post.name}&nbsp;&nbsp;<button type="button">商品名編集</button></dt>
//           <dt>説明:{post.description}&nbsp;&nbsp;<button type="button">説明文編集</button></dt>
//       </dl>
//   )
// }
