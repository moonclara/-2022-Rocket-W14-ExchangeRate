import { useState } from "react";

function ConvertMoney() {
  const rates = [
    {
      name: "日幣",
      rate: 4.31,
    },
    {
      name: "美元",
      rate: 0.033,
    },
  ];

  // 錢包中的錢錢，因為會減少，所以使用 useState
  const [wallet, setWallet] = useState(5000);

  // 輸入兌換的台幣，因為會變動，所以使用 useState
  const [inputMoney, setInputMoney] = useState("");

  // 將台幣轉換成其他幣值，因為會變動，所以使用 useState
  const [convert, setCovert] = useState("");

  // 新增幣種，因為會變動，所以使用 useState
  const [newRate, setNewRate] = useState([{ name: "", rate: "" }]);

  // 換算後的幣值們，因為會新增幣值，所以使用 useState
  const [exchangeList, setExchangeList] = useState(rates);

  // 兌換紀錄
  const [record, setRecord] = useState([]);

  // 新增幣種名稱及匯率 onChange
  const handleChangeNewRate = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setNewRate((newRate) => ({ ...newRate, [name]: value }));
  };

  // 新增幣種 button
  const handleClickNewRate = () => {
    if (newRate.name && newRate.rate && newRate.rate !== "0") {
      return (
        setExchangeList([...exchangeList, newRate]),
        setNewRate({ name: "", rate: "" })
      );
    }
    alert("請輸入正確的幣種名稱或匯率(不得為0)");
  };

  // 輸入台幣的 onChange
  const handleChangeInputMoney = (e) => {
    setInputMoney(e.target.value);
  };

  // 輸入的台幣 onClick
  const handleClickInputMoney = () => {
    if (inputMoney <= 0) {
      alert("請輸入大於0的金額");
      return;
    }

    return setCovert(inputMoney);
  };

  // 處理換算後的幣值們
  const handleExchangeRates = exchangeList.map((item, i) => {
    return (
      <li key={i}>
        {item.name}：{Math.round(item.rate * convert)}元
        <input
          type="button"
          value="兌換"
          onClick={() => {
            handleClickExchange(item);
          }}
        />
      </li>
    );
  });

  // 兌換 button
  const handleClickExchange = (item) => {
    if (wallet < inputMoney) {
      alert("您的錢包餘額不足");
      return;
    }
    setWallet(wallet - inputMoney);
    const { name, rate } = item;
    setRecord([...record, { name, rate, convert }]);
  };

  // 兌換紀錄 li
  const handleExchangeRecord = record.map((item, i) => {
    return (
      <li key={i}>
        您用{item.convert}元台幣，兌換了
        {Math.round(item.convert * item.rate)}
        {item.name}
      </li>
    );
  });

  return (
    <>
      <h3>新增幣種</h3>
      <input
        type="text"
        placeholder="幣種名稱"
        name="name"
        value={newRate.name}
        onChange={handleChangeNewRate}
      />
      <input
        type="text"
        placeholder="匯率"
        name="rate"
        value={newRate.rate}
        onChange={handleChangeNewRate}
      />
      <input type="button" value="新增幣種" onClick={handleClickNewRate} />
      <hr />
      <h3>您的錢包還有{wallet}元</h3>
      <label htmlFor="inputNTD">請輸入您要換的台幣</label>
      <input
        id="inputNTD"
        type="number"
        placeholder="台幣"
        value={inputMoney}
        onChange={handleChangeInputMoney}
      />
      <input type="button" value="計算" onClick={handleClickInputMoney} />
      <p>可以換算</p>
      <ul>{handleExchangeRates}</ul>
      <hr />
      <h3>您的兌換紀錄</h3>
      <ul>{handleExchangeRecord}</ul>
    </>
  );
}

export default ConvertMoney;
