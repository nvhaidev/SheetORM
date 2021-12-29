# Sheet ORM
>> _Remember to give yourself a star on GitHub_
### Sheet ORM for Google Apps Script is a library it features solid transaction support, eager and lazy loading, read replication and more.


## Adding the library to your project

```
1UA1d9yVXqE-wq90EyRj78MqOgUWdqhLYSwJ3uuW1WRC66AXrYh_4flC3
```

## Quick example
```js
async function test() {
  const db = SheetORM.connection('xxxxxxxxxxxxxxxxxxxxxxxxx');
  const row = ['Name', 'Email', 'Password'];
  try {
    const User = await db.createTable('Users', row);
    const user = User.create({
      Password: '11111111111',
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
     Password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:14:49'
    },
  save: [Function: save],
  destroy: [Function: destroy] }
```
![Table](https://i.imgur.com/kcSkPBg.png)

```js
async function test() {
  const db = SheetORM.connection('1IPehZDF0yLdZNSSIkMOdlW6iXlVc6bYpwxRVUEwM6iM');
  const row = ['Name', 'Email', 'Password'];
  try {
    const User = await db.createTable('Users', row);

    const user = User.findByPk(2);
    console.log(user)
    user.result.Name = 'Hello word'
    await user.save();
    console.log(user)
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
     Password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:28:12'
     },
  save: [Function: save],
  destroy: [Function: destroy] 
}
  { result: 
   { id: 2,
     Name: 'Hello word',
     Email: 'Test@gmail.com',
     Password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
![Table](https://i.imgur.com/87JdbOe.png)
### Create Table
```js
    const db = SheetORM.connection('xxxxxxxxxxxxxxxxxxxx');
    const row = ['Name', 'Email', 'Password'];
    const User = await db.createTable('Users', row);
```
### Create
```js
const user = await User.create({
  username: 'test',
  password: '11111111'
});
console.log(user)
 { result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
### FindOne
```js
const user = await User.findOne({
 where:{
     username: 'test',
 }
});
console.log(user)
 { result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
### FindByPk
```js
const user = await User.findByPk(2);
console.log(user)
 { result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
### FindAll
```js
const user = await User.findAll();
console.log(user)
 { result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
```js
const user = await User.findAll({
where:{
   username: 'test'  
},
limit:1,
offset:2
});
console.log(user)
 { result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```
### FindAndCountAll
```js
const user = await User.findAndCountAll();
console.log(user)
 {
 conut:1, 
 result: 
   { id: 2,
     username: 'test',
     password: 11111111111,
     createdAt: '12-29-2021 08:14:49',
     updatedAt: '12-29-2021 08:34:36'
     },
  save: [Function: save],
  destroy: [Function: destroy]
  }
```

## License
The MIT License
