	
### RESTful Routing

#### REST - REpresentational State Tranfer
* a mapping between HTTP routes and CRUD

* web services - a common platform that allows multiple applications built on various programming languages to have ability to communicate with each other, ** RESTful web services is one of the web services ** .

* is an architecture to create RESTful services

| Name    | Routes         | HTTP Verb | Comments                                         |Mongoose Method         |
|---------|----------------|-----------|--------------------------------------------------|------------------------|
| Index   | /dogs          | GET       | View all dogs                                    |Dog.find()              |
| New     | /dogs/new      | GET       | a form to create the new dog                     |N/A                     |
| Create  | /dogs          | POST      | add a new dog, then redirect somewhere           |Dog.create()            |
| Show    | /dogs/:id      | GET       | Show details about one specific dog              |Dog.findById()          |
| Edit    | /dogs/:id/edit | GET       | Show edit form for one exist dog                 |Dog.findById()          |
| Update  | /dogs/:id      | PUT       | update a particular dog, then redirect somewhere |Dog.findByIdAndUpdate() |
| Destroy | /dogs/:id      | DELETE    | delete a particular dog, then redirect somewhere |Dog.findByIdAndRemove() |