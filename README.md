# wba2ss17_mehr-nehmke-pruess
Privates Repository für Team 38 mit Jan Mehr, Tim Nehmke und Jared Prüß
  
## Setup

#### Clone
```
git clone https://github.com/jomehr/wba2ss17_mehr-nehmke-pruess.git
```
#### In dienstnutzer Ordner navigieren
```
cd Dienstnutzer
```
#### Install
```
npm install
```
#### Run
```
node Dienstnutzer.js
```
  
### Disclaimer

Der Dienstgeber ist auf Heroku deployed. Der Dienstgeber gefindet sich im 'dienstgeber' branch oder auf https://wba2ss17-team38.herokuapp.com  
Der gegebene Testclient kann keine Sonderzeichen wie " - " benutzen. Deshalb bitte nur IDs ohne Sonderzeichen nehmen!


### Beispiel Use Case Schnitzeljagd erstellen

1. Pub/sub Testclient Service 'faye' benutzen, method: 'sub',host: 'http://localhost:8081', topic: '/games'
2. POST Anfrage im REST Client auf 'http://localhost:8081/games' mit Body:
```
{
	"titel": "titel hier",
	"description": "neue Beschreibung",
	"endcoordinates": "templatekoordinate",
	"creator": "name",
	"startdate": "18.7.2017",
	"expirationdate": "22.7.2017",
	"reward": "70 Punkte ;)"

} 
```  
3. Im Pub/Sub Client sollte nun eine Nachricht mit dem angegebenen Body auftauchen.  
  
### Beispiel Use Case Teilnehmer zu Schnitzeljagd hinzufügen

1. GET Anfrage auf 'http://localhost:8081/games' 
2. Aus dem Response-body eine SpielID kopieren z.B 'BJJUFpvVb'
3. Pub/sub Testclient Service 'faye' benutzen, method: 'sub',host: 'http://localhost:8081', beim topic: '/games' die ID dranschreiben.
z.B. '/gameBJJUFpvVb'
4.POST Anfrage im REST Client auf 'http://localhost:8081/games/{gameid}/participants' (bei {gameid} kopierte ID einfügen) mit folgendem Body:
```
{

  "first_name": "templatevorname",
  "last_name": "templatenachname ",
  "username": "templateusername"
 
 }
 ````
 5. Im Pub/Sub Client sollte nun eine Nachricht erscheinen.
  
### Beispiel Point of Interest Post und delete


1. PATCH Anfrage im REST Client auf 'http://localhost:8081/games/{gameid}/poi' mit KEINEM Body!  
Es muss noch eine Möglichkeit Koordinaten zu einer Bounding Box und die Art der Points of Interest anzugeben implementiert werden.  
Im Moment werden in der Nähe der Th Koeln alle Restaurants angezeigt.
2. Dienstnutzer holt sich mit Hilfe von Overpass die nötigen Daten und gibt diese an den Dienstgeber weiter. 
3. DELETE Anfrage im REST Client auf 'http://localhost:8081/games/{gameid}/poi' mit KEINEM Body!
4. Auch hier gibt der Dienstnutzer dem Dienstgeber den Request zum Löschen der Poi weiter.
