import React, { useEffect, useState } from "react";
import "./cardStack.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";

function CardStack() {
    const card = [1, 2, 3, 4, 5]

    const [visible, setVisible] = useState(true);
    const [cardlist, setCardList] = useState([])
    const [user, setUser] = useState("")
    // const [cardData, setCardData] = useState({
    //     cvc: "456",
    //     expiry: "34/33",
    //     focus: "dhj",
    //     name: "Rizwan",
    //     number: "236272873782",
    // });
    useEffect(() => {
        const user = localStorage.getItem("user")
        setUser(user)
    }, [])
    // 


    useEffect(() => {
        // const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2M2YzI5ZmFmYTVkMTAwMWRlNDkwZjYiLCJpYXQiOjE2Nzk0Mjg5MzAsImV4cCI6MzQ3OTQyODkzMCwidHlwZSI6ImFjY2VzcyJ9.3GZU2CjalRjcOHRhqm-WCvCdWaHoD5Js32VvqO2j2uY"
        const Token = JSON.parse(localStorage.getItem("user"));
        axios
            .get(
                "https://interview-api.onrender.com/v1/cards",

                { headers: { Authorization: "Bearer " + Token } }
            )
            .then((res) => {
                setCardList(res.data.results)
                console.log(res.data.results)
            });

        // axios(config).then((res) => {
        //     console.log("cards", res.data)
        //

        // axios.get("https://interview-api.onrender.com/v1/cards").then((res) => {
        //     console.log("cards", res.data)
        // })
    }, [])
    return <div>
        <div class="card">
            <h1><span>3DStacking</span>Animation</h1>

        </div>
        <div className="card-stack-div">
            {cardlist.map((data, index) => {
                return <div className=".layer" style={{ position: "absolute", zIndex: index + 1, marginTop: `${(index + 2) * 10}px` }}
                ><Cards
                        // cvc={data.cvc}
                        expiry={data.cardExpiration
                        }
                        // focused={data.focus}
                        name={data.cardHolder}
                        number={data.cardNumber}
                    />
                </div>
            })}
        </div>

    </div>
}

export { CardStack };