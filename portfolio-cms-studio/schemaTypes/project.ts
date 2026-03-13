import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        // 1. 제목
        defineField({
            name: 'title',
            title: '프로젝트 제목',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        // 2. 요약
        defineField({
            name: 'summary',
            title: '요약 (Summary)',
            type: 'text',
            rows: 3,
            description: '프로젝트 목록 카드에 표시될 짧은 설명입니다.',
        }),

        // 3. 도메인 태그
        defineField({
            name: 'domainTags',
            title: '도메인 (예: Web, App)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),

        // 4. 소속 태그
        defineField({
            name: 'organizationTags',
            title: '소속 (예: 개인 프로젝트, OO 부트캠프)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),

        // 5. 대표 썸네일 이미지
        defineField({
            name: 'thumbnail',
            title: '대표 썸네일 이미지',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        // 6. 섹션 단위 본문
        defineField({
            name: 'sections',
            title: '본문 섹션',
            description: '섹션 별로 제목, 타입, 이미지, 본문을 각각 입력하세요.',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'section',
                    title: '섹션',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: '섹션 제목',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'sectionType',
                            title: '섹션 타입',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '배경', value: '배경' },
                                    { title: '실험', value: '실험' },
                                    { title: '문제', value: '문제' },
                                    { title: '화면 설계', value: '화면 설계' },
                                    { title: '시스템 설계', value: '시스템 설계' },
                                    { title: 'A/B 테스트', value: 'A/B 테스트' },
                                    { title: '결과/회고', value: '결과/회고' },
                                ],
                                layout: 'dropdown',
                            },
                        }),
                        defineField({
                            name: 'sectionImage',
                            title: '섹션 이미지',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'body',
                            title: '본문',
                            type: 'array',
                            of: [
                                defineArrayMember({ type: 'block' }),
                                defineArrayMember({
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        defineField({ name: 'caption', type: 'string', title: '이미지 설명' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'sectionTitle',
                            subtitle: 'sectionType',
                            media: 'sectionImage',
                        },
                    },
                }),
            ],
        }),
    ],
})