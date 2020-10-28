const gql = require('graphql-tag');

const Mutation = gql(`
mutation NewMessage($content: String!, $patientId: String!,$doctorId:String!,$type:String!,$author:String!) {
    newMessage(content: $content, patientId: $patientId, doctorId: $doctorId,type: $type,author:$author) {
        id
        content
        patientId
        doctorId
        type
        author
    }
}
`)
exports.default = Mutation;