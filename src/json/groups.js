const groups = [
    {
        _id: 'b101',
        title: 'Robot dev proj',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
            mail: 'abi@mail.com',
        },
        style: {},
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
        ],

        members: [
            {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            
        ],
        groups: [
            {
                style: {},
                id: 'g101',
                title: 'Group 1',
                cards: [
                    {
                        id: 'c101',
                        title: 'Replace logo',
                    },
                    {
                        id: 'c102',
                        title: 'Add Samples',
                    },
                ],
            },
            {
                id: 'g102',
                title: 'Group 2',
                cards: [
                    {
                        id: 'c103',
                        title: 'Do that',
                    },
                    {
                        id: 'c134',
                        title: 'Help me',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: '212jX',
                                        txt: 'To Do 1',
                                        isDone: false,
                                    },
                                ],
                            },
                        ],
                        members: [
                            {
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        trelixAttachmentId: ['c202'],
                        attachments: [
                            {
                                link: 'www.google.com',
                                img: 'src',
                                upAt: 1638339747876,
                                name: 'google',
                            },
                        ],

                        style: {
                            bgColor: '#26de81',
                        },
                    },
                ],
                style: {},
            },
        ],
        activities: [
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u101',
                    fullname: 'Abi Abambi',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
];
