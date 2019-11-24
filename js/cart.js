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
    total = subtotal + Number((subtotal*shippingPercentage).toFixed(2));
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
    $("#envio").text(Number((subtotal*shippingPercentage).toFixed(2))+" "+productCurrency);
    $("#unit").text(subtotal+" "+productCurrency);
    updateTotalCosts();
}

$('#pagoModal').on('show.bs.modal', function () {
    $('#cuenta').hide();
 })

function changePago(){
    var pago = $('#fpago-drop').val();
    if(pago == 'tarjeta'){
        $('#payment').show();
        $('#cuenta').hide();
    }else{
        $('#payment').hide();
        $('#cuenta').show();
    }
}

function cambiarPago() {
    var formapago = $('#fpago-drop').val();
    if(formapago == "transferencia"){
        var cuenta = $('#bankAccountNumber').val();
        if (cuenta == ''){
            alert('Debe completar todos los campos.');
        }else{
            $('#fpago').text(BANKING_PAYMENT);
            $('#pagoModal').modal('hide');
        }
    }else{
        var titular =$('#owner').val();
        var mes=$('#month').val();
        var anno=$('#year').val();
        anno = '20'+anno;
        var fecha = fecha = new Date(anno,mes-1,01);
        var today = new Date();
        var cvv=$('#cvv').val();
        var numero=$('#cardNumber').val();
        if(titular == '' || cvv == '' || numero == ''){
            alert('Debe completar todos los campos.');
        }else if(fecha>=today){
            $('#fpago').text(CREDIT_CARD_PAYMENT);
            $('#pagoModal').modal('hide');

        }else{
            alert('La tarjeta se encuentra expirada.');
        }
    }
}

function cambiarEnvio() {
    var direccion = $('#direccion-text').val();
    var ciudad = $('#ciudad-text').val();
    var pais = $('#pais-text').val();
    var envio = $('#envio-drop').val();
    if(direccion == '' || ciudad == '' || pais == ''){
        alert('Debe completar todos los campos.');
    }
    else{
        $("#direccion").text(direccion);
    $("#ciudad").text(ciudad);
    $("#pais").text(pais);
    switch (envio){
      case 'standard':
        $("#tipoenvio").text('Standard (12-15 días) - 5%');
        shippingPercentage = 0.05;
      break;
      case 'express':
        $("#tipoenvio").text('Express (5-8 días) - 7%');
        shippingPercentage = 0.07;
      break;
      case 'premium':
        $("#tipoenvio").text('Premium (2-5 días) - 15%');
        shippingPercentage = 0.15;
      break;
      default:
      break;
    }
    updateSubtotal();
    $('#envioModal').modal('hide');
    }
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

function finalizarCompra(){
    var direccion = $('#direccion').text();
    var ciudad = $('#ciudad').text();
    var pais = $('#pais').text();
    var envio = $('#tipoenvio').text();;
    var fpago = $('#fpago').text();;
    if (direccion == '' || ciudad == '' || pais == '' || envio == '' || fpago == ''){
        alert('Debe especificar una forma de envío y de pago antes de finalizar.');
    }else{
        var fin = confirm("Esta seguro que desea finalizar la compra?");
        if (fin == true){
            alert("¡La compra se ha completado satisfactoriamente!");
            window.location.href = 'index.html';
        }
    }
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