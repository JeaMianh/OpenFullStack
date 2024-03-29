const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert');

const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
// 从 app.js 模块中导入 Express 应用程序，并用 supertest 函数将其封装到一个所谓的 superagent 对象中。这个对象可以用来发送 HTTP 请求。



describe('Note API', () => {    
    // 在每个测试用例运行前执行
    beforeEach(async () => {
        // 删除 Note 中所有文档
        await Note.deleteMany({})
        // console.log('Cleared')

        // 使用 for of 块 确保顺序执行
        for (let note of helper.initialNotes) {
            let noteObject = new Note(note)
            await noteObject.save()
        }
        
        // // Mongoose 对象数组
        // const noteObject = helper.initialNotes.map(note => new Note(note))
        // // Promise 数组
        // const promiseArr = noteObject.map(note => note.save())
            
        // await Promise.all(promiseArr)
        // // Promise.all() 方法将 promise 数组转换为单个 promise，并行执行
        

        // helper.initialNotes.forEach(async (note) => {
        //     let noteObject = new Note(note)
        //     await noteObject.save()
        //     console.log('saved')
        // })
        // console.log('done')
        // let noteObject = new Note(helper.initialNotes[0])
        // await noteObject.save()
        // noteObject = new Note(helper.initialNotes[1])
        // await noteObject.save()
    })
    
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            // \ 用于转义字符，/ 用于表示正则表达式的开始和结束。
        // const response = await api.get('/api/notes')
        // response.expect(200)
        // response.expect('Content-Type', /application\/json/)
    })

    // test('there are two notes', async () => {
    //     const response = await api.get('/api/notes')

    //     assert.strictEqual(response.body.length, helper.initialNotes.length)
        
    // })

    test('the first note is about HTTP methods', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)
        assert(contents.includes('HTML is easy'))
    })

    test('a valid note can be added', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
        }

        // api 是一个 superagent 对象
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            // created
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)

        const notesAtEnd = await helper.notesInDb()

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
        assert(contents.includes('async/await simplifies making async calls'))

    })

    test('note without content is not added', async () => {
        const newNote = {
            import: true
        }
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
            // Bad request

        const response = await api.get('/api/notes')
           
        const notesAtEnd = await helper.notesInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})