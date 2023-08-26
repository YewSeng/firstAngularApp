Feature: Admin Updates a Meeting

  Scenario: update Admin updates a meeting
    Given update Admin is on the login page
    When update Admin enters username "Anna Tan (Test)" and password "A@12345678"
    And update Admin clicks the login button
    Then update Admin should be redirected to the admin homepage

    When update Admin clicks on the "View Meeting" button
    And update Admin goes to the update clients page
    And update Admin updates the meeting with the following details:
      | Topic           | Start Date  | Start Time | End Date    | End Time    | Parties Involved                            |
      | Updated Project | 2023-08-28  | 10:00 AM   | 2023-08-28  | 12:00 PM   | UpdatedClient1, UpdatedClient2, UpdatedClient3 |

    Then A update Admin success alert should be displayed with the message "Meeting has been successfully updated!"

    When update Admin closes the browser
