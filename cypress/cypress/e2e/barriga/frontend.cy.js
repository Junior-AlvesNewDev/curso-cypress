/// <reference types="cypress" />

import loc from "../../support/locators"
import '../../../support/commandsContas'


describe('Teste funcional', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        cy.login('cy@email', 'a')
        //cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })


    it('Teste de nivel', () => {
        cy.intercept({
            method: 'GET',
            url: '/saldo',
        },
            [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "4034.00"
            },
            {
                conta_id: 9909,
                conta: "Banco",
                saldo: "10000000.00"
            },
            ]
        ).as('saldoFilho')

        cy.get(loc.MENU.HOME).click()

        cy.wait('@saldoFilho')
            .its('response.statusCode')
            .should('eq', 200)

        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Criar conta', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        },
            { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
        ).as('saveConta')

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
            [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
            ]
        ).as('contasSave')

        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it.only('update em contas', () => {
        cy.intercept('GET', '/contas').as('getContas')
        cy.intercept({
            method: 'PUT',
            url: '/contas/**'
        },
            { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
        )

        cy.acessarMenuConta()
        cy.wait('@getContas')

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')

    })

    it('Salvando Movimentos', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO('desc', '123')).should('exist')

    })

    it('Consultar saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Remover movimento', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('desc')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Excluir conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_EXCLUIR).click()

        cy.get(loc.MESSAGE).should('contain', 'Conta excluída com sucesso!')
    })
})


