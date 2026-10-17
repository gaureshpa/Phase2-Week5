import { db } from './db.js'

async function main() {
  try {
    const projects = await db.orm.public.Project.all()
    const issues = await db.orm.public.Issue.all()

    console.log('Database connection successful!')
    console.log('Projects:', projects)
    console.log('Issues:', issues)
  } catch (error) {
    console.error('Database test failed:', error)
  } finally {
    await db.close()
  }
}

main()
