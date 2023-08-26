Feature: Admin Deletes a Meeting

  Scenario: delete Admin deletes a meeting
    Given delete Admin is on the login page
    When delete Admin enters username "admin_user" and password "Admin@12345678"
    Then delete Admin should be redirected to the admin homepage

    When delete Admin clicks on the "View Meeting" button
    And delete Admin goes to the delete meeting page
    Then delete A confirmation alert should be displayed
    And delete Admin confirms the deletion
    Then A delete success alert should be displayed with the message "Meeting has been successfully deleted!"

    When delete Admin closes the browser
