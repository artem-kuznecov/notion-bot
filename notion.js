import { Client } from '@notionhq/client'


const notion = new Client({
    auth: 'secret_e4tnG6LmePSJXvCnWXr7v3Ulo4Tj9W2L4zNKUAYmk2G'
})

export async function create(short, fullText) {
    const response = await notion.pages.create({
        parent: {database_id: '94e44a32e8e34118919bfb04f6879645'},
        icon: {
            type: 'emoji',
            emoji: '📋'
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: short
                        }
                    }
                ]
            },
            Date: {
                date: {
                    start: new Date(Date.now()).toISOString()
                }
            },
            Status: {
                checkbox: false
            },
            Priority: {
                status: {
                    name: 'THIS WEEK'
                }
            },

        }
    })

    await notion.blocks.children.append({
        block_id: response.id,
        children: [
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: fullText
                            }
                        }
                    ]
                }
            }
        ]
    })

    return response
}