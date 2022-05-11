# BetDuel
> Made up UI for selecting bets and seeing the odds return

![BetDuel](https://github.com/darrenkeen/betduel/blob/main/src/assets/betduel-web.png?raw=true)

## Prerequisites
You require the following in order to run this project:
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

NPM comes with Node.js so feel free to use that. For any steps in the course I will be using yarn (most commands are similar).

## Install
NPM:
```sh
$ npm install
```

Yarn:
```sh
$ yarn
```

## Running the app
NPM:
```sh
$ npm run start
```

Yarn:
```sh
$ yarn start
```

## Server 

### Get Picks/Fixtures
Returns all the fixtures and their information like team names and odds.

#### Request
```
GET: /fixtures
```
#### Response
```
{
  "message": string,
  "data": {
    "id": number,
    "homeTeam": string,
    "awayTeam": string,
    "homeOdds": number,
    "awayOdds": number,
    "drawOdds": number
  }[]
}
```


### Get betslips
Returns all the created betslips.

#### Request
```
GET: /betslip
```
#### Response
```
{
  "message": string,
  "data": {
    "betslipId": number,
    "stake": number,
    "returns": number,
    "picks": {
      "selection" string,
      "fixture": {
        "homeTeam": string,
        "awayTeam": string,
        "homeOdds": number,
        "awayOdds": number,
        "drawOdds": number
      }
    }[]
  }[]
}
```

### Get single betslip
Returns a specific betslip based on its ID.

#### Request
```
GET: /betslip/:id
```
#### Response
```
{
  "message": string,
  "data": {
    "betslipId": number,
    "stake": number,
    "returns": number,
    "picks": {
      "selection" string,
      "fixture": {
        "homeTeam": string,
        "awayTeam": string,
        "homeOdds": number,
        "awayOdds": number,
        "drawOdds": number
      }
    }[]
  }
}
```

### Get single betslip
Creates a betslip and returns the created data

#### Request
```
POST: /betslip/create
```
Example post data:
```
{
	"picks": [
		{
			"fixtureId": 1,
			"selection": "draw"
		},
		{
			"fixtureId": 2,
			"selection": "home"
		},
		{
			"fixtureId": 3,
			"selection": "away"
		},
		{
			"fixtureId": 4,
			"selection": "home"
		}
	],
	"stake": 12.45,
	"returns": 1235.12
}
```

#### Response
```
{
  "message": string,
  "data": {
    "betslipId": number,
    "stake": number,
    "returns": number,
    "picks": {
      "selection" string,
      "fixture": {
        "homeTeam": string,
        "awayTeam": string,
        "homeOdds": number,
        "awayOdds": number,
        "drawOdds": number
      }
    }[]
  }
}
```