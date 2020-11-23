Feature: File Menu - Print Content

  As a content creator
  I want to print my document in a readable format
  So that I can review and distribute it on paper

  Background: Type content
    Given the editor is ready and empty
    Given the time is "2020-11-01T12:00:00.000Z"
    When I type into the editor "Hello World"
    Then the editor content should be "Hello World"

  Scenario: Print document
    When I select "File" menu and "Print" option
    Then the "printing" indicator should display
    When "500" ms have passed
    Then the "print" dialog should display
    When the "print" dialog is closed
    Then the "printed-at" indicator should display containing "Nov 1st, 2020 at 12:00PM"