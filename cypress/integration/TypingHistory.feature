Feature: Edit Menu - Typing History

  As a content creator
  I want to manage typed information by the history
  So that I can save time writing documents

  Background: Enter content
    Given the editor is ready and empty
    When I type into the editor "Hello "
    When I type into the editor "World"
    Then the editor content should be "Hello World"

  Scenario: Undo typing twice
    When I select "Edit" menu and "Undo" option
    Then the editor content should be "Hello "
    When I select "Edit" menu and "Undo" option
    Then the editor content should be ""

  Scenario: Redo typing twice
    When I select "Edit" menu and "Undo" option
    When I select "Edit" menu and "Undo" option
    When I select "Edit" menu and "Redo" option
    Then the editor content should be "Hello "
    When I select "Edit" menu and "Redo" option
    Then the editor content should be "Hello World"