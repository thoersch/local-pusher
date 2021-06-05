## Local Pusher

A mock server for the Pusher services intended for local (offline) development.

## Status (Heavy WIP)

Notes:
* Websocket server runs on port 3000
* Connections and Disconnections are tracked
* Successful pusher handshake completed on connection
* Pusher's keepalive Ping/Pong is implemented
* Subscribe/Unsubscribe currently stubbed
* Wildcard events are now working
* Pusher's client events (client-*) are now handled

## License

Copyright © 2021 Tyler Hoersch

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.