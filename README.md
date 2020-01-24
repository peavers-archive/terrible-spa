# Terrible Angular Template 
...with Firebase authentication wired in

[![build status](https://github.com/peavers/terrible-angular-template/workflows/Main/badge.svg)](https://github.com/peavers/terrible-angular-template/actions)

## Demo
https://terrible-angular-template.web.app

## Authentication
Firebase already installed, just add your configuration to the `environment.ts` file, enable your authentication provider in firebase
and you're good to go.  

## Core
Holds services, models, interceptors etc. Anything that is core to the application functionality 

## Layout
Very basic containers for the application. Things like the header, footers, sidebars etc. 

## Modules
The main workhorse that creates your application.

## Shared
Components used across multiple modules. Normally ends up with a bunch of dialog boxes or buttons. 

## Deployments
GitHub actions is wired up to deploy this to firebase. Add your firebase token to GitHub Actions. Every push to master will be released. 
