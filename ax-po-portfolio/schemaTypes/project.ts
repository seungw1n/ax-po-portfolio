// studio/schemaTypes/project.js
export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        { name: 'title', title: '프로젝트명', type: 'string' },
        { name: 'description', title: '설명', type: 'text' },
        { name: 'mainImage', title: '대표 이미지', type: 'image', options: { hotspot: true } },
        { name: 'techStack', title: '기술 스택', type: 'array', of: [{ type: 'string' }] },
        { name: 'link', title: 'Github/배포 링크', type: 'url' },
    ]
}