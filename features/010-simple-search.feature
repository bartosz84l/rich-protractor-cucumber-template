Feature: 010 - Simple Search
    
    @ci 
    Scenario: Searching signle phrase
        When I enter "TestArmy" phrase
        Then I should see "TestArmy" page in the 1 row of the results