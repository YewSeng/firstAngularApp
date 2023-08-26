Feature: Adding a Admin
  I want to use this template for my feature file

  @tag1
  Scenario: Adding a new Admin
    Given the superAdmin/Owner is on the hidden page
    When the superAdmin/Owner enters secret key correctly
    When the superAdmin enters the details according to the formValidation requirements
    Then the admin will be created and a alert message will pop out notifying admin has been created
