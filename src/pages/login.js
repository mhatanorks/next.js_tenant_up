/*
ログイン認証ロードマップ
- 本人確認リクエスト
    - Session: 何をするか（ログイン）
    - Cookie: 誰が（
*/


import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LoginForm() {
  const initValues = { username: '', email: '', password: '' }; // useStateの中身をまとめる
  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({}); // オブジェクトにするとkey:値をもてるを持てる エラーのキーメッセージ：表示用メッセージ
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(e) {
    // console.log(e.target)
    const { name, value } = e.target; // 分割代入 name属性、入力したテキスト
    setFormValues({ ...formValues, [name]: value }); // name = e.targetのname属性（username）
    console.log(formValues);
  }

  // ログインの送信
  function handleSubmit(e) {
    e.preventDefault(); // 送信を押したら画面が更新される・更新されないようにAPIを叩く
    // バリデーションチェック　エラー用の配列
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  function validate(values) {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/; // 正規表現
    if (!values.username) {
      errors.username = '名前を入れて'; // errorのオブジェクトに入る
    }
    if (!values.username) {
      errors.username = 'メアドを入れて'; // errorのオブジェクトに入る
    } else if (!regex.test(values.email)) {
      // テスト関数
      errors.email = '正しいメアドを入れて';
    }
    if (!values.password) {
      errors.username = 'パスワードを入れて'; // errorのオブジェクトに入る
    } else if (values.password.length < 4) {
      errors.password = 'passwordが短いぞ';
    }
    return;
  }

  const [account, setAccount] = useState('-');
  const [chainId, setChainId] = useState(0);
  const btnDisabled = account != '-';

  const initializeAccount = async () => {
    const account = getAccount();
    if (account != '') {
      handleAccountChanged(account, setAccount, setChainId);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accountNo) =>
        handleAccountChanged(accountNo, setAccount, setChainId)
      );
      window.ethereum.on('chainChanged', (accountNo) =>
        handleAccountChanged(accountNo, setAccount, setChainId)
      );
    }
  }, [account]);



  return (
    <>
      <h1>ログインフォーム</h1>
      <form>
        <div>
          <label>なまえ</label>
          <input
            // required
            type="text"
            name="username"
            value={formValues.username}
            onChange={(e) => handleChange(e)} // inputで打ち込まれた時に発火
          />
        </div>
        {/* <p>{formErrors.username}</p> */}

        <div>
          <label>めあど</label>
          <input
            // required
            type="text"
            name="email"
            value={formValues.email}
            onChange={(e) => handleChange(e)} // inputで打ち込まれた時に発火
          />
          {/* <p>{formErrors.email}</p> */}
        </div>

        <div>
          <label>ぱすわ</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* <p>{formErrors.password}</p> */}
        <button onClick={handleSubmit}>ログイン</button>
      </form>

      <Link href="/">
        <button>トップ画面へ</button>
      </Link>
    </>
  );
}

// バリデーションチェック
