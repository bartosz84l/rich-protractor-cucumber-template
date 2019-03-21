Feature: 020 - Simple Compare
    
    @headless @scenario
    Scenario: Compare start site
        Then We should see a Google search field
        And This should be fail

    @headless @scenario
    Scenario: Compare result of searching
        When I enter "TestArmy" phrase
        Then We should get a TestArmy header on Google page