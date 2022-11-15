/*
商品詳細画面
商品 1 件の情報を表示する。商品のすべてのプロパティを表示する。
商品の情報を編集することもできる。ただし、ID は変更できない。

編集(更新) HTTPメソッド `PUT`
*/


import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";



// Post ページ
export default function Post({
  postData,
}: {
  postData: {
  name: string;
  description: string;
  id: number;
  price: number;
  imageUrl: string;
  };
}) {
  return (
    <>
      <Head>{postData.name}</Head>
      <article>
        <div>{postData.id}</div>
        <div>{postData.name}</div>
        <div>{postData.price}</div>
        <div>{postData.description}</div>
        <div>{postData.imageUrl}</div>
      </article>
    </>
  );
}
