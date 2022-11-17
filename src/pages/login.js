import Link from 'next/link';
import { useState } from 'react';

export default function LoginForm() {
    const initValues = { username: "", password: "" }; // useStateの中身をまとめる
    const [formValues, setFormValues] = useState(initValues);


    function handleChange (e) {
        console.log(e.target)
        const {name, value} = e.target;  // 分割代入 name属性、入力したテキスト
        setFormValues({...formValues, name:  value}) // name = e.targetのname属性（username）
        console.log(formValues);
    }




  return (
    <>
      <h1>ログインフォーム</h1>
      <form action="">
        <div>
          <label htmlFor="">名前</label>
          <input
            type="text"
            name="username"
            // value={username}
            onChange={(e) => handleChange(e)} // inputで打ち込まれた時に発火
          />
        </div>
        <div>
          <label htmlFor="">ぱすわ</label>
          <input type="password" />
        </div>
        <button>ログイン</button>
      </form>
      <Link href="/">
        <button>トップ画面へ</button>
      </Link>
    </>
  );
}

// バリデーションチェック
