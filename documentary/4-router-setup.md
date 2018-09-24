## Router Set-up

After the _Application_ and _Router_ instances are obtaining after starting the server in the `app` and `router` properties of the returned object, the router can be configured to respond to custom paths. This can be done by assigning required middleware from the map, and calling the `use` method on the _Application_ instance.

%EXAMPLE: example/router.js, ../src => @idio/core%
%FORK example example/router%

%~%