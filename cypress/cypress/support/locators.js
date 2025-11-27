const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS:'[href="/contas"]',
        RESET: '[href="/reset"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    XP_BTN_ALTERAR: "//table//td[contains(., 'Conta para alterar')]/.//i[@class='far fa-edit']",
    XP_BTN_EXCLUIR: "//table//td[contains(., 'Internet webs')]/.//i[@class='far fa-trash-alt']"
    },
    MESSAGE:'.toast-message'
}

export default locators;