const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give a password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
        `mongodb+srv://jeamianh:${password}@cluster0.nmm6lku.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema =  new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
// 参数: 名称，模型；返回一个构造函数

if (process.argv.length === 3) {
    console.log('PhoneBook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
    mongoose.connection.close()
    // Person.fing() 是一个异步操作，需要等待完成后再退出
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]


    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}


