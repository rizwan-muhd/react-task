import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import creditCardType from "credit-card-type";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch } from "react-redux";
import { authActions } from "_store";

function Addcards() {
  const [token, setToken] = useState(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    const token1 = localStorage.getItem("user");
    setToken(token1);
  }, []);
  const [cardData, setCardData] = useState({
    cvv: "",
    name: "",
    cardExpiration: "",
    focus: "",
    cardHolder: "",
    cardNumber: "",
    category: "",
  });
  const [category, setCategory] = useState("");
  console.log(token);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCardData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const instance = axios.create({
    baseURL: "https://interview-api.onrender.com/v1",
    timeout: 1000,
    // headers: { Authorization: "Bearer " + token },
  });

  // const config = {
  //   // method: "post",
  //   // url: "https://interview-api.onrender.com/v1/cards",
  //   // headers: {
  //   //   Authorization: `Token=${user}`,
  //   //   "Content-Type": "application/json",
  //   // },
  //   // responseType: "json",
  //   // responseEncoding: "utf-8",
  //   // data: { cardData },

  //   baseURL: "https://interview-api.onrender.com/v1",
  //   timeout: 1000,
  //   headers: { Authorization: "Bearer " + token },
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cardData.name = cardData.cardHolder;
    console.log("data", cardData);
    const date = cardData.cardExpiration;
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
    // const type = creditCardType(cardData.cardNumber);
    // const cardType = Cards.cardType();
    // console.log(type);
    const cardData1 = {
      category: category,
      name: cardData.cardHolder,
      cardExpiration: formattedDate,
      cardHolder: cardData.cardHolder,
      cardNumber: cardData.cardNumber,
    };
    console.log(cardData1);
    // return dispatch(authActions.createCard({ cardData }));
    // await axios
    //   .post("https://interview-api.onrender.com/v1/cards", cardData)
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    const Token = JSON.parse(localStorage.getItem("user"));

    await axios
      .post("https://interview-api.onrender.com/v1/cards", cardData1, {
        headers: { Authorization: "Bearer " + Token },
      })
      .then((res) => {
        // setCardList(res.data.results)
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div id="PaymentForm">
      <Cards
        cvv={cardData.cvv}
        expiry={cardData.cardExpiration}
        focused={cardData.focus}
        name={cardData.cardHolder}
        number={cardData.cardNumber}
      />
      <form onSubmit={handleSubmit} className="form-class">
        <input
          type="number"
          name="cardNumber"
          placeholder="Card Number"
          onChange={handleChange}
          // onFocus={handleInputFocus}
        />

        <input
          type="text"
          name="cardHolder"
          placeholder="Card Holder Full Name"
          onChange={handleChange}
        />
        <select
          name=" category"
          id="cards"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="VISA">VISA</option>
          <option value="MC">MC</option>
          <option value="AE">AE</option>
        </select>
        <input
          type="number"
          name="cvv"
          placeholder="cvv"
          onChange={handleChange}
        />
        <input
          min="2022-03"
          max="2050-01-01"
          type="month"
          name="cardExpiration"
          placeholder="expiry date"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Addcards;
