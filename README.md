# wba2ss17_mehr-nehmke-pruess
Privates Repository für Team 38 mit Jan Mehr, Tim Nehmke und Jared Prüß

## Beispiel Use Case Schnitzeljagd erstellen

1. Im Rest Client eine GET Anfrage auf 'http://localhost:8081/games' um eine Liste aller Spiele zu bekommen
2. Im pub/sub Testclient den Service 'faye' benutzen, 'sub' eingeben, 'http://localhost:8081' als host eingeben und als topic '/games' angeben
3. Zum Erstellen eines neues Spiels eine POST Anfrage im REST Client auf 'http://localhost:8081/games' mit folgendem Body:
```
{
	"titel": "titel hier",
	"description": "neue Beschreibung",
	"creator": "name",
	"startdate": "18.7.2017",
	"expirationdate": "22.7.2017",
	"reward": "70 Punkte ;)"

} 
```  
Der Vorgang kann bis zu 8 Sekunden dauern, da eine zufällig generierte ID zugewiesen wird  
4. Im Pub/Sub Client sollte nun eine Nachricht mit dem angegebenen Body auftauchen.  
  
## Beispiel Use Case Teilnehmer zu Schnitzeljagd hinzufügen

1. Im Rest Client eine GET Anfrage auf 'http://localhost:8081/games' um eine Liste aller Spiele zu bekommen
2. Aus dem Response-body eine SpielID kopieren, z.B 'BJJUFpvVb'
3. Im pub/sub Testclient den Service 'faye' benutzen, 'sub' eingeben, 'http://localhost:8081' als host eingeben und als topic '/gamesBJJUFpvVb' oder '/games' mit einer anderen ID angeben.
4. Zum Erstellen eines neuen Participants eine POST Anfrage im REST Client auf '' mit folgendem Body:
```
{

  "first_name": "templatevorname",
  "last_name": "templatenachname ",
  "username": "templateusername"
 
 }
 ````
 5. Im Pub/Sub Client sollte nun eine Nachricht erscheinen die besagt dass dem angegebenem Spiel ein neuer Spiel beigetreten ist.
  
## Beispiel Use Case Schnitzeljagd bearbeiten

1. Im pub/sub Testclient den Service 'faye' benutzen, 'sub' eingeben, 'http://localhost:8081' als host eingeben und als topic '/games' angeben
3. Zum Erstellen eines neues Spiels eine PATCH Anfrage im REST Client auf 'http://localhost:8081/games/BJJUFpvVb' mit folgendem Body:
```
{
	"titel": "titel update",
	"description": "Beschreibung update",
	"creator": "name",
	"startdate": "19.7.2017",
	"expirationdate": "28.7.2017",

} 
```  
4. Im Pub/Sub Client sollte nun eine Nachricht mit dem angegebenen Body auftauchen.
