const Traverser = require("eslint/lib/shared/traverser")
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "init-data-without-props-or-computer",
            categories: undefined,
            url:
                "https://eslint.vuejs.org/rules/component-name-in-template-casing.html",
        },
        fixable: "code",
    },
    create(context) {
        const propNames = []
        return {
            'ClassDeclaration'(node) {
                debugger
            },
            'PropertyDeclaration'(node) {
                debugger
            },
            'Identifier'(node) {
                debugger
            },
            'Decorator>Identifier'(node) {
                if (node.text === 'Prop') {
                    propNames.push(node.parent.parent.parent.name)
                }
            },
            'GetAccessor:exit'(node) {
                if (propNames.length > 0) {

                }
            },
            'PropertyDeclaration:exit'(node) {
                if (propNames.length > 0) {
                    Traverser.traverse(node.initializer, {
                        visitorKeys: 'Identifier',
                        enter(node) {
                            if (propNames.includes(node.text) && node.parent.expression.type === 'ThisKeyword') {
                                console.log('error')
                            }
                        }
                    })
                }
            }
        }
    },
};
