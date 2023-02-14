# Studentska sluzba

U ovom projektu smo objasnili osnovne koncepte u Docker ekosistemu na primeru aplikacije studentske službe. Aplikacija predstavlja jednostavan CRUD sistem koji omogućava osnovne operacije nad entitetima kao što su studenti, profesori, smerovi i predmeti. U aplikaciji je takođe moguće otvaranje ispitnih rokova i prijavljivanje ispita, kao i upis ocena studentima.

## Kreiranje slika

Za kreiranje Docker slike za serversku aplikaciju potrebno je otići u direktorijum ServerSide i u terminalu pokrenuti naredbu `docker build -t="nelor/nodove1" .`.
Za kreiranje Docker slike za klijentsku aplikaciju potrebno je otići u direktorijum cc/dist i u terminalu potrenuti naredbu `docker build -t="nelor/angulare1" .`.

## Pokretanje aplikacije

Za pokretanje aplikacije u samim Docker kontejnerima potrebno je da se vratimo u osnovni direktorijum gde se nalazi fajl `docker-compose.yml`.
Aplikaciju pokrećemo naredbom `docker compose up`
