/// <reference types="cypress" />

import loc from "../../support/locators"
import '../../../support/commandsContas'


describe('Teste funcional', () => {
    beforeEach(() => {
        cy.login('onoffjunior@gmail.com', '#@Barriga')
        //cy.resetApp()
    })


    it('Inserir conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Internet webs')              
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

    it('criar conta com o mesmo nome', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta para saldo')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })

    it('Salvando Movimentos', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
        cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')

    })

    it('Excluir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_EXCLUIR).click()

        cy.get(loc.MESSAGE).should('contain', 'Conta excluída com sucesso!')
    })
})


