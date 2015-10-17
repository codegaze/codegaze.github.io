function checkAdBlocker(iframe_id, error_message_id) {

  var iframe_element = document.getElementById(iframe_id),
      error_meesage_element = document.getElementById(error_message_id);

  if (iframe_element.style.height === 0 || iframe_element.style.display == 'none') {
    error_meesage_element.classList.remove('hidden');
  }
}