Feature: Client Adds a Meeting

  Scenario: Client successfully creates a meeting
    Given Client is on the login page
    When Client enters username "updated_user" and password "Updated@12345678"
    And Client clicks the login button
    Then Client should be redirected to the admin homepage

    When Client clicks on the "Create Meeting" button
    And Client enters the following details:
      | Topic       | Start Date  | Start Time | End Date    | End Time    | Parties Involved                      |
      | Project X   | 2023-08-27  | 09:00 AM   | 2023-08-27  | 11:00 AM   | TANYEWSENG, Client2, Client3, Client4 |

    And Client clicks on the "Create" button
    Then A client success alert should be displayed with the message "Meeting has been successfully created!"

    When Client closes the browser