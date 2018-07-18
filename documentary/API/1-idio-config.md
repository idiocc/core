
### `IdioConfig` Type

%TYPE true
<p name="port" type="number">
  <d>Port on which to listen, default <code>5000</code>.</d>
  <e><code>80</code></e>
</p>
<p name="host" type="string">
  <d>Host to which to bind, default <code>0.0.0.0</code>.</d>
  <e><code>127.0.0.1</code></e>
</p>
<p name="middleware" type="MiddlewareConfig">
  <d>Middleware configuration. See details below.</d>
  <e row>

```js
{
  session: {
    use: true,
    keys: ['secret-key'],
  },
  static: {
    mount: '/files',
    root: 'files',
    use: true,
  },
}
```
</e>
</p>
%

