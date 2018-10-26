//--------------------------------------------------------------------

const person = {name: 'Fred', age: 87};
Object.values(person);      // ['Fred',	87]

const people = ['Fred', 'Tony'];
Object.values(people);      // ['Fred', 'Tony']

const person = {name: 'Fred', age: 87};
Object.entries(person);     // [['name', 'Fred'], ['age', 87]]

const people = ['Fred', 'Tony'];
Object.entries(people);     // [['0', 'Fred'], ['1', 'Tony']]

//--------------------------------------------------------------------

const getFirstUserData = async () => {
    const response = await fetch('/users.json') // get users list
    const users = await response.json() // parse JSON
    const user = users[0] // pick first user
    const userResponse = await fetch(`/users/${user.name}`) // get user data
    const userData = await user.json() // parse JSON
    return userData
}

getFirstUserData()

//--------------------------------------------------------------------
