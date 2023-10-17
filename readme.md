# Project: BlogAPI
This project is an API that allows authors to create, manage, and interact with their blog-related content, and users. This API serves as the backend for a blog platform and offers various endpoints to perform actions such as creating authors, writing and updating blog posts, liking blogs, posting comments, and more.
# 📁 Collection: Author Routes 


## End-point: getAuthor
Returns the author with thier blog
### Method: GET
>```
>https://bloggerapi.onrender.com/author/652dae90e69ca3127d6921e4
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Response: 200
```json
{
    "message": "Successfully fetched blogs.",
    "blogLists": [
        {
            "authorName": "Test Acc, Test2 Acc2",
            "authorEmails": "testacc@gmail.com, testacc2@gmail.com",
            "blogTitle": "asdf asdf asdf asdf",
            "blogContent": "qwer qwer qwer qwer",
            "blogLike": 6,
            "blogView": 55,
            "comments": [
                {
                    "comment": "Cool Blog",
                    "userFullName": "User One",
                    "userEmail": "userone@gmail.com"
                }
            ]
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: postAuthor
Creates a new author
### Method: POST
>```
>https://bloggerapi.onrender.com/author/create
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "fname": "Test2",
    "lname": "Acc2",
    "email": "testacc2@gmail.com"
}
```

### Response: undefined
```json
null
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: putAuthor
Usage: /author/authorId

Updates an author with a give fname (Optional), lname (Optional) and email (Optional).
### Method: PUT
>```
>https://bloggerapi.onrender.com/author/update/652daae740a77ddb99c63d29
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "fname": "Test4",
    "lname": "Acc4"
}
```

### Response: 201
```json
{
    "message": "Author updated successfully!",
    "author": {
        "_id": "652daae740a77ddb99c63d29",
        "fname": "Test4",
        "lname": "Acc4",
        "email": "testacc3@gmail.com",
        "blogs": [],
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: deleteAuthor
Usage: author/authorId

Deletes author specified by authorId
### Method: DELETE
>```
>https://bloggerapi.onrender.com/author/delete/652dadd4e69ca3127d6921da
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json

```

### Response: 201
```json
{
    "message": "Author deleted successfully!"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Blog Routes 


## End-point: getBlog
Fetchs specifed blogId avaliable blogs
### Method: GET
>```
>https://bloggerapi.onrender.com/blog/652e39b05ca21ddaf9d14145
>```
### Response: 201
```json
{
    "message": "Blog fetched successfully!",
    "populatedBlog": {
        "authorName": "Test Acc, Test2 Acc2",
        "authorEmails": "testacc@gmail.com, testacc2@gmail.com",
        "blogTitle": "asdf asdf asdf asdf",
        "blogContent": "qwer qwer qwer qwer",
        "blogLike": 6,
        "blogView": 56,
        "comments": [
            {
                "comment": "Cool Blog",
                "userFullName": "User One",
                "userEmail": "userone@gmail.com"
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getBlogs
Fetchs all avaliable blogs
### Method: GET
>```
>https://bloggerapi.onrender.com/blog
>```
### Response: 201
```json
{
    "message": "Blog fetched successfully!",
    "blogLists": [
        {
            "authorName": "Test2 Acc, Test4 Acc4",
            "authorEmails": "testacc3@gmail.com, testacc4@gmail.com",
            "blogTitle": "asdf asdf asdf asdf",
            "blogContent": "qwer qwer qwer qwer",
            "blogLike": 0,
            "blogView": 1,
            "comments": []
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: postBlog
/blog/create is used to create a blog

authorIds is an array. So you can pass two authorIds to create a blog as co-authored or used single authorId in the array to create as single author
### Method: POST
>```
>https://bloggerapi.onrender.com/blog/create
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "authorIds": ["652e746a7dcf222f7b81adcf", "652e7535f3ca0ee04859432b"],
    "title": "asdf asdf asdf asdf",
    "content": "qwer qwer qwer qwer"
}
```

### Response: 201
```json
{
    "message": "Blog created successfully!",
    "blog": {
        "title": "asdf asdf asdf asdf",
        "content": "qwer qwer qwer qwer",
        "like": 0,
        "view": 0,
        "authors": [
            "652dae90e69ca3127d6921e4",
            "652dae97e69ca3127d6921e7"
        ],
        "comments": [],
        "_id": "652daf201d0e59821d462056",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: putBlog
Usage: blog/update/blogId

Updates(Edit) the specifed blogId the the passed attributes. both title and content are optionals so you can update on of them or both.
### Method: PUT
>```
>https://bloggerapi.onrender.com/blog/update/652daf201d0e59821d462056
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "title": "zxcv zxcv",
    "content": "mnbv mnbv"
}
```

### Response: 201
```json
{
    "message": "Blog updated successfully!",
    "blog": {
        "_id": "652daf201d0e59821d462056",
        "title": "zxcv zxcv",
        "content": "mnbv mnbv",
        "like": 0,
        "view": 0,
        "authors": [
            "652dae90e69ca3127d6921e4",
            "652dae97e69ca3127d6921e7"
        ],
        "comments": [],
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: deleteBlog
Deleted specified blog in the URL
### Method: DELETE
>```
>https://bloggerapi.onrender.com/blog/delete/652e38ef5ca21ddaf9d14139
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json

```

### Response: 201
```json
{
    "message": "Blog deleted successfully!",
    "blog": {
        "_id": "652e38ef5ca21ddaf9d14139",
        "title": "asdf asdf asdf asdf",
        "content": "qwer qwer qwer qwer",
        "like": 0,
        "view": 0,
        "authors": [
            "652dae90e69ca3127d6921e4",
            "652dae97e69ca3127d6921e7"
        ],
        "comments": [],
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: postLike
Like specified blog
### Method: POST
>```
>https://bloggerapi.onrender.com/blog/like/652e75477dcf222f7b81add4
>```
### Response: 201
```json
{
    "message": "Blog liked successfully!",
    "blog": {
        "_id": "652e75477dcf222f7b81add4",
        "title": "zxcv zxcv",
        "content": "mnbv mnbv",
        "like": 1,
        "view": 1,
        "authors": [
            "652e746a7dcf222f7b81adcf",
            "652e7535f3ca0ee04859432b"
        ],
        "comments": [],
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Comment Routes 


## End-point: getComment
Fetch specific comment
### Method: GET
>```
>https://bloggerapi.onrender.com/comment/652e549c43a7ac140d83f4d3
>```
### Response: 201
```json
{
    "message": "Comment fetched successfully!",
    "comment": {
        "_id": "652e549c43a7ac140d83f4d3",
        "comment": "Cool Blog",
        "__v": 0,
        "user": {
            "_id": "652e4d3b07254fc448841124",
            "fname": "User",
            "lname": "One",
            "email": "userone@gmail.com",
            "comments": [
                "652e549c43a7ac140d83f4d3"
            ],
            "__v": 2
        },
        "blog": {
            "_id": "652e39b05ca21ddaf9d14145",
            "title": "asdf asdf asdf asdf",
            "content": "qwer qwer qwer qwer",
            "like": 0,
            "view": 0,
            "authors": [
                "652dae90e69ca3127d6921e4",
                "652dae97e69ca3127d6921e7"
            ],
            "comments": [
                "652e549c43a7ac140d83f4d3"
            ],
            "__v": 4
        }
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: postComment
Gives a comment on specific blog.

Usage /comment/commentId
### Method: POST
>```
>https://bloggerapi.onrender.com/comment/create
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "comment": "Cool Blog",
    "blogId": "652e39b05ca21ddaf9d14145",
    "userId": "652e4d3b07254fc448841124"
}
```

### Response: 201
```json
{
    "message": "Comment created successfully!",
    "comment": {
        "comment": "Cool Blog",
        "userId": "652e3ace5ca21ddaf9d14148",
        "blogId": "652e39b05ca21ddaf9d14145",
        "_id": "652e4a8a1ff30f00a9500c04",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: putComment
Gives a comment on specific blog.

Usage /comment/commentId
### Method: PUT
>```
>https://bloggerapi.onrender.com/comment/update/652e4d5a07254fc448841128
>```
### Body (**raw**)

```json
{
    "comment": "Great Blog"
}
```

### Response: 201
```json
{
    "message": "Comment updated successfully!",
    "comment": {
        "_id": "652e4d5a07254fc448841128",
        "comment": "Great Blog",
        "userId": "652e4d3b07254fc448841124",
        "blogId": "652e39b05ca21ddaf9d14145",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: deleteComment
Deletes specified comment
### Method: DELETE
>```
>https://bloggerapi.onrender.com/comment/delete/652e4d5a07254fc448841128
>```
### Response: 201
```json
{
    "message": "Comment deleted successfully!",
    "comment": {
        "_id": "652e4d5a07254fc448841128",
        "comment": "Great Blog",
        "userId": "652e4d3b07254fc448841124",
        "blogId": "652e39b05ca21ddaf9d14145",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: User Routes 


## End-point: getUser
Fetch specified user with the comment
### Method: GET
>```
>https://bloggerapi.onrender.com/user/652e4d3b07254fc448841124
>```
### Response: 201
```json
{
    "message": "Successfully fetched user.",
    "user": {
        "_id": "652e4d3b07254fc448841124",
        "fname": "User",
        "lname": "One",
        "email": "userone@gmail.com",
        "comments": [
            {
                "_id": "652e549c43a7ac140d83f4d3",
                "comment": "Cool Blog",
                "__v": 0,
                "user": "652e4d3b07254fc448841124",
                "blog": "652e39b05ca21ddaf9d14145"
            }
        ],
        "__v": 2
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: postUser
Creates a new user
### Method: POST
>```
>https://bloggerapi.onrender.com/user/create
>```
### Body (**raw**)

```json
{
    "fname": "User",
    "lname": "One",
    "email": "userone@gmail.com"
}
```

### Response: 201
```json
{
    "message": "User created successfully!",
    "user": {
        "fname": "User",
        "lname": "One",
        "email": "userone@gmail.com",
        "comments": [],
        "_id": "652e3ace5ca21ddaf9d14148",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: putUser
Update specified user
### Method: PUT
>```
>https://bloggerapi.onrender.com/user/update/652e3ace5ca21ddaf9d14148
>```
### Body (**raw**)

```json
{
    "fname": "Use",
    "lname": "Two",
    "email": "usertwo@gmail.com"
}
```

### Response: 201
```json
{
    "message": "User updated successfully!",
    "user": {
        "_id": "652e3ace5ca21ddaf9d14148",
        "fname": "Use",
        "lname": "Two",
        "email": "usertwo@gmail.com",
        "comments": [],
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: deleteUser
Delete specified User
### Method: DELETE
>```
>https://bloggerapi.onrender.com/user/delete/652e3ace5ca21ddaf9d14148
>```
### Body (**raw**)

```json

```

### Response: 201
```json
{
    "message": "User deleted successfully!"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
