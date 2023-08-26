Feature: Admin and Client user login, create client, and navigate

  Scenario: Admin logs in, creates a client, logs out, and client logs in
    Given the admin is on the login page
    When the admin logs in with valid credentials
    And the admin navigates to the admin dashboard
    And the admin clicks on the "Create Clients" button
    And the admin fills in valid client information
    And the admin clicks on the "REGISTER CLIENT" button
    Then the success message for client creation should be displayed
    And the admin logs out
    And the client is on the login page
    When the client logs in with valid credentials
    And the client navigates to the client dashboard
    Then the client dashboard title should be displayed
