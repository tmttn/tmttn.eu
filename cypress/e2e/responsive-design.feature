Feature: Responsive Design
  As a user accessing the website from different devices
  I want the website to work well on all screen sizes
  So that I can have a good experience regardless of my device

  Scenario Outline: Website displays correctly on different devices
    Given I am using a "<device>" viewport
    When I visit the portfolio homepage
    Then the layout should be optimized for "<device>"
    And all content should be readable
    And navigation should be accessible
    And interactive elements should be properly sized

    Examples:
      | device  |
      | mobile  |
      | tablet  |
      | desktop |

  Scenario: Mobile navigation functionality
    Given I am using a "mobile" viewport
    And I visit the portfolio homepage
    When I interact with the navigation
    Then navigation should work smoothly
    And all sections should be accessible
    And touch interactions should be responsive

  Scenario: Desktop interactive features
    Given I am using a "desktop" viewport
    And I visit the portfolio homepage
    When I interact with hover effects
    Then hover states should be visible
    And transitions should be smooth
    And all interactive elements should respond appropriately