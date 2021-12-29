# Sheet ORM
>> _Remember to give yourself a star on GitHub_
### Sheet ORM for Google Apps Script is a library it features solid transaction support, eager and lazy loading, read replication and more.


## Adding the library to your project

```
1UA1d9yVXqE-wq90EyRj78MqOgUWdqhLYSwJ3uuW1WRC66AXrYh_4flC3
```

## Usage
```js
async function test() {
  const db = SheetORM.connection('xxxxxxxxxxxxxxxxxxxxxxxxx');
  const row = ['Name', 'Email', 'Password'];
  try {
    const User = await db.createTable('Users', row);
    const user = User.create({
      Password: '9999999999',
      Email: 'Test@gmail.com',
      Name: "Test"
    });
    console.log(user.result)
  } catch (e) {
    console.log(e)
  }
}
```
```console
{ result: 
   { id: 2,
     Name: 'Test',
     Email: 'Test@gmail.com',
     Password: 9999999999,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:14:49'
    },
  save: [Function: save],
  destroy: [Function: destroy] }
```
![Table](https://i.imgur.com/kcSkPBg.png)

## License
The MIT License
