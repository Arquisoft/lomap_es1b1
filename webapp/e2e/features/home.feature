Feature: HomePage

Scenario: The user views the map page of the app
  Given An user in the home page
  When The user clicks on the map link in the navbar
  Then The map page should be shown

Scenario: The user clicks on the Let's get started button
  Given An user in the home page
  When The user clicks on the button
  Then The map page should be shown