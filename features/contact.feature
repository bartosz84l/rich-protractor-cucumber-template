Feature: 021 - Contact form

    As a user I would like to send a contact form

    @contact
    Scenario Outline: Fill and send contact form
        Given User is on a contact page
        When User fills out all the relevant fields <Name>, <Email>, <Content> and click submit button
        Then User should see the message after

        Examples:
            | Name   | Email | Content |
            | Bartek | @a   | test1   |
            | Bartr  | @b   | test2   |
            | Bart   | @c   | test3   |
            | Bar    | @d   | test4   |
            | Bartek | @a   | test1   |
            | Bartr  | @b   | test2   |
            | Bart   | @c   | test3   |
            | Bar    | @d   | test4   |
            | Bart   | @c   | test3   |
            | Bar    | @d   | test4   |