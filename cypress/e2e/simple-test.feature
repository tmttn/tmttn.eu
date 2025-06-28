Feature: Simple Portfolio Test
  As a visitor to the portfolio website
  I want to verify the basic functionality works
  So that I can navigate and view the content

  Scenario: Homepage loads successfully
    Given I visit the portfolio homepage
    When I view the page
    Then I should see the main content area

  Scenario: Main sections are visible
    Given I am on the homepage
    When I look at the page
    Then I should see the welcome section
    And I should see the portfolio section