# ArticleHub API

Node.js backend for article management platform.

## Setup

```bash
git clone https://github.com/rushitpatel21/knowledge_sharing_be.git
cd knowledge_sharing_be
npm install
npm start
```

## Endpoints

### Auth
- `POST /api/v1/auth/signup` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/validateUser` - Validate token

### Articles
- `POST /api/v1/article` - Create article
- `GET /api/v1/article` - Get all articles
- `GET /api/v1/article/:id` - Get single article
- `PUT /api/v1/article/:id` - Update article
- `DELETE /api/v1/article/:id` - Delete article
- `POST /api/v1/article/:title/summary` - Generate AI content

## Auth Header
```
Authorization: Bearer <token>
```
