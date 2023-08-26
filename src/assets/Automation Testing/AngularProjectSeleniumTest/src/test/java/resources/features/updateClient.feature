Feature: Update Client Information

	Scenario: Admin updates client information and client logs in with updated credentials
	    Given the [update]admin is on the login page
	    When the [update]admin logs in with valid credentials
	    And the [update]admin navigates to the view clients page
	    And the [update]admin goes to the update client page
	    And the [update]admin updates client information with valid data
	    And the [update]admin clicks on the "Update Client" button
	    Then the [update]success message should be displayed
	    And the [update]admin logs out
	    And the [update]client is on the login page
	    When the [update]client logs in with updated valid credentials
	    And the [update]client navigates to the client dashboard
	    Then the [update]updated client dashboard title should be displayed
