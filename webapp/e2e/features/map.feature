Feature: Map view

Scenario: The user opens the filters
  Given An user in the map page
  When The user clicks on the filters button
  Then It opens the filters dialog

Scenario: The user selects the public locations map
  Given An user in the map page
  When The user clicks on the combo box and selects public locations
  Then The public locations are displayed
