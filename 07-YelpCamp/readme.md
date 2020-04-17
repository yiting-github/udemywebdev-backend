## Show Page (v2)
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop() -> delete all things in DB
* Add a show route/template

## Refactor Mongoose Code (v3)
* Create a models directory
* Use module.exports
* Require everything correctly!

## Add Seeds File
* Add a seed.js file
* Run the seeds file every time the server starts

## Add the Comment model (v4)
* Make our errors go away!
	* new file: models/comment.js
	* Embedding ID:add comments to campgroundSchema
* Display comments on camground show page

## Comment New/Create 
* Discuss nested routes
* Add the comment new form and create routes

## Style Show Page (v5)
* Add sidebar to show page
* Display comments nicely - public folder

## Auth Pt.1 - Add User Model (v6)
* Install all packages needed for auth
* Define User model

## Auth Pt.2 - User Register
* Add Register routes
* Add Register form

## Auth Pt.3 - Login
* Add login routes
* Add login form

## Auth Pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Auth Pt.5 - Show/Hide links
* Show/hide auth links correctly

## Refator the routes (v7)
* make app.js clean and use Express Router

## Users + Comments (v8)
* Associate users and comments
* Save author's name to a comment automatically

## Routes
| Name   | Routes                        | HTTP Verb | Comments                                                             |
|--------|-------------------------------|-----------|----------------------------------------------------------------------|
| Index  | /campgrounds                  | GET       | View all campgrounds                                                 |
| New    | /campgrounds/new              | GET       | a form to create the new campground                                  |
| Create | /campgrounds                  | POST      | add a new campground, then redirect somewhere                        |
| Show   | /campgrounds/:id              | GET       | Show details about one specific campground                           |
| New    | /campgrounds/:id/comments/new | GET       | a form to create the new command about specific campground           |
| Create | /campgrounds/:id/comments     | POST      | add a new comment about specific campground, then redirect somewhere |