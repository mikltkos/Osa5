const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'testaaja',
      name: 'Teppo Testaaja',
      id: '5dc45d545d3f1e089c67f3f8'
    },
    id: '5dc45d545d3f1e089c67f3f9'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'testaaja',
      name: 'Teppo Testaaja',
      id: '5dc45d545d3f1e089c67f3f8'
    },
    id: '5dc45d555d3f1e089c67f3fa'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'testaaja',
      name: 'Teppo Testaaja',
      id: '5dc45d545d3f1e089c67f3f8'
    },
    id: '5dc45d565d3f1e089c67f3fb'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      username: 'testaaja2',
      name: 'Tauno Testaaja',
      id: '5dc45d545d3f1e089c67f3f7'
    },
    id: '5dc45d575d3f1e089c67f3fc'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {
      username: 'testaaja2',
      name: 'Tauno Testaaja',
      id: '5dc45d545d3f1e089c67f3f7'
    },
    id: '5dc45d575d3f1e089c67f3fd'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      username: 'testaaja2',
      name: 'Tauno Testaaja',
      id: '5dc45d545d3f1e089c67f3f7'
    },
    id: '5dc45d585d3f1e089c67f3fe'
  }
]


const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }