const CATEGORIES_URL = "http://localhost:5000/categories/all";
const PUBLISH_PRODUCT_URL = "http://localhost:5000/publish/all";
const CATEGORY_INFO_URL = "http://localhost:5000/categoriesinfo/all";
const PRODUCTS_URL = "http://localhost:5000/product/all";
const PRODUCT_INFO_URL = "http://localhost:5000/productinfo/all";
const CART_INFO_URL = "http://localhost:5000/cartinfo/all";
const CART_BUY_URL = "http://localhost:5000/buy/all";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
