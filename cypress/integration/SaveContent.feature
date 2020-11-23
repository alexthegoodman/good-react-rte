Feature: File Menu - Save Content

  As a content creator
  I want to make sure my information is available later
  So that I can continue working on it

  Background: Type content
    Given the editor is ready and empty
    Given the time is "2020-11-01T12:00:00.000Z"
    When I type into the editor "Hello World"
    Then the editor content should be "Hello World"

  Scenario: Save content
    When I select "File" menu and "Save" option
    Then the "saving" indicator should display
    When "500" ms have passed
    Then the "saved-at" indicator should display containing "Nov 1st, 2020 at 12:00PM"