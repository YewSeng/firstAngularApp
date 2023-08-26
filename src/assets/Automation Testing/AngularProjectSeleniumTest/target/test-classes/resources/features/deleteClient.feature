Feature: Delete a client and receive an alert on login attempt

  Scenario: Admin deletes a client and client receives alert on login
    Given the admin user is logged in
    When the admin user clicks on the "View Clients" button
    And the admin user clicks on the "Delete" button for the client
    And the admin user logs out
    And the deleted client attempts to log in
    Then the client receives an alert message "Error verifying client"
