Feature: Client Updates a Meeting

  Scenario: update Client updates a meeting
    Given update Client is on the login page
    When update Client enters username "updated_user" and password "Updated@12345678"
    And update Client clicks the login button
    Then update Client should be redirected to the admin homepage

    When update Client clicks on the "View Meeting" button
    And update Client goes to the update clients page
    And update Client updates the meeting with the following details:
      | Topic           | Start Date  | Start Time | End Date    | End Time    | Parties Involved                            |
      | Updated Project | 2023-08-28  | 10:00 AM   | 2023-08-28  | 12:00 PM   | UpdatedClient1, UpdatedClient2, UpdatedClient3, UpdatedClient4|

    Then A update Client success alert should be displayed with the message "Meeting has been successfully updated!"

    When update Client closes the browser
