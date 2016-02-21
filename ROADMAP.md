# Database
**Collections**
- Users:
```
{
    _id: 1234567890abcd0987654321,
    username: "xtv",
    password: "Camera14", // hashed, etc
    programmes: [
        "1234567890abcd0987654321",
        "1234567890abcd0987654321"
    ],
    display: {
        selected: "1234567890abcd0987654321",
        devices: [
            "1234567890abcd0987654321",
            "1234567890abcd0987654321"
        ]
    }

}
```
- Programmes:
```
{
    _id: 1234567890abcd0987654321,
    programme: "Guild Elections 2015",
    users: [
        "1234567890abcd0987654321",
        "1234567890abcd0987654321"
    ],
    owner: "1234567890abcd0987654321",
    deleted: false
    cues: [ // ordered!
        "1234567890abcd0987654321",
        "1234567890abcd0987654321"    
    ]
}
```
- Cues:
```
{
    _id: 1234567890abcd0987654321,
    page: 110,
    title: "INTRO",
    text: "Hello and welcome to this fabulous show.\nIt really is fabulous, isn't it?"
}
```
- Displays:
```
{
    _id: 1234567890abcd0987654321,
    name: "iPad Nik",
    resolution-x: 1024,
    resolution-y: 576,
    colour-background: 'black',
    colour-text: 'white'
}
```
