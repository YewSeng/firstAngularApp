Feature: Contact Us

  Scenario: User submits contact form
    Given User is on the contact page
    When User enters contact details
    And User clicks the submit button
    Then User A success alert should be displayed with the message "Enquiries have been successfully submitted!"
    When User closes the browser
