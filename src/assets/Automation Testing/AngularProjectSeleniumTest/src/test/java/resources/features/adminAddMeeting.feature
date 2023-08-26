Feature: Admin Adds a Meeting

  Scenario: Admin successfully creates a meeting
    Given Admin is on the login page
    When Admin enters username "Anna Tan (Test)" and password "A@12345678"
    And Admin clicks the login button
    Then Admin should be redirected to the admin homepage

    When Admin clicks on the "Create Meeting" button
    And Admin enters the following details:
      | Topic       | Start Date  | Start Time | End Date    | End Time    | Parties Involved                      |
      | Project X   | 2023-08-27  | 09:00 AM   | 2023-08-27  | 11:00 AM   | TANYEWSENG, Client2, Client3, Client4 |

    And Admin clicks on the "Create" button
    Then A success alert should be displayed with the message "Meeting has been successfully created!"

    When Admin closes the browser
