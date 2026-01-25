/// <reference types="cypress" />

describe('Teste funcional', () => {
    let token
    beforeEach(() => {
        cy.getToken('cy@email', 'a')
            .then(tkn => {
                token = tkn
            })

        cy.resetRest()    
    })

    it('Criar conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.have.property('id')
            expect(res.body).to.be.have.property('nome', 'Conta via rest')
        })
    })

    it('Alterar nome da conta', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then( res => {
            cy.request({
                url:`http://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                method:'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Salvando Movimentos', () => {

    })

    it('Consultar saldo', () => {

    })

    it('Remover movimento', () => {

    })

    it('Excluir conta', () => {

    })
})


