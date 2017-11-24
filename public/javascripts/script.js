$(document).ready(function(){
    $('#inputBox').focus();
    $('#btnSubmit').on('click',() => {
        var searchKeyword = $('#inputBox').val();
          if( searchKeyword === '' ) {
              alert('Please enter value to search...'+ searchKeyword)
              return false;
          }
      })
  })