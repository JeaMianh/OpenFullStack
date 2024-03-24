const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
import { Request, Response } from 'express'


interface BlogType {
    title: string,
    author: string,
    url: string,
    likes: number,
}

blogsRouter.get('/api/blogs', (request: Request, response: Response) => {
    Blog
        .find({})
        .then((blogs: BlogType[]) => {
            response.json(blogs) 
        })
})

blogsRouter.post('/api/blogs', (request: Request, response: Response, next: Function) => {
    const blog =  new Blog(request.body)

    blog
        .save()
        .then((result: BlogType) => {
            response.status(201).json(result);
        })
        .catch((error: Error) => {
            next(error)
        })
})

module.exports = blogsRouter