Feature: Portfolio Website Core Functionality
  As a visitor to the portfolio website
  I want to navigate and explore the content
  So that I can learn about the developer's skills and projects

  Background:
    Given I visit the portfolio homepage
    And the page loads successfully

  Scenario: Homepage loads with essential elements
    When I view the homepage
    Then I should see the main navigation
    And I should see the welcome section
    And I should see the portfolio section
    And I should see the contact section
    And the page should have proper SEO elements

  Scenario: Theme toggle functionality
    Given I am on the homepage
    And the theme is set to light mode
    When I click the theme toggle button
    Then the theme should switch from light to dark mode
    And the toggle button should reflect the current theme
    When I click the theme toggle button again
    Then the theme should switch back to light mode

  Scenario: Navigation between sections
    Given I am on the homepage
    When I click on the "Showcase" navigation link
    Then I should be scrolled to the portfolio section
    And the portfolio section should be visible
    When I click on the "Contact" navigation link
    Then I should be scrolled to the contact section
    And the contact section should be visible

  Scenario: Particle background animation
    Given I am on the homepage
    When I view the page
    Then I should see an animated particle background
    And the particles should be interactive
    When I move my mouse over the canvas
    Then the particles should respond to mouse movement

  Scenario: GitHub integration displays correctly
    Given I am on the homepage
    When I scroll to the portfolio section
    Then I should see the GitHub heatmap component
    And the heatmap should load successfully
    And I should see recent GitHub activity