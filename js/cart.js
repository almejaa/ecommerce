let productUnitCost = 0;
let productCount = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {
    total = subtotal + subtotal * shippingPercentage;
    $("#total").text(total+" "+productCurrency);
}

function updateArticleCount() {
    productCount = $("#valCant").val();
    $("#cantidad").text(productCount+" Artículos");
    updateSubtotal();
}

function updateSubtotal() {
    subtotal = productUnitCost * productCount;
    $("#subtotal").text(subtotal+" "+productCurrency);
    $("#envio").text(subtotal*shippingPercentage+" "+productCurrency);
    $("#unit").text(subtotal+" "+productCurrency);
    updateTotalCosts();
}

function showPaymentTypeNotSelected() {

}

function hidePaymentTypeNotSelected() {

}

function showArticles(articles) {
    let htmlContentToAppend = "";
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];

        htmlContentToAppend += `
        <tr>
            <th scope="row" class="border-0">
                <div class="p-2">
                    <img src="` + article.src + `" alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">`+ article.name + `</a></h5>
                    </div>
                </div>
            </th>
            <td class="border-0 align-middle"><strong>` + article.unitCost + " " + article.currency + `</strong></td>
            <td class="border-0 align-middle"><strong><input id="valCant" onchange="updateArticleCount()" type="number" min="0" value="` + article.count + `"></strong></td>
            <td class="border-0 align-middle"><strong id = "unit">` + article.unitCost * productCount + " " + article.currency + `</strong></td>
        </tr>
            `
    }
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var array = resultObj.data.articles;
            productUnitCost = array[0].unitCost;
            productCurrency = array[0].currency;
            productCount = array[0].count;
            showArticles(array);
            updateArticleCount();
        }
    });
});