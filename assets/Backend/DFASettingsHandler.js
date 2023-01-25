
  $(document).ready(function() {

    $('#modalBut').on('click', function() {
      makeModal();
    });

    function makeModal() {
      //state
      $('#state').val(DFATuples.state.join(','));
      //initial
      $('#initial').val(DFATuples.initial.join(','));
      //final
      $('#final').val(DFATuples.final.join(','));
      //alphabet
      $('#alphabet').val(DFATuples.alphabet.join(','));

      $('tbody').html("");
      $('thead').html(`
      <tr>
        <th>Q\&Sigma;</th>
      </tr>
      `);
      //table
      let inputCheck = 1;
      let transition = DFATuples.transition;
      for (let state in transition) {
        $('tbody ').append(`<tr><th>${state}</th></tr>`)
        for (let input in transition[state]) {
          if (inputCheck)
            $('thead tr').append(`<th>${input}</th>`);
          $('tbody tr').last().append(`<td><input type="text" value = "${transition[state][input]}" class="form-control col-10"></td>`);

        }
        inputCheck = 0;
      }
    }
    makeModal();

    $('#save').on('click', function() {
      $('#modal-1').modal('hide');
      DFATuples.state = $('#state').val().split(',');
      DFATuples.initial = $('#initial').val().split(',', 1);
      DFATuples.final = $('#final').val().split(',');
      DFATuples.albhabet = $('#alphabet').val().split(',');

      let start = DFATuples.state.find(item => item == DFATuples.initial);
      let final = DFATuples.final.every((final) => {
        let check = DFATuples.state.find((item) => {
          return item == final;
        });
        console.log(check);
        if (check)
          return true;
        return false;
      });
      console.log('FINAL --' + final);
      if (!(start && final)) {
        alert('Please check that final and initial state lie in the state input');
        return;
      }

      DFATuples.transition = {};
      let transition = DFATuples.transition;
      //transition
      $('tbody').find('tr').each(function() {
        let state = $(this).children().eq(0).text();
        transition[state] = {};
        $(this).children().each(function(i) {
          if (i != 0) {

            let state2 = $(this).children().val();
            let input = $('thead tr').children().eq(i).text();

            transition[state][input] = state2;
          }

        });
          $('#navCollapseBut').trigger('click');

      });
      makeModal();

      subesh.map(DFATuples);
      drawer.createDiagram();
      redraw();



    });


    //touch action
    $('#state,#alphabet').focusout(function() {
      let key = $(this).data('name');
      if (DFATuples[key].join(",") !== $(this).val()) {
        changeTable();
      }
    });

    function changeTable() {
      let state = $('#state').val().split(',');
      let alphabet = $('#alphabet').val().split(',');
      $('tbody').html("");
      $('thead').html(`
        <tr>
          <th>Q\&Sigma;</th>
        </tr>
        `);
      let inputCheck = 1;
      for (let i = 0; i < state.length; i++) {
        $('tbody ').append(`<tr><th>${state[i]}</th></tr>`)
        for (let j = 0; j < alphabet.length; j++) {
          if (inputCheck)
            $('thead tr').append(`<th>${alphabet[j]}</th>`);
          $('tbody tr').last().append(`<td><input type="text" class="form-control col-10"></td>`);

        }
        inputCheck = 0;
      }
    }

  });
