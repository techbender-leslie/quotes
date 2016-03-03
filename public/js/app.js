$(function () {

  $('#quotes-list').on('click', '.show-quote', function () {
    window.location = '/quotes/' + $(this).data('_id');
  });

  $('#quotes-list').on('click', '.edit-quote', function () {
    window.location = '/quotes/' + $(this).data('_id') + '/edit';
  });

  // This function is pure AJAX - no refresh required
  $('#quotes-list').on('click', '.delete-quote', function () {
    var $deleteButton = $(this); // save context so we can use it in the ajax function
    $.ajax({
      url: '/quotes/' + $deleteButton.data('_id'),
      type: 'DELETE',
      // note the standard parameters of the success function (not that we need them here)
      success: function (data, status, xhr) {
        // remove this quote
        $deleteButton.closest('li').remove();
      }
    });
  });

});


