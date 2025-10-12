Feature: Sauce Demo Login

  @smoke
  Scenario: Successful login
    Given I navigate to "https://www.saucedemo.com"
    When I enter the username as "standard_user"
    And I enter the password as "secret_sauce"
    Then I click the login button
    Then I should be logged in successfully
 
