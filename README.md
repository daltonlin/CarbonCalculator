# Air Travel Carbon Calculator 

CSCI E-33a Final Project 

## Motivation

In recent years, climate change and global warming become more extreme and pose an imminent challenge to humility. 
According to a report by [IATA](https://www.iata.org/contentassets/c4f9f0450212472b96dac114a06cc4fa/fact-sheet-climate-change.pdf), 
the global aviation industry accounts for 2% of all human source carbon dioxide emissions, and one of the highest among transport methods in terms of per passenger mile emission. 
With environmental awareness on the rise, frequent air travelers are seeking to counterbalance their carbon footprint by purchasing carbon offset credit. 
As a frequent flyer traveling over 100k miles each year, I hoped to design a web app to calculate and record my travel history, so I could better track my carbon emissions and enable me to purchase a proper amount of credit to offset my footprint.   

## Installation

Other than Django and the Python standard library, this app does not require additional Python libraries. 

To install Django, use a package manager like [pip](https://pip.pypa.io/en/stable/) to install the modules.

```bash
pip install django
```

[Pipenv](https://pipenv.pypa.io/en/latest/) is also supported. Pipfile and Pipfile.lock have been packaged and are ready to deploy. To activate a virtualenv run:

```bash
pipenv shell
```

To start the app, first, make migrations for the calculator app and apply migrations to the database.

```bash
python manage.py makemigrations calculator
python manage.py migrate
```

To start the Django web server, run:

```bash
python manage.py runserver
```

##Usage

A user can search departure and arrival airports, and travel distance and carbon footprint will be calculated and display to the user. 
The search feature currently supports search by airport name, and location information (e.g. city name, county name.) 
One of the popular identifiers, IATA 3 letter airport code is not currently supported due to licensing requirements.
The aerodrome location dataset is obtained from [International Civil Aviation Organization's public database](https://www.icao.int/safety/iStars/Pages/API-Data-Service.aspx).

The distance between two airports is calculated based on [standard distance calculation between latitude/longitude points](https://www.movable-type.co.uk/scripts/latlong.html), 
which returns the shortest route between two points on the earth. The actual fly distance may vary depending on the operator and schedule. 
Alternatively, the user can adjust the travel distance based on their actual travel distance if this information is known to the user. 
Additionally, the user is able to select a unit between miles and kilometers, whether which is chosen, the unit will be automatically converted, and produce the result accordingly. 

The frontend interface is handled by JavaScript. Scripts can be found in:

```bash
final/calculator/static/calculator/scripts.js
```

Furthermore, the user can elect to save the calculation to their personal profile. After each calculation, the user can click on "Save the Entry" button to save the calculation, 
if the user is not login, it will take the user to the login page. 

The backend API is written in Python and can be found in:

```bash
final/calculator/views.py
```

And the database is managed by Django models. The models can be found in:

```bash
final/calculator/models.py
```

##References

In addition to the above-mentioned references, the aerodrome location dataset from [International Civil Aviation Organization's public database](https://www.icao.int/safety/iStars/Pages/API-Data-Service.aspx)
and formulation for distance calculation between latitude/longitude points from [Movable Type Ltd.](https://www.movable-type.co.uk/scripts/latlong.html).

The emission calculation for carbon dioxide utilizes a formulation from [the United States Environmental Protection Agency](https://www.epa.gov/sites/production/files/2018-03/documents/emission-factors_mar_2018_0.pdf).

The user login/logout and register features are based on [Harvard University CSCI E-33a](https://cs50.harvard.edu/extension/web/2020/spring/)'s course homework projects.

These references can be also found on the app's references page. 