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
            },
            'PropertyDeclaration'(node) {
                debugger
            },
            'Identifier'(node) {
                console.log(node)
            },
            'Decorator'(node) {
                if (node.expression && node.expression.callee.name === 'Prop') {
                    propNames.push(node.parent.key.name)
                }
            },
            'GetAccessor:exit'(node) {
                if (propNames.length > 0) {

                }
            },
            'ClassProperty:exit'(node) {

                if (propNames.length > 0 && !propNames.includes(node.key.name)) {
                    Traverser.traverse(node, {
                        visitorKeys: 'ThisExpression',
                        enter(node2) {
                            if (propNames.includes(node2.name)) {
                                console.log('error')
                            }
                        }
                    })
                }
            }
        }
    },
};
