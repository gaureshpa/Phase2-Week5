import { db } from "./db";

async function main() {
    try {
        const project1 = await db.orm.public.Project.create({
            name: 'Issue Dashboard',
            description: 'Build a dashboard to manage projects and issues',
            status: 'ACTIVE'
        }) 

        const project2 = await db.orm.public.Project.create({
            name: 'API Development',
            description: 'Develop and test the backend REST API',
            status: 'ACTIVE'
        })

        await db.orm.public.Issue.createAll([
            {
                title: 'Fix login validation',
                description: 'Login validations do not show up on incorrect inputs.',
                status: 'DONE',
                priority: 'HIGH',
                projectId: project1.id,
                labels: ['backend', 'api'],
            },
            {
                title: 'Update dashboard layout',
                description: 'Dashboard layout is not mobile friendly.',
                status: 'OPEN',
                priority: 'HIGH',
                projectId: project1.id,
                labels: ['frontend', 'integration'],
            },
            {
                title: 'Fix mobile navigation',
                description: 'Add a navigation bar for mobile user.',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                projectId: project1.id,
                labels: ['frontend', 'ux'],
            },
            {
                title: 'Update API Usage documentation',
                description: 'Include API output example in the documentation.',
                status: 'OPEN',
                priority: 'MEDIUM',
                projectId: project2.id,
                labels: ['backend', 'testing'],
            },
        ])

    } catch(error) {
        console.error('Failed to seed database: ', error)
        process.exitCode = 1
    } finally {
        await db.close()
    }
}

main()
