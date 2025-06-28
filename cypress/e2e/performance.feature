Feature: Performance
  As a user visiting the portfolio website
  I want the website to load quickly and perform well
  So that I have a smooth browsing experience

  Background:
    Given I have a stable internet connection

  Scenario: Initial page load performance
    When I visit the portfolio homepage
    Then the page should load within 3 seconds
    And the largest contentful paint should occur within 2.5 seconds
    And the first input delay should be less than 100ms
    And cumulative layout shift should be minimal

  Scenario: Lazy loading of portfolio content
    Given I visit the portfolio homepage
    When I scroll to the portfolio section
    Then the portfolio component should load asynchronously
    And loading states should be displayed appropriately
    And the transition should be smooth

  Scenario: Asset optimization
    When I analyze the page resources
    Then images should be optimized and properly sized
    And CSS should be minified
    And JavaScript should be bundled efficiently
    And fonts should load without blocking rendering

  Scenario: Network efficiency
    Given I visit the portfolio homepage
    When I monitor network requests
    Then there should be minimal unnecessary requests
    And resources should use appropriate caching headers
    And third-party resources should not block critical rendering
    And the total page weight should be reasonable

  Scenario: Interactive performance
    Given I am on the homepage
    When I interact with the theme toggle
    Then the response should be immediate
    And animations should run at 60fps
    When I scroll through the page
    Then scrolling should be smooth
    And particle animations should not impact performance