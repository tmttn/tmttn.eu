Feature: Accessibility
  As a user with accessibility needs
  I want the website to be fully accessible
  So that I can navigate and use all features regardless of my abilities

  Background:
    Given I visit the portfolio homepage
    And the page loads successfully

  Scenario: Keyboard navigation works correctly
    When I navigate using only the keyboard
    Then I should be able to tab through all interactive elements
    And focus indicators should be visible
    And I should be able to activate elements using Enter or Space
    And tab order should be logical

  Scenario: Skip navigation functionality
    Given I am on the homepage
    When I press Tab to focus the first element
    Then I should see a "Skip to main content" link
    When I press Enter on the skip link
    Then focus should move to the main content area

  Scenario: Screen reader compatibility
    When I examine the page structure
    Then all images should have appropriate alt text
    And headings should be properly structured (h1, h2, h3, etc.)
    And form controls should have associated labels
    And semantic HTML elements should be used correctly

  Scenario: Color contrast and visual accessibility
    When I view the page in both light and dark themes
    Then text should have sufficient color contrast
    And important information should not rely solely on color
    And focus indicators should be visible
    And text should be readable at 200% zoom

  Scenario: ARIA attributes and roles
    When I examine the page markup
    Then interactive elements should have appropriate ARIA labels
    And navigation should have proper role attributes
    And dynamic content changes should be announced
    And form validation messages should be accessible