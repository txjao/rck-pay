import "./css/index.css"
import IMask from "imask";

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");

const ccTypeImage = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {

  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#Df6F29", "#C69347"],
    default: ["#000", "#999"]
  }

  ccBgColor01.setAttribute("fill", colors.visa)
  ccBgColor02.setAttribute("fill", "green")
  ccTypeImage.setAttribute("src", `cc-${type}.svg`)

}

const numCard = document.getElementById('card-number');
const nameCard = document.getElementById('card-holder');
const expire = document.getElementById('expiration-date');
const cvc = document.getElementById('security-code');

const maskCvc = {
  mask: '0000'
}
var cvcMasked = IMask(cvc, maskCvc)

const expireMask = {
  mask: "MM{/}YY",

  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
}
var expireMasked = IMask(expire, expireMask);

const maskNumCard = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'visa',
      regex: /^4\d{0,15}/,
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'mastercard',
      regex: /(^5[1-5]\d{0,2} | ^22[2-9]\d | ^2[3-7]\d{0,2})\d{0,12}/,
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default'
    }
  ],
  dispatch: function (appended, dynamicMask) {
    const number = (dynamicMask.value + appended).replace(/\D/g, '')

    const card = dynamicMask.compiledMasks.find(({ mask }) =>
      number.match(mask.regex)
    )
    console.log(card)

    return card
  }
}

var numCardMasked = IMask(numCard, maskNumCard);

const addButton = document.getElementById("button");

addButton.addEventListener("click", () => {
  console.log("clicou")

});



document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});


const cardHolder = document.getElementById("card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

cvcMasked.on("accept", (code) => {
  code = cvcMasked.value

  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "1234" : code

})

numCardMasked.on("accept", (number) => {
  number = numCardMasked.value

  const ccSecurity = document.querySelector(".cc-info .number")
  ccSecurity.innerText = number.length === 0 ? "0000 0000 0000 0000" : code

})