Feature: Font Menu

  As a content creator
  I want to insert and alter text from one type to another
  So that I can structure and organize the information

  Background: Type content
    Given the editor is ready and empty
    Given the time is "2020-11-01T12:00:00.000Z"
    When I type into the editor "Hello World"
    Then the editor content should be "Hello World"

  Scenario: Add, transform, and remove headlines
    # Add
    When I select "Font" menu and "H1" option
    Then the editor should contain "1" "h1" containing ""
    # Transform
    When I highlight the text "Hello"
    When I select "Font" menu and "H2" option
    Then the editor should contain "1" "h2" containing "Hello"
    # Remove
    When I highlight the text "Hello"
    When I select "Font" menu and "H2" option
    Then the editor should contain "0" "h2" containing "Hello"

  Scenario: Add, transform, and remove paragraphs
    # Add
    When I select "Font" menu and "p" option
    Then the editor should contain "2" "p"
    # Transform
    When I highlight the text "Hello"
    When I select "Font" menu and "H2" option
    Then the editor should contain "1" "h2" containing "Hello"
    Then the editor should contain "2" "p"
    # Remove
    When I highlight the text "Hello"
    When I select "Font" menu and "p" option
    Then the editor should contain "0" "h2" containing "Hello"
    Then the editor should contain "3" "p"

  Scenario: Add, transform, and remove lists
    # Add ol
    When I select "Font" menu and "ol" option
    Then the editor should contain "1" "ol"
    # Transform ol
    When I highlight the text "Hello"
    When I select "Font" menu and "ol" option
    Then the editor should contain "1" "ol" containing ""
    Then the editor should contain "1" "ol" containing "Hello"
    # Remove ol
    When I highlight the text "Hello"
    When I select "Font" menu and "ol" option
    Then the editor should contain "1" "ol" containing ""
    Then the editor should contain "0" "ol" containing "Hello"
    # Add ul
    When I select "Font" menu and "ul" option
    Then the editor should contain "1" "ul" containing ""
    # Transform ul
    When I highlight the text "World"
    When I select "Font" menu and "ul" option
    Then the editor should contain "1" "ul" containing ""
    Then the editor should contain "1" "ul" containing "World"
    # Remove ul
    When I highlight the text "World"
    When I select "Font" menu and "ul" option
    Then the editor should contain "1" "ul" containing ""
    Then the editor should contain "0" "ul" containing "World"
    
  Scenario: Add and remove effects
    # Add bold
    When I select "Font" menu and "bold" option
    Then the editor should contain "1" "bold"
    When I type into the editor "Bold Text"
    Then the editor should contain "1" "bold" containing "Bold Text"
    # Transform bold
    When I highlight the text "Hello"
    When I select "Font" menu and "bold" option
    Then the editor should contain "1" "bold" containing "Hello"
    # Remove bold
    When I highlight the text "Hello"
    When I select "Font" menu and "bold" option
    Then the editor should contain "0" "bold" containing "Hello"
    # Add italic
    When I select "Font" menu and "italic" option
    Then the editor should contain "1" "italic"
    When I type into the editor "Italic Text"
    Then the editor should contain "1" "italic" containing "Italic Text"
    # Transform italic
    When I highlight the text "World"
    When I select "Font" menu and "italic" option
    Then the editor should contain "1" "italic" containing "World"
    # Remove italic
    When I highlight the text "World"
    When I select "Font" menu and "italic" option
    Then the editor should contain "0" "italic" containing "World"

  Scenario: Alter alignment
    # Left align
    When I highlight the text "Hello World"
    When I select "Font" menu and "left" option
    Then the text "Hello World" should be "left" aligned
    # Center align
    When I highlight the text "Hello World"
    When I select "Font" menu and "center" option
    Then the text "Hello World" should be "center" aligned
    # Right align
    When I highlight the text "Hello World"
    When I select "Font" menu and "right" option
    Then the text "Hello World" should be "right" aligned