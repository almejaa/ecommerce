let productUnitCost = 0;
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

}

function updateSubtotal() {

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
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + article.src + `" alt="` + article.count + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ article.name + `</h4>
                            <h4>` + article.unitCost + " " + article.currency + `</h4>
                        </div>
                        <p class="mb-1">` + article.count + `</p>
                    </div>
                </div>
            </a>
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
            showArticles(array);
        }
    });
});