/// <reference types="cypress" />

import loc from "../../support/locators"

describe('Teste funcional', () => {
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type('@gmail.com')
        cy.get(loc.LOGIN.PASSWORD).type('#@Barriga')
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })


    it('Inserir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()       
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it.only('Alterar conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()

        cy.get(loc.CONTAS.NOME).type('internet')
            .clear()
            .type('Internet web')

        cy.get(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Excluir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()

        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Internet')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('exist')
    })
})


