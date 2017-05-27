module.exports = {
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A Vue.js project"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "router": {
            "type": "confirm",
            "message": "Install Vue router?"
        },
        "state manager": {
            "type": "confirm",
            "message": "Install Vuex?"
        }
    },
    "filters": {
        "src/router/*": "router",
        "src/store/*": "state manager"
    }
    "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/rabbitmu/vue-boilerplate'
}
