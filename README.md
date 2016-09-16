# Etch Boilerplate
Adapted from [ngBoilerplate](http://joshdmiller.github.com/ng-boilerplate).

```sh
$ npm install
$ grunt serve
```

Things to configure initially:

- API endpoints - common/data/data.settings
- If login and authentication is not required, remove auth stuff (app/auth, app/login, app/register, common/data/user)
- If auth is required, add token to API requests in common/data/data.settings
