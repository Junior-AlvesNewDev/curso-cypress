const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=meu-settings]',
        CONTAS:'[href="/contas"]'
    },
    CONTAS: {'[data-test=nome]',
    BTN_SALVAR: '.btn'
    }
    MESSAGE:'.toast-message'
}

export default locators;