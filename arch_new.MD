# Table Schema

```js
Record:{
  record_(index):{
    subject: String,
    detail: String,
    parent: String,
    child: String,
    Time: Timestamp
  }
}

User:{
  owner: String,
  parents:{
    parent_(index): String
  },
  children:{
    child_(index): String
  }
}
```