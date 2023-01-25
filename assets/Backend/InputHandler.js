let checker = new DFAChecker(drawer);
$(document).ready(function() {


  $('#check').on('click',function() {
      $('.alert').hide();
    checker.resetColor();
    let time = $('#dfaInterval').val();
    if(time!="") {
      if(time <=2000)
        checker.time = time;
    } else {
      checker.time = 200;
    }
    checker.check($('#dfaInput').val());
    $('#modal-2').modal('hide');
    $('#navCollapseBut').trigger('click');


  });
  $('#accept').on('click',function() {
    $(this).show('1000');
  });

  $(document).on('click','.close',function() {
    checker.resetColor();
    redraw();
    $('.alert').hide();

  });
});
