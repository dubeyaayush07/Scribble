$( document ).ready(function() {
  $('.vote-up').submit(function (e) {
    e.preventDefault();
    var Id = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: '/projects/' + Id + '/vote-up',
      success: function(data) {
       $("#" + Id).html(data);
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
  
  $('.vote-down').submit(function (e) {
    e.preventDefault();
    var Id = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: '/projects/' + Id + '/vote-down',
      success: function(data) {
       $("#" + Id).html(data);
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
   
});
  
  
  
  
  