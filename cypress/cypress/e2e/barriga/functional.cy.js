/// <reference types="cypress" />

describe('Teste funcional', () => {
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('onoffjunior@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('#@Barriga')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
        //cy.get('.toast-message').then($msg => {console.log($msg.text())       })
    })


    it('Inserir conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Internet')
        cy.get('.btn').click()
        //cy.get('.toast-message').then($msg => {console.log($msg.text())       })
        //cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!')
        cy.get('.toast-message').should('exist')


    })

    it('Alterar conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(., 'Internet')]/.//i[@class='far fa-edit']").click()

        cy.get('[data-test=nome]')
            .clear()
            .type('Internet web')
        cy.get('.btn').click()

        //cy.get('.toast-message').last().should('contain', 'Conta atualizada com sucesso!', { timeout: 10000 })
        cy.get('.toast-message').should('exist')
    })

    it('Excluir conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        //cy.xpath("//table//td[contains(., 'Internet')]/.//i[@title='Deletar id: 2560826']").click()
        //cy.xpath("//table//td[contains(., 'Internet web')]/..//i[contains(@title,'Deletar')]").click()
        cy.xpath("//table//td[contains(., 'Internet')]/..//i[contains(@class, 'fa-trash')]").click()

        cy.get('[data-test=nome]')
            .clear()
            .type('Internet')
        cy.get('.btn').click()


        //Isso imprime o texto REAL na execução.
        cy.get('.toast-message').then($msg => {
            console.log($msg.text())
        })
    })
})


