function closeModulePromo() {

  var module_element = document.getElementById('module_promo');
  module_element.parentElement.removeChild(module_element);
  
}

var module_close_handler = document.getElementById('module_promo_close');

module_close_handler.onclick = function() {
  closeModulePromo();
}


