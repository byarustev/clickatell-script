const express = require('express')
const bodyParser = require('body-parser')
var XMLHttpRequest = require('xhr2');
var cors = require('cors');

const app = express()


/***
 * Target usecase
 * STEPS
 * 1. user sends a message on our whats up number (clickatell reg no).
 * 2. clickatell invokes our callback. We then send a menu to the user back (menu is from our backend)
 * 3. user replies by making a selection
 * 4. clickatell sends the selection to our callback server. 
 * basing on the menu item selected our backend knows which info to present back to the user
 * 5. this goes on until the user gets to the final response or becomes inactive
 * NB. 
 * 
 * We dont want to use the flowchat product since we need to make the responses dependant on the info we have in the DMP
 */

const integrationId = process.env.INTERGRATION_ID
const newApikey = process.env.API_KEY

const http = require('http')
const port = process.env.PORT || 1338

const server = http.createServer(app)
app.use(cors())

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`);

    app.get('/', function (req, res) {
      res.send('Its working base route')

      var xhr = new XMLHttpRequest()
      const nnn = JSON.stringify(
          {
              "messages": [
                  {
                      "channel": "whatsapp",
                      "to": "256706440588",
                      "content": "its working. just base url GET"
                  }
              ]
          }
      );
      xhr.open('POST', 'https://platform.clickatell.com/v1/message', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', newApikey);
      xhr.onreadystatechange = function(){
          if (xhr.readyState == 4 && xhr.status == 200) {
              console.log('success');
          }
      };

      xhr.send(nnn);
    })

    /**
     * NB. I atleast expect this to be invoked by the callback once a user initiates a communication
     * 
     */
    
    app.post('/', function (req, res) {
    console.log(req.body.event, 'event info from base')
    })

  app.post('/client-callback/one-api-reply', function (req, res) {
    console.log(req.body, 'request')
    var xhr = new XMLHttpRequest()
    const nnn = JSON.stringify(
        {
            "messages": [
                {
                    "channel": "whatsapp",
                    "to": "256706440588",
                    "content": "Test WhatsApp - we got ur initial contact via /one-api-reply"
                }
            ]
        }
    );
    xhr.open('POST', 'https://platform.clickatell.com/v1/message', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', newApikey);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('success');
        }
    };

    xhr.send(nnn);
})
})