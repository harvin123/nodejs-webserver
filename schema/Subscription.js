const gql = require('graphql-tag');

const Subscription = gql(`
subscription SubscribeToNewMessage($patientId: String!,$doctorId:String!) {
    subscribeToNewMessage(doctorId: $doctorId,patientId: $patientId) {
        id
        content
        patientId
        doctorId
        type
        author
    }
}
`)
exports.default = Subscription;