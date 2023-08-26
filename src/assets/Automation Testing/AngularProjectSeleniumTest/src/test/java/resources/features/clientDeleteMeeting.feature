Feature: Client Deletes a Meeting

  Scenario: delete client deletes a meeting
    Given delete Client is on the login page
    When delete Client enters username "admin_user" and password "Admin@12345678"
    Then delete Client should be redirected to the admin homepage

    When delete Client clicks on the "View Meeting" button
    And delete Client goes to the delete meeting page
    Then delete Client A confirmation alert should be displayed
    And delete Client confirms the deletion
    Then delete Client A delete success alert should be displayed with the message "Meeting has been successfully deleted!"

    When delete Client closes the browser
