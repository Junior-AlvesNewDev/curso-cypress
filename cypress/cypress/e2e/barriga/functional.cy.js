/// <reference types="cypress" />

import loc from "../../support/locators"

describe('Teste funcional', () => {
    beforeEach(() => {
        cy.login('onoffjunior@gmail.com', '#@Barriga')
        //cy.resetApp()
    })


    it('Inserir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Internet webs')
        cy.get(loc.CONTAS.BTN_SALVAR).click()       
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Alterar conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()

        cy.get(loc.CONTAS.NOME).type('Conta para alterar')
            .clear()
            .type('Conta alterada')

        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Excluir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_EXCLUIR).click()

        cy.get(loc.MESSAGE).should('contain', 'Conta excluída com sucesso!')
    })
})


