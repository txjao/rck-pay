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

