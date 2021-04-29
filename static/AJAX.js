$(document).ready( () => {

      //On page load the three forms are hidden

      $('#add-user').css('display', 'none');
      $('#delete-user-form').css('display', 'none');
      $('#update-user-form').css('display', 'none');
      
      // handle "Add User to Database" submit button click
      $('#add-user').submit( e => {
        
        let formData = Object.fromEntries(new FormData(e.target));
        alert("A new user has been added to the database");
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8000/api/user',
          data: formData
        }).done( () => {
            // reset the form for next time!
            $('select[name=title]').val('');
            $('input[name=firstname]').val('');
            $('input[name=lastname]').val('');
            $('input[name=mobilenumber]').val('');
            $('input[name=email]').val('');
            $('input[name=homeaddressline1]').val('');
            $('input[name=homeaddressline2]').val('');
            $('input[name=town]').val('');
            $('input[name=county]').val('');
            $('input[name=eircode]').val('');
            $('input[name=shippingaddressline1]').val('');
            $('input[name=shippingaddressline2]').val('');
            $('input[name=townShipAdd]').val('');
            $('input[name=countyShipAdd]').val('');
            $('input[name=eircodeShipAdd]').val('');
        
            // https://www.w3schools.com/jquery/jquery_css.asp
          $('#add-user').css('display', 'none');
          $('#addUserButton').css('display', 'inline');
          $('#deleteUserButton').css('display', 'inline');
          $('#updateUserButton').css('display', 'inline');
          $('#deleteRandomUser').css('display', 'inline');
          $('#update-rand-user').css('display', 'inline');

          
          });
          e.preventDefault();
        // when method is called, the default action of the event will not be triggered.
        // meand that clicked submit button will not take the browser to a new URL.
      });

      // Handle "Delete user" form 
      $('#deleteUser').on('click',(e) => {

        var user = {
          id: $('input[name=delete-id]').val(),
         
        };

        alert(`User ${user.id}'s records have been deleted`);

        $.ajax({
          type: 'DELETE',
          url: 'http://localhost:8000/api/deleteUser',
          data: user
        }).done((user) => {

          // reset the form for next time!
          $('input[name=delete-id]').val('');
          
          
          

          $('#delete-user-form').css('display', 'none');
          $('#addUserButton').css('display', 'inline');
          $('#deleteUserButton').css('display', 'inline');
          $('#updateUserButton').css('display', 'inline');
          $('#deleteRandomUser').css('display', 'inline');
          $('#update-rand-user').css('display', 'inline');

        })

        e.preventDefault();
      })

      // Handle "Delete random user" button click

      $('#deleteRandomUser').click( (e) => {

        

        $('#delete-user-form').css('display', 'none');
        $('#addUserButton').css('display', 'inline');
        $('#deleteUserButton').css('display', 'inline');
        $('#updateUserButton').css('display', 'inline');
        $('#deleteRandomUser').css('display', 'inline');
        $('#update-rand-user').css('display', 'inline');

        alert(`A random user's records have been deleted`);


        $.ajax({
          type: 'DELETE',
          url: 'http://localhost:8000/api/deleteRandUser', 
        })

        

        e.preventDefault();
      })

      // Handle "Update User" form submission
      $('#update-user').click( e => {

        
        var user = {
          firstname: $('input[name=update-fname]').val(),
          mobile: $('input[name=update-mobile]').val(),
          title: $('input[name=update-title]').val(),
          email: $('input[name=update-email]').val(),
          eircode: $('input[name=update-eircode]').val()
        };

        alert(`${$('input[name=update-fname]').val()}'s number, title and email have been updated`);
        $.ajax({
          type: 'PUT',
          url: 'http://localhost:8000/api/updateUser',
          data: user
        }).done(() => {

          // reset the form for next time!
          $('input[name=update-fname]').val('');
          $('input[name=update-mobile]').val('');
          $('input[name=update-title]').val('');
          $('input[name=update-email]').val('');
          $('input[name=update-eircode]').val('');
          

          $('#update-user-form').css('display', 'none');
          $('#addUserButton').css('display', 'inline');
          $('#deleteUserButton').css('display', 'inline');
          $('#updateUserButton').css('display', 'inline');
          $('#deleteRandomUser').css('display', 'inline');
          $('#update-rand-user').css('display', 'inline');

        

        });

        e.preventDefault();
      })

      // Handles "Update a random user" button click

      $('#update-rand-user').click( e => {

        $('#update-user-form').css('display', 'none');
        $('#addUserButton').css('display', 'inline');
        $('#deleteUserButton').css('display', 'inline');
        $('#updateUserButton').css('display', 'inline');
        $('#deleteRandomUser').css('display', 'inline');
        $('#update-rand-user').css('display', 'inline');

        alert("A random users number, title and email have been updated");
        $.ajax({
          type: 'PUT',
          url: 'http://localhost:8000/api/updateRandomUser',
        });

        e.preventDefault();
      })

      // handle "Show Customer Data" submit button click
      $('#show-cust').click(e => {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/api/user'
        })
          .done(function (data) {
            // display the database in the textarea and trigger an input change event
            $('#showCustomerData').val(JSON.stringify(data, null, 2)).trigger('input');
          });
        e.preventDefault(); // when method is called, the default action of the event will not be triggered.
        // meand that clicked submit button will not take the browser to a new URL.
      });

      // handle "Show Home Address Data" submit button click
      $('#show-home').click(e => {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/api/homeAddress'
        })
          .done(function (data) {
            // display the database in the textarea and trigger an input change event
            $('#showHomeAddressData').val(JSON.stringify(data, null, 2)).trigger('input');
          });
        e.preventDefault(); // when method is called, the default action of the event will not be triggered.
        // meand that clicked submit button will not take the browser to a new URL.
      });

      // handle "Show CShipping Address Data" submit button click
      $('#show-ship').click(e => {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/api/shippingAddress'
        })
          .done(function (data) {
            // display the database in the textarea and trigger an input change event
            $('#showShippingAddressData').val(JSON.stringify(data, null, 2)).trigger('input');
          });
        e.preventDefault(); // when method is called, the default action of the event will not be triggered.
        // meand that clicked submit button will not take the browser to a new URL.
      });

      // Handles "Hide Customer Data" button click
      $('#hide-cust').click(e => {
        $('#showCustomerData').val('').trigger('input');
        e.preventDefault();
      })

      // Handles "Hide Home Address Data" button click
      $('#hide-home').click(e => {
        $('#showHomeAddressData').val('').trigger('input');
        e.preventDefault();
      })

      // Handles "Hide Shipping Address Data" button click
      $('#hide-ship').click(e => {
        $('#showShippingAddressData').val('').trigger('input');
        e.preventDefault();
      })

      // The following funcitons handle different button clicks and hide/display the appropriate forms/buttons
      $("#addUserButton").click(() => {
        console.log('clicked');
        $('#add-user').css('display', 'block');
        $('#addUserButton').css('display', 'none');
      })

      $("#deleteUserButton").click(() => {
        console.log('clicked');
        $('#delete-user-form').css('display', 'block');
        $('#addUserButton').css('display', 'none');
        $('#deleteUserButton').css('display', 'none');
        $('#updateUserButton').css('display', 'none');
        $('#deleteRandomUser').css('display', 'none');
        $('#update-rand-user').css('display', 'none');

      })

      $("#updateUserButton").click(() => {
        console.log('clicked');
        $('#update-user-form').css('display', 'block');
        $('#addUserButton').css('display', 'none');
        $('#deleteUserButton').css('display', 'none');
        $('#updateUserButton').css('display', 'none');
        $('#deleteRandomUser').css('display', 'none');
        $('#update-rand-user').css('display', 'none');
      })

      // The following functions utilise the autosize node package
      
      $("#showCustomerData").on("input", () => {
        $("#showCustomerData").autosize();
      });

      $("#showHomeAddressData").on("input", () => {
        $("#showHomeAddressData").autosize();

      });

      $("#showShippingAddressData").on("input", () => {
        $("#showShippingAddressData").autosize();
      });

    

    });