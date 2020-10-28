// GRAPHQL
const gql = require('graphql-tag');

const Query = gql(`
query GetMessages($doctorId:String!,$patientId:String!) {
    getMessages(doctorId: $doctorId,patientId: $patientId) {
        id
        content
		doctorId
        patientId
        type
        author
    }
}
`)
exports.default = Query;